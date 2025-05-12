import * as dotenv from 'dotenv';
dotenv.config();
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import nodemailer from 'nodemailer';
const port = process.env.PORT || 5001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a Nodemailer transporter (configure with your email provider)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., 'gmail', 'SendGrid')
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail email address (or SendGrid API key, etc.)
        pass: process.env.GMAIL_PASS, // Your Gmail password or SendGrid password
    },
});

// API route for sending email
app.post("/api/send-email", async (req: Request, res: Response) => {
    console.log("Received /api/send-email request.  req.body:", req.body);

    try {
        const { recipient, subject, message } = req.body;

        // Email options
        const mailOptions = {
            from: process.env.GMAIL_USER, // Sender address
            to: recipient, // Recipient address from the form
            subject: subject,
            text: message,
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info);
        res.status(200).json({ success: true, message: "Email sent successfully!", response: info });
    } catch (error: any) {
        console.error("Error in /api/send-email:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Middleware for logging request durations and responses
app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;
        if (path.startsWith("/api")) {
            let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
            if (capturedJsonResponse) {
                logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
            }

            if (logLine.length > 80) {
                logLine = logLine.slice(0, 79) + "…";
            }

            log(logLine);
        }
    });

    next();
});

(async () => {
    const server = await registerRoutes(app);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";

        res.status(status).json({ message });
        throw err;
    });

    // Setup Vite in development, serve static in production
    if (app.get("env") === "development") {
        await setupVite(app, server);
    } else {
        serveStatic(app);
    }

    // Start server on port 5001
    server.listen(port, () => {
        log(`Serving on port ${port}`);
    });
})();
