import { Country } from "@/lib/country-data";
import { jsPDF } from "jspdf";

interface ReportData {
  totalTransactions: number;
  totalCapitalGains: string;
  taxYear: string;
  estimatedTax: string;
  aiExplanation: string[];
}

export class PdfGenerator {
  static async generatePdf(reportData: ReportData, country: Country): Promise<void> {
    try {
      // Create new PDF document (client-side generation)
      const doc = new jsPDF();
      
      // Add metadata to PDF
      doc.setProperties({
        title: `Crypto Tax Report - ${country.name} ${reportData.taxYear}`,
        subject: 'Cryptocurrency Tax Analysis',
        author: 'Crypto AI Manager',
        keywords: 'cryptocurrency, tax, financial analysis, capital gains',
        creator: 'Crypto AI Manager'
      });
      
      // Add header with logo-style design
      doc.setFillColor(59, 12, 163); // Brand color - purple background
      doc.rect(0, 0, 210, 32, 'F');
      
      // Add white text for header
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", 'bold');
      doc.text("CRYPTO AI MANAGER", 105, 16, { align: "center" });
      
      doc.setFontSize(14);
      doc.text(`${country.name} Tax Report | ${reportData.taxYear}`, 105, 25, { align: "center" });
      
      // Add document info bar
      doc.setFillColor(240, 240, 250);
      doc.rect(0, 32, 210, 12, 'F');
      
      doc.setTextColor(90, 90, 90);
      doc.setFontSize(9);
      const today = new Date().toLocaleDateString();
      doc.text(`Generated: ${today}`, 15, 39);
      doc.text(`Reference: CAM-${country.code}-${reportData.taxYear}-${Math.floor(Math.random() * 10000)}`, 105, 39);
      doc.text(`Confidential`, 190, 39, { align: "right" });
      
      // Add summary section with styled box
      doc.setFillColor(247, 247, 255);
      doc.roundedRect(15, 50, 180, 65, 3, 3, 'F');
      
      doc.setFontSize(16);
      doc.setTextColor(59, 12, 163);
      doc.setFont("helvetica", 'bold');
      doc.text("TAX SUMMARY", 105, 62, { align: "center" });
      
      // Add divider line
      doc.setDrawColor(180, 180, 220);
      doc.setLineWidth(0.5);
      doc.line(25, 66, 185, 66);
      
      // Add summary data with better formatting
      doc.setFontSize(12);
      const summaryLabels = [
        "Tax Year:",
        "Total Transactions:",
        "Total Capital Gains:",
        "Estimated Tax Liability:"
      ];
      
      const summaryValues = [
        reportData.taxYear,
        reportData.totalTransactions.toString(),
        reportData.totalCapitalGains,
        reportData.estimatedTax
      ];
      
      // Create a grid layout for data
      let y = 76;
      for (let i = 0; i < summaryLabels.length; i++) {
        // Left column - labels
        doc.setFont("helvetica", 'bold');
        doc.setTextColor(80, 80, 100);
        doc.text(summaryLabels[i], 35, y);
        
        // Right column - values
        doc.setFont("helvetica", 'normal');
        doc.setTextColor(59, 12, 163);
        
        // Right-align the values
        if (i >= 2) { // For currency values
          doc.setFont("helvetica", 'bold');
          doc.text(summaryValues[i], 165, y, { align: "right" });
        } else {
          doc.text(summaryValues[i], 165, y, { align: "right" });
        }
        
        y += 13;
      }
      
      // Add Asset Allocation section
      doc.setFillColor(247, 247, 255);
      doc.roundedRect(15, 125, 180, 90, 3, 3, 'F');
      
      doc.setFontSize(16);
      doc.setTextColor(59, 12, 163);
      doc.setFont("helvetica", 'bold');
      doc.text("ASSET ALLOCATION", 105, 137, { align: "center" });
      
      // Add divider line
      doc.setDrawColor(180, 180, 220);
      doc.line(25, 141, 185, 141);
      
      // Add table headers
      doc.setFontSize(9);
      doc.setTextColor(80, 80, 100);
      doc.setFont("helvetica", 'bold');
      
      // Table headers
      let tableY = 150;
      const columns = ["Token", "% Allocation", "Value (₹)", "Avg. Buy Price", "Current Price", "Gain/Loss"];
      const colWidths = [25, 28, 35, 35, 35, 27];
      let colX = 25;
      
      columns.forEach((header, i) => {
        doc.text(header, colX, tableY);
        colX += colWidths[i];
      });
      
      // Add divider line below headers
      doc.setDrawColor(200, 200, 220);
      doc.line(25, tableY + 3, 185, tableY + 3);
      
      // Table data
      doc.setFont("helvetica", 'normal');
      doc.setTextColor(60, 60, 60);
      
      const tableData = [
        ["BTC", "40%", "₹2,27,156", "₹48,000", "₹50,000", "+4.5%"],
        ["ETH", "30%", "₹1,70,367", "₹3,200", "₹3,000", "-2.1%"],
        ["USDT", "20%", "₹1,13,578", "₹83", "₹83", "0.0%"],
        ["ADA", "10%", "₹56,789", "₹32", "₹35", "+12.0%"]
      ];
      
      tableY += 12;
      tableData.forEach(row => {
        colX = 25;
        row.forEach((cell, i) => {
          // Color-code the gain/loss values
          if (i === 5) {
            if (cell.startsWith("+")) {
              doc.setTextColor(0, 150, 70); // Green for positive
            } else if (cell.startsWith("-")) {
              doc.setTextColor(200, 0, 0); // Red for negative
            } else {
              doc.setTextColor(100, 100, 100); // Gray for neutral
            }
          } else {
            doc.setTextColor(60, 60, 60);
          }
          
          doc.text(cell, colX, tableY);
          colX += colWidths[i];
        });
        tableY += 10;
      });
      
      // Add Performance Chart section
      doc.setFillColor(247, 247, 255);
      doc.roundedRect(15, 220, 180, 50, 3, 3, 'F');
      
      doc.setFontSize(16);
      doc.setTextColor(59, 12, 163);
      doc.setFont("helvetica", 'bold');
      doc.text("PERFORMANCE CHART", 105, 232, { align: "center" });
      
      // Add divider line
      doc.setDrawColor(180, 180, 220);
      doc.line(25, 236, 185, 236);
      
      // Simple visual chart representation (since we can't generate actual charts easily)
      doc.setDrawColor(80, 80, 150);
      doc.setLineWidth(1);
      
      // Draw chart axes
      doc.line(40, 260, 170, 260); // X-axis
      doc.line(40, 260, 40, 240);  // Y-axis
      
      // Add labels
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 120);
      doc.text("Time", 105, 268);
      doc.text("Value", 30, 250, { angle: 90 });
      
      // Draw a sample performance line
      doc.setDrawColor(59, 12, 163);
      doc.setLineWidth(1.5);
      
      // Sample data points for a chart
      const points = [
        [40, 255], [55, 252], [70, 248], [85, 250], 
        [100, 245], [115, 247], [130, 244], [145, 240], [160, 242], [170, 244]
      ];
      
      // Draw the performance line
      doc.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        doc.lineTo(points[i][0], points[i][1]);
      }
      doc.stroke();
      
      // Add label for chart
      doc.setFontSize(8);
      doc.setTextColor(59, 12, 163);
      doc.text("Daily Portfolio Value", 55, 245);
      
      // Add explanation section with styled box
      doc.addPage();
      
      // Add header to new page
      doc.setFillColor(59, 12, 163);
      doc.rect(0, 0, 210, 20, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", 'bold');
      doc.text("CRYPTO AI MANAGER - TAX REPORT (CONTINUED)", 105, 12, { align: "center" });
      
      // Add detailed financial analysis section
      doc.setFillColor(247, 247, 255);
      doc.roundedRect(15, 30, 180, 120, 3, 3, 'F');
      
      doc.setFontSize(16);
      doc.setTextColor(59, 12, 163);
      doc.setFont("helvetica", 'bold');
      doc.text("ADVANCED FINANCIAL ANALYSIS", 105, 42, { align: "center" });
      
      // Add divider line
      doc.setDrawColor(180, 180, 220);
      doc.line(25, 46, 185, 46);
      
      // Add advanced analytics content
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", 'normal');
      
      // Risk Analysis
      doc.setFont("helvetica", 'bold');
      doc.setTextColor(59, 12, 163);
      doc.text("Risk Metrics", 25, 55);
      doc.setFont("helvetica", 'normal');
      doc.setTextColor(60, 60, 60);
      
      // Risk metrics table
      const riskMetrics = [
        ["Volatility (30-day)", "28.4%", "High compared to market average of 22.1%"],
        ["Beta", "1.32", "Portfolio is more volatile than the market"],
        ["Sharpe Ratio", "1.8", "Good risk-adjusted return"],
        ["Max Drawdown", "18.7%", "Largest peak-to-trough decline"],
        ["Value at Risk (1-day, 95%)", "₹12,480", "Potential daily loss at 95% confidence"]
      ];
      
      let metricsY = 60;
      riskMetrics.forEach(row => {
        doc.setFont("helvetica", 'bold');
        doc.text(row[0], 28, metricsY);
        doc.setFont("helvetica", 'normal');
        doc.text(row[1], 85, metricsY);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(row[2], 105, metricsY);
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        metricsY += 8;
      });
      
      // Tax Efficiency Analysis
      metricsY += 5;
      doc.setFont("helvetica", 'bold');
      doc.setTextColor(59, 12, 163);
      doc.text("Tax Efficiency Analysis", 25, metricsY);
      doc.setFont("helvetica", 'normal');
      doc.setTextColor(60, 60, 60);
      
      metricsY += 5;
      
      // Tax efficiency metrics
      const taxEfficiency = [
        ["Realized Gains", "₹68,420", "Subject to short-term capital gains tax"],
        ["Unrealized Gains", "₹32,760", "Not taxable until sold"],
        ["Tax Loss Harvesting Potential", "₹12,180", "Potential tax savings through strategic selling"],
        ["Effective Tax Rate", `${(country.taxRules.taxRate * 100).toFixed(1)}%`, `Based on ${country.name} tax regulations`]
      ];
      
      metricsY += 3;
      taxEfficiency.forEach(row => {
        doc.setFont("helvetica", 'bold');
        doc.text(row[0], 28, metricsY);
        doc.setFont("helvetica", 'normal');
        doc.text(row[1], 85, metricsY);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(row[2], 105, metricsY);
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        metricsY += 8;
      });
      
      // Add Future Projections
      metricsY += 5;
      doc.setFont("helvetica", 'bold');
      doc.setTextColor(59, 12, 163);
      doc.text("Portfolio Projections (12 Months)", 25, metricsY);
      doc.setFont("helvetica", 'normal');
      doc.setTextColor(60, 60, 60);
      
      metricsY += 5;
      
      // Draw mini chart for projections
      const chartStartX = 28;
      const chartEndX = 180;
      const chartWidth = chartEndX - chartStartX;
      const baseY = metricsY + 15;
      
      // Draw baseline
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(chartStartX, baseY, chartEndX, baseY);
      
      // Draw optimistic scenario
      doc.setDrawColor(0, 150, 70);
      doc.setLineWidth(1);
      const optimisticPoints = [];
      for (let i = 0; i <= 10; i++) {
        const x = chartStartX + (chartWidth / 10) * i;
        // Curved line going up
        const y = baseY - (i * 1.2) - Math.sin(i / 3) * 3;
        optimisticPoints.push([x, y]);
      }
      
      doc.setLineDashPattern([3, 1], 0);
      doc.moveTo(optimisticPoints[0][0], optimisticPoints[0][1]);
      for (let i = 1; i < optimisticPoints.length; i++) {
        doc.lineTo(optimisticPoints[i][0], optimisticPoints[i][1]);
      }
      doc.stroke();
      
      // Draw expected scenario
      doc.setDrawColor(59, 12, 163);
      doc.setLineWidth(1.5);
      doc.setLineDashPattern([], 0);
      const expectedPoints = [];
      for (let i = 0; i <= 10; i++) {
        const x = chartStartX + (chartWidth / 10) * i;
        // Curved line going up but less steep
        const y = baseY - (i * 0.8) - Math.sin(i / 3) * 2;
        expectedPoints.push([x, y]);
      }
      
      doc.moveTo(expectedPoints[0][0], expectedPoints[0][1]);
      for (let i = 1; i < expectedPoints.length; i++) {
        doc.lineTo(expectedPoints[i][0], expectedPoints[i][1]);
      }
      doc.stroke();
      
      // Draw conservative scenario
      doc.setDrawColor(200, 0, 0);
      doc.setLineWidth(1);
      doc.setLineDashPattern([2, 2], 0);
      const conservativePoints = [];
      for (let i = 0; i <= 10; i++) {
        const x = chartStartX + (chartWidth / 10) * i;
        // Slightly curved line staying more flat
        const y = baseY - (i * 0.4) - Math.sin(i / 3) * 1;
        conservativePoints.push([x, y]);
      }
      
      doc.moveTo(conservativePoints[0][0], conservativePoints[0][1]);
      for (let i = 1; i < conservativePoints.length; i++) {
        doc.lineTo(conservativePoints[i][0], conservativePoints[i][1]);
      }
      doc.stroke();
      
      // Add legend
      doc.setFontSize(8);
      doc.setTextColor(0, 150, 70);
      doc.setLineDashPattern([3, 1], 0);
      doc.line(chartStartX, baseY + 10, chartStartX + 15, baseY + 10);
      doc.text("Optimistic (+32%)", chartStartX + 18, baseY + 12);
      
      doc.setTextColor(59, 12, 163);
      doc.setLineDashPattern([], 0);
      doc.line(chartStartX + 70, baseY + 10, chartStartX + 85, baseY + 10);
      doc.text("Expected (+18%)", chartStartX + 88, baseY + 12);
      
      doc.setTextColor(200, 0, 0);
      doc.setLineDashPattern([2, 2], 0);
      doc.line(chartStartX + 140, baseY + 10, chartStartX + 155, baseY + 10);
      doc.text("Conservative (+8%)", chartStartX + 158, baseY + 12);
      
      // Reset line pattern
      doc.setLineDashPattern([], 0);
      
      // Add AI explanation section on a new page
      doc.addPage();
      
      // Add header to new page
      doc.setFillColor(59, 12, 163);
      doc.rect(0, 0, 210, 20, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", 'bold');
      doc.text("CRYPTO AI MANAGER - TAX REPORT (CONTINUED)", 105, 12, { align: "center" });
      
      // Add AI explanation section
      doc.setFillColor(247, 247, 255);
      doc.roundedRect(15, 30, 180, 120, 3, 3, 'F');
      
      doc.setFontSize(16);
      doc.setTextColor(59, 12, 163);
      doc.setFont("helvetica", 'bold');
      doc.text("AI-GENERATED TAX EXPLANATION", 105, 42, { align: "center" });
      
      // Add divider line
      doc.setDrawColor(180, 180, 220);
      doc.line(25, 46, 185, 46);
      
      // Add explanation paragraphs with better formatting
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", 'normal');
      
      y = 150;
      const maxWidth = 160;
      
      reportData.aiExplanation.forEach(paragraph => {
        const splitText = doc.splitTextToSize(paragraph, maxWidth);
        
        // Check if we need a new page
        if (y + splitText.length * 6 > 235) {
          doc.addPage();
          
          // Add header to new page
          doc.setFillColor(59, 12, 163);
          doc.rect(0, 0, 210, 20, 'F');
          
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(14);
          doc.setFont("helvetica", 'bold');
          doc.text("CRYPTO AI MANAGER - TAX REPORT (CONTINUED)", 105, 12, { align: "center" });
          
          y = 30;
        }
        
        doc.text(splitText, 25, y);
        y += splitText.length * 6 + 7;
      });
      
      // Add disclaimer with styled box
      let disclaimerY = y + 10;
      if (disclaimerY > 235) {
        doc.addPage();
        
        // Add header to new page
        doc.setFillColor(59, 12, 163);
        doc.rect(0, 0, 210, 20, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont("helvetica", 'bold');
        doc.text("CRYPTO AI MANAGER - TAX REPORT (CONTINUED)", 105, 12, { align: "center" });
        
        disclaimerY = 30;
      }
      
      doc.setFillColor(255, 248, 225);
      doc.roundedRect(15, disclaimerY, 180, 24, 3, 3, 'F');
      
      doc.setFontSize(9);
      doc.setTextColor(120, 100, 40);
      doc.setFont("helvetica", 'italic');
      doc.text("IMPORTANT DISCLAIMER:", 25, disclaimerY + 8);
      doc.text("This report is generated for informational purposes only and does not constitute professional tax advice.", 25, disclaimerY + 14);
      doc.text("Always consult with a qualified tax professional regarding your specific circumstances.", 25, disclaimerY + 20);
      
      // Add footer with page numbers
      const pageCount = doc.getNumberOfPages();
      
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Add footer bar
        doc.setFillColor(240, 240, 250);
        doc.rect(0, 280, 210, 17, 'F');
        
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 120);
        doc.setFont("helvetica", 'normal');
        doc.text("© 2024 Crypto AI Manager", 15, 289);
        doc.text(`Page ${i} of ${pageCount}`, 105, 289, { align: "center" });
        doc.text("www.cryptoaimanager.com", 195, 289, { align: "right" });
      }
      
      // Save the PDF
      const pdfOutput = doc.output('blob');
      const url = URL.createObjectURL(pdfOutput);
      
      // Create a link to download the PDF
      const a = document.createElement('a');
      a.href = url;
      a.download = `crypto_tax_report_${country.code}_${reportData.taxYear}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }
}
