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

// Helper function to check browser compatibility
const checkBrowserCompatibility = () => {
  if (typeof window === 'undefined') {
    throw new Error('Window object not available');
  }
  
  if (!window.Blob) {
    throw new Error('Blob API not supported');
  }
  
  if (!window.URL || !window.URL.createObjectURL) {
    throw new Error('URL API not supported');
  }
};

// Helper function to chunk long text into smaller paragraphs
const chunkText = (text: string, maxLength: number = 1000): string[] => {
  if (text.length <= maxLength) {
    return [text];
  }
  
  const chunks = [];
  let currentChunk = '';
  const sentences = text.split('. ');
  
  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length + 2 <= maxLength) {
      currentChunk += (currentChunk ? '. ' : '') + sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk + '.');
        currentChunk = sentence;
      } else {
        // If a single sentence is too long, split it forcefully
        chunks.push(sentence.substring(0, maxLength));
        currentChunk = sentence.substring(maxLength);
      }
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk + (currentChunk.endsWith('.') ? '' : '.'));
  }
  
  return chunks;
};

// Helper function to validate content
const validateContent = (reviewSections: ReviewSections) => {
  const totalLength = Object.values(reviewSections).join('').length;
  console.log('Total content length:', totalLength);
  
  if (totalLength > 50000) {
    console.warn('Content is very long, this might cause memory issues');
  }
  
  // Check for problematic characters
  Object.entries(reviewSections).forEach(([key, content]) => {
    if (content.includes('\u0000')) {
      console.warn(`Section ${key} contains null characters`);
    }
  });
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
    console.log('Starting DOCX generation with improved error handling...');
    
    // Step 1: Check browser compatibility
    try {
      checkBrowserCompatibility();
      console.log('Browser compatibility check passed');
    } catch (error) {
      console.error('Browser compatibility error:', error);
      throw new Error('Your browser does not support document generation');
    }
    
    // Step 2: Validate content
    try {
      validateContent(reviewSections);
      console.log('Content validation passed');
    } catch (error) {
      console.error('Content validation error:', error);
      throw new Error('Document content validation failed');
    }
    
    // Step 3: Create document structure with minimal complexity
    const paragraphs = [];
    
    try {
      // Title - using simpler structure
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: 'Comprehensive Peer Review',
              bold: true,
              size: 28, // 14pt
            }),
          ],
        })
      );

      // Empty line
      paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }));

      // Date
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Generated on: ${new Date().toLocaleDateString()}`,
              italics: true,
              size: 20, // 10pt
            }),
          ],
        })
      );

      // Two empty lines
      paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
      paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }));

      console.log('Created header paragraphs');
    } catch (error) {
      console.error('Error creating header:', error);
      throw new Error('Failed to create document header');
    }

    // Step 4: Add sections with chunking for long content
    try {
      Object.entries(reviewSections).forEach(([key, content]) => {
        const title = sectionTitles[key as keyof typeof sectionTitles];
        
        // Section title
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: title,
                bold: true,
                size: 22, // 11pt
              }),
            ],
          })
        );

        // Empty line after title
        paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }));

        // Section content - chunk if too long
        const contentChunks = chunkText(content, 800);
        contentChunks.forEach((chunk, index) => {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: chunk,
                  size: 20, // 10pt
                }),
              ],
            })
          );
          
          // Add space between chunks if there are multiple
          if (contentChunks.length > 1 && index < contentChunks.length - 1) {
            paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
          }
        });

        // Two empty lines after each section
        paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
        paragraphs.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
      });
      
      console.log(`Created ${paragraphs.length} paragraphs total`);
    } catch (error) {
      console.error('Error creating content paragraphs:', error);
      throw new Error('Failed to create document content');
    }

    // Step 5: Create document with minimal structure
    let doc;
    try {
      console.log('Creating document object...');
      doc = new Document({
        sections: [
          {
            children: paragraphs,
          },
        ],
      });
      console.log('Document object created successfully');
    } catch (error) {
      console.error('Error creating document object:', error);
      throw new Error('Failed to create document structure');
    }

    // Step 6: Generate buffer with timeout
    let buffer;
    try {
      console.log('Generating buffer...');
      const startTime = Date.now();
      
      // Add a timeout wrapper
      const bufferPromise = Packer.toBuffer(doc);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Document generation timeout')), 30000);
      });
      
      buffer = await Promise.race([bufferPromise, timeoutPromise]);
      
      const endTime = Date.now();
      console.log(`Buffer generated successfully in ${endTime - startTime}ms, size: ${buffer.byteLength} bytes`);
    } catch (error) {
      console.error('Error generating buffer:', error);
      if (error.message === 'Document generation timeout') {
        throw new Error('Document generation took too long - try reducing content size');
      }
      throw new Error('Failed to generate document buffer');
    }

    // Step 7: Create and save blob
    try {
      console.log('Creating blob and saving file...');
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      if (blob.size === 0) {
        throw new Error('Generated blob is empty');
      }
      
      console.log(`Blob created successfully, size: ${blob.size} bytes`);
      saveAs(blob, 'peer-review.docx');
      console.log('DOCX file saved successfully');
      
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Failed to save document file');
    }
    
  } catch (error) {
    console.error('DOCX generation failed at top level:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Re-throw with original error for better debugging
    throw error;
  }
};
