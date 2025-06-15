
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

interface ReviewSections {
  abstract: string;
  introduction: string;
  methodology: string;
  results: string;
  discussion: string;
  conclusion: string;
  references: string;
  overall: string;
}

const sectionTitles = {
  abstract: 'Abstract Review',
  introduction: 'Introduction Review',
  methodology: 'Methodology Review',
  results: 'Results Review',
  discussion: 'Discussion Review',
  conclusion: 'Conclusion Review',
  references: 'References Review',
  overall: 'Overall Assessment'
};

export const generatePDF = (reviewSections: ReviewSections) => {
  try {
    const pdf = new jsPDF();
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 20;
    const lineHeight = 7;
    let yPosition = margin;

    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Comprehensive Peer Review', margin, yPosition);
    yPosition += 20;

    // Date
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 15;

    // Sections
    Object.entries(reviewSections).forEach(([key, content]) => {
      const title = sectionTitles[key as keyof typeof sectionTitles];
      
      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }

      // Section title
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title, margin, yPosition);
      yPosition += 10;

      // Section content
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const lines = pdf.splitTextToSize(content, pageWidth - 2 * margin);
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += lineHeight;
      });
      
      yPosition += 10;
    });

    pdf.save('peer-review.pdf');
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF document');
  }
};

export const generateDOCX = async (reviewSections: ReviewSections) => {
  try {
    console.log('Starting DOCX generation...');
    
    const children = [
      new Paragraph({
        children: [
          new TextRun({
            text: 'Comprehensive Peer Review',
            bold: true,
            size: 32,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Generated on: ${new Date().toLocaleDateString()}`,
            italics: true,
          }),
        ],
      }),
      new Paragraph({ text: '' }), // Empty line
    ];

    Object.entries(reviewSections).forEach(([key, content]) => {
      const title = sectionTitles[key as keyof typeof sectionTitles];
      
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: title,
              bold: true,
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: content,
            }),
          ],
        }),
        new Paragraph({ text: '' }) // Empty line
      );
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children,
        },
      ],
    });

    console.log('Document created, generating buffer...');
    const buffer = await Packer.toBuffer(doc);
    console.log('Buffer created, creating blob...');
    
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    
    console.log('Saving file...');
    saveAs(blob, 'peer-review.docx');
    console.log('DOCX generated successfully');
  } catch (error) {
    console.error('DOCX generation error:', error);
    throw new Error('Failed to generate DOCX document');
  }
};
