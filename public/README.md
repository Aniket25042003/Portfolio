# Public Assets

This folder contains static assets that will be served directly by Vercel.

## Required Files

1. **resume.pdf** - Your resume file that will be served via /api/resume
2. **assets/** - Profile images and other assets
3. **certificates/** - Certificate images for the certificates section

## File Structure

```
public/
├── resume.pdf                           # Your resume file
├── assets/
│   └── aniket-patel.jpg                # Profile picture
└── certificates/                        # Certificate images (use exact names below)
    ├── machine-learning-specialization.jpg
    ├── advanced-learning-algorithms.jpg
    ├── supervised-machine-learning-regression-and-classification.jpg
    ├── building-code-agents-with-hugging-face-smolagents.png
    ├── serverless-agentic-workflows-with-amazon-bedrock.png
    ├── multi-ai-agent-systems-with-crewai.png
    ├── building-ai-browser-agents.png
    ├── easyhacks-certificate.png
    ├── screenpipe-agentic-hackathon-certificate.png
    ├── visionary-certificate.png
    ├── gpt-wrapper-hackathon-nebius-ai-studio-certificate.png
    ├── everydai-certificate.png
    └── rebuild-the-openai-tool-challenge-certificate.png
```

## Certificate Naming Convention

All certificate files use **kebab-case** (lowercase with hyphens):
- ✅ `machine-learning-specialization.jpg`
- ✅ `building-ai-browser-agents.png`
- ❌ `Building AI Browser Agents.png` (avoid spaces and capitals)
- ❌ `building-aI-browser Agents.png` (avoid mixed case)

## How to Add Files

1. Place your resume as `resume.pdf` in this directory
2. Copy your profile image to `assets/aniket-patel.jpg`
3. **Rename your certificate images** to match the exact filenames listed above
4. Copy renamed certificate images to `certificates/` folder

## Note

These files will be accessible at:
- `/resume.pdf` (direct file serving - works in both dev and production!)
- `/assets/aniket-patel.jpg`
- `/certificates/[filename]`

**Important**: 
- Use the exact filenames listed in the File Structure section above for your certificates
- The resume MUST be named exactly `resume.pdf` (lowercase)
- All files are served directly from the public folder 