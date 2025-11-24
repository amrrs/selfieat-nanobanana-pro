# SelfieAt

AI-powered selfie teleportation app. Upload a selfie, choose any location, and let Nano Banana Pro AI merge you into stunning new scenes.

![SelfieAt Banner](https://img.shields.io/badge/Powered%20by-Nano%20Banana%20Pro-5E6AD2?style=for-the-badge) ![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ installed
- **FAL API Key** (get one from [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys))

### Installation

1. **Clone & Install Dependencies**
```bash
git clone <your-repo-url>
cd selfieat
npm install
```

2. **Setup Environment Variables**

Create a `.env` file in the project root:

```env
FAL_KEY=your_fal_ai_key_here
```

> ⚠️ **Important**: Replace `your_fal_ai_key_here` with your actual FAL API key from https://fal.ai/dashboard/keys

### Development

You need to run **TWO terminals** simultaneously:

**Terminal 1 - Start API Server (Port 3000):**
```bash
npm run dev:server
```

**Terminal 2 - Start Frontend Dev Server (Port 5173):**
```bash
npm run dev
```

Then open your browser to **[http://localhost:5173](http://localhost:5173)**

> 💡 The frontend (Vite) proxies API requests to the backend (Express) automatically in development.

### Production Build

```bash
# Build the frontend
npm run build

# Start production server
npm start
```

The app will be available at **http://localhost:3000**

## 🔑 Environment Variables

| Variable | Description | Required | Where to Get |
|----------|-------------|----------|--------------|
| `FAL_KEY` | Your FAL AI API key | ✅ Yes | [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys) |

## 📦 Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7
- **Styling**: Tailwind CSS 4 (Linear-inspired design)
- **Animations**: Framer Motion
- **AI API**: Nano Banana Pro via [@fal-ai/client](https://fal.ai)
- **Backend**: Express (API proxy for secure key handling)
- **Icons**: Lucide React
- **File Upload**: React Dropzone

## 🎨 Features

- ✨ **Modern UI**: Linear-inspired dark theme with glassmorphism
- 📸 **Dual Input**: Camera capture or file upload (max 10MB)
- 🌍 **Multi-Location**: Generate images for up to 2 locations simultaneously
- 🎯 **AI Generation**: 2 variants per location (4 images total)
- 🔒 **Secure**: API keys handled server-side only
- ⏱️ **Smart Timeouts**: 2-minute request timeout with retry
- 🚨 **Error Handling**: User-friendly error messages
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 💧 **Watermark**: Subtle branding on generated images
- ⚡ **Animations**: Laser scanning effect, shimmer buttons, smooth transitions

## 🏗️ Project Structure

```
selfieat/
├── public/              # Static assets
│   └── favicon.svg      # Custom favicon
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx    # Hero & CTA section
│   │   └── Generator.tsx      # Main app interface
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles + animations
├── server.js            # Express API proxy
├── .env                 # Environment variables (create this!)
└── package.json
```

## 🚢 Deployment

### Railway (Recommended)

1. Push your code to GitHub
2. Create a new project on [Railway](https://railway.app)
3. Connect your GitHub repository
4. Add environment variable:
   - Key: `FAL_KEY`
   - Value: Your FAL API key
5. Configure build settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
6. Deploy!

### Other Platforms (Render, Heroku, etc.)

Similar steps:
- Set `FAL_KEY` environment variable
- Build: `npm run build`
- Start: `npm start`
- Ensure Node.js v18+ is available

## 🐛 Troubleshooting

**Problem**: "Failed to generate images"
- ✅ Check that `FAL_KEY` is set correctly in `.env`
- ✅ Verify your API key is valid at [fal.ai](https://fal.ai)
- ✅ Make sure the API server is running (`npm run dev:server`)

**Problem**: "Request timed out"
- ✅ The AI model might be busy. Wait a moment and try again.
- ✅ Check your internet connection

**Problem**: "Image must be less than 10MB"
- ✅ Compress your image or use a smaller file

**Problem**: CORS errors in development
- ✅ Make sure both terminals are running (frontend + backend)
- ✅ Frontend should be on `:5173`, backend on `:3000`

## 📝 License

MIT License - Feel free to use this for your projects!

## 🙏 Credits

- **AI Model**: [Nano Banana Pro](https://fal.ai/models/fal-ai/nano-banana-pro/edit) by fal.ai
- **Design Inspiration**: [Linear](https://linear.app)

---

Built with ❤️ using Nano Banana Pro AI
