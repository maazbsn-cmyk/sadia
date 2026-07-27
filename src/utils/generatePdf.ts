import { jsPDF } from 'jspdf';
import { AnalysisResult } from '../types';

// Helper to convert image URL or base64 to HTMLImageElement for jsPDF
async function loadImageAsDataUrl(url: string): Promise<string | null> {
  if (!url) return null;
  if (url.startsWith('data:image/')) return url;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width || 600;
        canvas.height = img.height || 400;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          resolve(null);
        }
      } catch (err) {
        console.warn('Canvas conversion failed:', err);
        resolve(null);
      }
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = url;
  });
}

export async function generatePdfReport(data: AnalysisResult): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header Banner
  doc.setFillColor(30, 41, 59); // Dark primary slate
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('LUMINA DESIGN', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('AI SPATIAL ANALYSIS & REDESIGN REPORT', margin, 21);

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  doc.text(`Date: ${currentDate}`, pageWidth - margin - 35, 14);

  y = 35;

  // Room Image & Key Metrics Section
  const imageBase64 = await loadImageAsDataUrl(data.analyzedImage);
  const imgWidth = 80;
  const imgHeight = 55;

  if (imageBase64) {
    try {
      doc.addImage(imageBase64, 'JPEG', margin, y, imgWidth, imgHeight);
    } catch (e) {
      doc.setDrawColor(200, 200, 200);
      doc.rect(margin, y, imgWidth, imgHeight);
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text('Room Photo', margin + 25, y + 28);
    }
  } else {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, imgWidth, imgHeight, 'F');
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.text('Uploaded Room Image', margin + 20, y + 28);
  }

  // Key Info Box (Right of image)
  const infoX = margin + imgWidth + 8;
  const infoWidth = contentWidth - imgWidth - 8;

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(infoX, y, infoWidth, imgHeight, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(infoX, y, infoWidth, imgHeight, 3, 3, 'D');

  let infoY = y + 8;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Project Parameters', infoX + 6, infoY);

  infoY += 7;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Room Type: ', infoX + 6, infoY);
  doc.setFont('helvetica', 'normal');
  doc.text(data.roomType || 'Living Room', infoX + 32, infoY);

  infoY += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('Target Style: ', infoX + 6, infoY);
  doc.setFont('helvetica', 'normal');
  doc.text(data.style || 'Modern', infoX + 32, infoY);

  infoY += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('Budget Level: ', infoX + 6, infoY);
  doc.setFont('helvetica', 'normal');
  doc.text(data.budget || 'Medium', infoX + 32, infoY);

  infoY += 6;
  doc.setFont('helvetica', 'bold');
  doc.text('Design Score: ', infoX + 6, infoY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // emerald
  doc.text(`${data.designScore || 8.4} / 10 (${data.scoreLabel || 'Optimal'})`, infoX + 32, infoY);

  infoY += 6;
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Rank: ${data.percentileRank || 'Top 15%'} • ${data.styleMatch || '88% Match'}`, infoX + 6, infoY);

  y += imgHeight + 10;

  // Spatial Overview Section
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('1. SPATIAL OVERVIEW & ENVIRONMENT', margin + 3, y + 5);

  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const overviewLines = doc.splitTextToSize(data.spatialOverview || '', contentWidth - 6);
  doc.text(overviewLines, margin + 3, y);
  y += overviewLines.length * 4.5 + 4;

  // Wall Colour & Lighting Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`Wall Colour Detected: `, margin + 3, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.wallColour?.name || 'Oyster White'} (${data.wallColour?.hex || '#E5E7EB'}) — ${data.wallColour?.description || ''}`, margin + 38, y, { maxWidth: contentWidth - 40 });
  y += 7;

  doc.setFont('helvetica', 'bold');
  doc.text(`Lighting Analysis: `, margin + 3, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.lightingAnalysis?.kelvin || '3200K'} — ${data.lightingAnalysis?.description || ''}`, margin + 38, y, { maxWidth: contentWidth - 40 });
  y += 10;

  // Colour Palette Recommendations
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('2. COLOUR PALETTE RECOMMENDATIONS', margin + 3, y + 5);

  y += 11;

  if (data.colourPalette && data.colourPalette.length > 0) {
    const colWidth = contentWidth / data.colourPalette.length;
    data.colourPalette.forEach((col, idx) => {
      const cx = margin + idx * colWidth;
      // Draw Color Box
      try {
        const hex = col.hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16) || 200;
        const g = parseInt(hex.substring(2, 4), 16) || 200;
        const b = parseInt(hex.substring(4, 6), 16) || 200;
        doc.setFillColor(r, g, b);
      } catch (e) {
        doc.setFillColor(220, 220, 220);
      }
      doc.roundedRect(cx + 2, y, colWidth - 4, 12, 1, 1, 'F');
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(cx + 2, y, colWidth - 4, 12, 1, 1, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(col.name, cx + 2, y + 16, { maxWidth: colWidth - 4 });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(col.role, cx + 2, y + 20, { maxWidth: colWidth - 4 });
      doc.text(col.hex, cx + 2, y + 24);
    });
    y += 28;
  }

  // AI Suggestions / Design Tips
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('3. AI DESIGN SUGGESTIONS & TIPS', margin + 3, y + 5);

  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  if (data.tips && data.tips.length > 0) {
    data.tips.forEach((tip) => {
      doc.setFillColor(79, 70, 229); // Primary Indigo bullet
      doc.circle(margin + 5, y - 1, 1, 'F');
      const lines = doc.splitTextToSize(tip, contentWidth - 12);
      doc.text(lines, margin + 9, y);
      y += lines.length * 4 + 3;
    });
  }
  y += 4;

  // Check Page break before Furniture & Shopping List
  if (y > pageHeight - 60) {
    doc.addPage();
    y = margin;
  }

  // Furniture Recommendations & Shopping List
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('4. FURNITURE MATCHES & SHOPPING LIST', margin + 3, y + 5);

  y += 12;

  // Table Header
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('ITEM NAME', margin + 4, y + 4);
  doc.text('RECOMMENDED REASON / SUBTITLE', margin + 60, y + 4);
  doc.text('ESTIMATED PRICE', margin + 140, y + 4);

  y += 7;
  doc.setDrawColor(226, 232, 240);

  if (data.furnitureMatches && data.furnitureMatches.length > 0) {
    data.furnitureMatches.forEach((item) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(item.title, margin + 4, y + 4);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(item.subtitle, margin + 60, y + 4);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(79, 70, 229);
      doc.text(item.price, margin + 140, y + 4);

      y += 6;
      doc.line(margin, y, margin + contentWidth, y);
      y += 2;
    });
  }

  y += 6;

  // Budget Estimate Box
  doc.setFillColor(243, 244, 246);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('ESTIMATED BUDGET RANGE:', margin + 6, y + 7);

  doc.setFontSize(12);
  doc.setTextColor(79, 70, 229);
  doc.text(`${data.budgetRange?.min || '$1,200'} — ${data.budgetRange?.max || '$2,450'}`, margin + 62, y + 8);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Tier: ${data.budgetRange?.tier || data.budget || 'Medium'} • Includes furniture, lighting & wall color treatment`, margin + 6, y + 14);

  // Footer on bottom of current page
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Generated by Lumina AI Interior Designer • https://lumina.design', margin, pageHeight - 8);

  // Save PDF file
  const fileName = `Lumina_Design_Report_${(data.roomType || 'Room').replace(/\s+/g, '_')}_${Date.now()}.pdf`;
  doc.save(fileName);
}
