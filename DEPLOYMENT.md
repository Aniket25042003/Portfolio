# Vercel Deployment Guide

This portfolio has been restructured for serverless deployment on Vercel.

## Project Structure

```
Portfolio/
├── api/                    # Serverless functions
│   └── send-email.js      # Contact form handler
├── src/                   # React application source
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   └── pages/
├── public/                # Static assets (served directly)
│   ├── assets/           # Images and other assets
│   ├── certificates/     # Certificate images
│   └── resume.pdf        # Your resume file
├── vercel.json          # Vercel configuration
├── index.html           # Main HTML file
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Before Deployment

### 1. Add Your Assets

Copy your assets to the `public/` folder:

```bash
# Create directories (if they don't exist)
mkdir -p public/certificates public/assets

# Copy your resume (REQUIRED - must be named exactly 'resume.pdf')
cp your-resume.pdf public/resume.pdf

# Copy your profile image
cp your-profile-image.jpg public/assets/aniket-patel.jpg

# Copy certificate images (rename them to match the expected filenames)
cp certificate-images/* public/certificates/
```

**Important**: The resume button now uses **direct file serving** for both environments:
- **Development**: Vite serves `/resume.pdf` from public folder
- **Production**: Vercel serves `/resume.pdf` from public folder automatically
- **Consistent**: Same URL (`/resume.pdf`) works everywhere!

### 2. Environment Variables

You'll need to set these environment variables in Vercel:

- `GMAIL_USER`: Your Gmail address
- `GMAIL_PASS`: Your Gmail app password (not regular password)

**To get Gmail App Password:**
1. Enable 2-Factor Authentication on your Google account
2. Go to Security → App Passwords
3. Generate an app password for "Mail"

## Deployment Options

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables
vercel env add GMAIL_USER
vercel env add GMAIL_PASS

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. Add environment variables in the Vercel dashboard
5. Deploy automatically

## API Endpoints

After deployment, your API endpoint will be available at:

- `POST /api/send-email` - Contact form submission

## Static Assets

Static files are served directly from the `public/` folder:

- `/resume.pdf` - Resume download (direct file serving)
- `/assets/aniket-patel.jpg` - Profile image
- `/certificates/[filename]` - Certificate images

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Migration from Express Server

This structure converts your previous Express.js server to serverless functions:

- **Before**: Single Express server with all routes
- **After**: Individual serverless functions for each endpoint
- **Benefits**: Better performance, automatic scaling, no cold starts for static content

## Troubleshooting

1. **API not working**: Check environment variables in Vercel dashboard
2. **Resume not found**: Ensure `resume.pdf` is in the `public/` folder
3. **Build errors**: Check that all dependencies are in `package.json`
4. **Import errors**: Verify path aliases in `vite.config.ts` 