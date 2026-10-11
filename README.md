# Zavro Infotech — Official Website

Built with **Next.js 16** (Turbopack) · **React 19** · **TypeScript** · **Tailwind CSS v4**

---

## 🚀 Hostinger Deployment Guide

### Prerequisites
- Hostinger **VPS** or **Cloud Hosting** with Node.js support (Node 20+)
- SSH access to your server

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/zavroinfotech/zavro-infotech-website.git
   cd zavro-infotech-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   The app runs on `http://localhost:3000` by default. Use a reverse proxy (Nginx / Apache) to serve it on port 80/443.

---

## 🛠 Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build production bundle |
| `npm start` | Run production server |
| `npm run lint` | Lint the codebase |
| `npm run typecheck` | Type-check with TypeScript |

---

## 📬 Contact

**Email:** sales@zavroinfotech.in  
**Website:** [zavroinfotech.in](https://zavroinfotech.in)
