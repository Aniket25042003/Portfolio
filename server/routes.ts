import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to download resume
  app.get("/api/resume", (req, res) => {
    const resumePath = path.resolve(import.meta.dirname, "../public/resume.pdf");
    
    // If resume exists, serve it, otherwise send a 404
    if (fs.existsSync(resumePath)) {
      res.download(resumePath, "John_Doe_Resume.pdf");
    } else {
      res.status(404).json({ message: "Resume not found" });
    }
  });

  // API endpoint to send contact form submissions
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // In a real implementation, this would send an email or store in database
    // For now, just return success response
    
    res.status(200).json({ 
      success: true, 
      message: "Message received! We'll get back to you soon." 
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
