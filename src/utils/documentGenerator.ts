
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
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
    
    const paragraphs = [];

    // Title
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Comprehensive Peer Review',
            bold: true,
            size: 32,
          }),
        ],
        spacing: {
          after: 400,
        },
      })
    );

    // Date
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Generated on: ${new Date().toLocaleDateString()}`,
            italics: true,
            size: 20,
          }),
        ],
        spacing: {
          after: 600,
        },
      })
    );

    // Add sections
    Object.entries(reviewSections).forEach(([key, content]) => {
      const title = sectionTitles[key as keyof typeof sectionTitles];
      
      // Section title
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: title,
              bold: true,
              size: 24,
            }),
          ],
          spacing: {
            before: 400,
            after: 200,
          },
        })
      );

      // Section content
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: content,
              size: 20,
            }),
          ],
          spacing: {
            after: 400,
          },
        })
      );
    });

    console.log('Creating document...');
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    console.log('Generating buffer...');
    const buffer = await Packer.toBuffer(doc);
    console.log('Buffer generated successfully, size:', buffer.byteLength);
    
    console.log('Creating and saving blob...');
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    
    saveAs(blob, 'peer-review.docx');
    console.log('DOCX file saved successfully');
    
  } catch (error) {
    console.error('Detailed DOCX generation error:', error);
    console.error('Error stack:', error.stack);
    throw error;
  }
};
