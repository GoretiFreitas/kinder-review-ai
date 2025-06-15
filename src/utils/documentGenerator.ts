import jsPDF from 'jspdf';
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

// Helper function to escape RTF special characters
const escapeRTF = (text: string): string => {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\n/g, '\\par ')
    .replace(/\r/g, '');
};

// Generate RTF content
const generateRTFContent = (reviewSections: ReviewSections): string => {
  let rtfContent = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}';
  
  // Title
  rtfContent += '\\f0\\fs28\\b Comprehensive Peer Review\\b0\\par\\par';
  
  // Date
  rtfContent += `\\fs20 Generated on: ${new Date().toLocaleDateString()}\\par\\par\\par`;
  
  // Sections
  Object.entries(reviewSections).forEach(([key, content]) => {
    const title = sectionTitles[key as keyof typeof sectionTitles];
    
    // Section title
    rtfContent += `\\fs24\\b ${escapeRTF(title)}\\b0\\par\\par`;
    
    // Section content
    rtfContent += `\\fs20 ${escapeRTF(content)}\\par\\par\\par`;
  });
  
  rtfContent += '}';
  return rtfContent;
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

export const generateRTF = (reviewSections: ReviewSections) => {
  try {
    console.log('Starting RTF generation...');
    
    // Generate RTF content
    const rtfContent = generateRTFContent(reviewSections);
    
    // Create blob and save
    const blob = new Blob([rtfContent], { 
      type: 'application/rtf' 
    });
    
    console.log(`RTF blob created successfully, size: ${blob.size} bytes`);
    saveAs(blob, 'peer-review.rtf');
    console.log('RTF file saved successfully');
    
  } catch (error) {
    console.error('RTF generation failed:', error);
    throw new Error('Failed to generate RTF document');
  }
};

// Keep the old function name for backward compatibility
export const generateDOCX = generateRTF;
