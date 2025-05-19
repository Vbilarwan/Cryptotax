import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeTaxData, generateTaxExplanation } from "./openai";
import multer from "multer";
import { sendContactEmail } from "./email";
import { insertContactMessageSchema } from "@shared/schema";
import fs from "fs";
import path from "path";

// Define file type for multer requests
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// Create CSV template directory
const TEMPLATE_DIR = path.join(process.cwd(), "dist/public/templates");
if (!fs.existsSync(TEMPLATE_DIR)) {
  fs.mkdirSync(TEMPLATE_DIR, { recursive: true });
}

// Create template CSV files
function createCsvTemplate(exchange: string, filename: string) {
  let template = "";
  
  switch (exchange) {
    case "binance":
      template = "Date,Type,Asset,Amount,Price,Fee,Notes\n2022-01-01,Buy,BTC,0.1,41000,10,Initial purchase\n2022-02-15,Sell,BTC,0.05,44000,5,Partial sale";
      break;
    case "coinbase":
      template = "Date,Type,Asset,Amount,Price,Fee,Notes\n2022-01-10,Buy,ETH,1.5,3200,8,Purchased with USD\n2022-03-20,Sell,ETH,0.5,3100,5,Converted to USD";
      break;
    case "kraken":
      template = "Date,Type,Asset,Amount,Price,Fee,Notes\n2022-01-05,Buy,DOT,100,25,2,Staking investment\n2022-04-10,Sell,DOT,50,20,1,Taking profits";
      break;
    default:
      template = "Date,Type,Asset,Amount,Price,Fee,Notes\n2022-01-01,Buy,BTC,0.1,40000,10,Example transaction";
  }
  
  fs.writeFileSync(path.join(TEMPLATE_DIR, filename), template);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Create CSV templates
  createCsvTemplate("binance", "binance.csv");
  createCsvTemplate("coinbase", "coinbase.csv");
  createCsvTemplate("kraken", "kraken.csv");

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = insertContactMessageSchema.parse(req.body);
      
      // Store the message in database
      await storage.createContactMessage({ name, email, message });
      
      // Send the email notification
      await sendContactEmail({ name, email, message });
      
      res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending contact message:", error);
      res.status(400).json({ success: false, message: "Failed to send message" });
    }
  });

  // Generate tax report from uploaded CSV
  app.post("/api/generate-report", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      const countryCode = req.body.country;
      
      if (!file || !countryCode) {
        return res.status(400).json({ error: "Missing file or country" });
      }
      
      // Parse CSV data
      const csvData = file.buffer.toString("utf-8");
      
      // Get tax data analysis from OpenAI with fallback
      const analysisResult = await analyzeTaxData(csvData, countryCode);
      
      // Use the explanation from analyzeTaxData if available, otherwise generate it
      let explanation = analysisResult.aiExplanation;
      if (!explanation) {
        explanation = await generateTaxExplanation(
          analysisResult.totalTransactions,
          analysisResult.totalCapitalGains,
          analysisResult.taxYear,
          analysisResult.estimatedTax,
          countryCode
        );
      }
      
      // Return the combined results
      res.status(200).json({
        ...analysisResult,
        aiExplanation: explanation,
      });
    } catch (error) {
      console.error("Error generating tax report:", error);
      
      // Create a fallback response for demonstration
      const currentYear = new Date().getFullYear().toString();
      res.status(200).json({
        totalTransactions: 0,
        totalCapitalGains: "$0.00",
        taxYear: currentYear,
        estimatedTax: "$0.00",
        aiExplanation: [
          "We encountered an issue while processing your cryptocurrency transactions.",
          "Our system couldn't complete the analysis of your uploaded data.",
          "This might be due to an unsupported CSV format or temporary service limitations.",
          "Please try again with a properly formatted CSV file following our template.",
          "For assistance, feel free to contact our support team using the contact form."
        ]
      });
    }
  });

  // Generate PDF from report data
  app.post("/api/generate-pdf", async (req, res) => {
    try {
      const { reportData, country } = req.body;
      
      if (!reportData || !country) {
        return res.status(400).json({ error: "Missing report data or country" });
      }
      
      // In a production app, we would generate a PDF here
      // For this demo, let's return a sample PDF
      
      // Generate simple PDF buffer
      const pdfBuffer = Buffer.from("Sample PDF content");
      
      // Send the PDF
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=crypto_tax_report_${country}_${reportData.taxYear}.pdf`,
        "Content-Length": pdfBuffer.length,
      });
      
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });
  
  // Serve CSV templates
  app.get("/templates/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(TEMPLATE_DIR, filename);
    
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      res.sendFile(filePath);
    } else {
      res.status(404).send("Template not found");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
