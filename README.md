# ThreadLens

> Paste any YouTube URL. Get AI-powered insights from the comments — in seconds.

**Live Demo → [threadlens-sepia.vercel.app](https://threadlens-sepia.vercel.app)**

ThreadLens analyzes 100 YouTube comments using Google Gemini AI and distills them into five structured insights: what people agree on, top praise, top complaint, the contrarian take, and a one-line verdict.

---

## Features

- Paste any YouTube URL → get instant AI-powered comment analysis
- Save analysis history (requires account)
- Share any analysis via public link — no login required for viewers
- YouTube video thumbnail preview
- Anonymous analysis without creating an account

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router v7
- Axios
- Tailwind CSS v4
- Custom CSS animations (staggered card reveals, cycling hero text)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication (bcryptjs)
- RESTful API architecture
- Rate limiting (express-rate-limit)

**Integrations**
- YouTube Data API v3 — fetches top 100 comments ordered by relevance
- Google Gemini 3.1 Flash Lite API — AI analysis via direct REST calls
- Backend thumbnail proxy — bypasses YouTube CDN CORS restrictions

**Deployment**
- Frontend → Vercel
- Backend → Render

---

## Architecture
User pastes YouTube URL

↓

React Frontend (Vercel)

↓ REST API call with JWT

Express Backend (Render)

↓

YouTube Data API v3 → fetch 100 comments

↓

Google Gemini API → analyze comments → return structured JSON

↓

MongoDB Atlas → save analysis

↓

Frontend renders staggered card reveal

---

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Create account |
| POST | /api/auth/login | Public | Login, returns JWT |
| GET | /api/auth/me | Private | Get current user |
| POST | /api/analyses | Private | Create new analysis |
| GET | /api/analyses | Private | Get user's history |
| GET | /api/analyses/:id | Private | Get single analysis |
| DELETE | /api/analyses/:id | Private | Delete analysis |
| GET | /api/analyses/share/:shareId | Public | Get shared analysis |
| GET | /api/thumbnail/:videoId | Public | Thumbnail proxy |

---

## Running Locally

**Prerequisites:** Node.js v18+, MongoDB Atlas account, YouTube Data API key, Google AI Studio API key

**1. Clone the repository**
```bash
git clone https://github.com/AryanSinghal88/threadlens.git
cd threadlens
```

**2. Backend setup**
```bash
cd server
npm install
```

Create `server/.env`:
```bash
npm run dev
```

**3. Frontend setup**
```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Key Engineering Decisions

**Why a backend thumbnail proxy?**
YouTube's CDN (`i.ytimg.com`) blocks direct browser requests due to missing CORS headers. The backend fetches thumbnails server-to-server and pipes them to the client, with a 24-hour cache header to minimize repeat requests.

**Why direct REST calls instead of the Gemini SDK?**
The `@google/genai` SDK had authentication issues with the new auth key format introduced in June 2026. Direct fetch calls with the API key as a query parameter are more explicit, easier to debug, and don't depend on SDK version compatibility.

**Why nanoid for shareIds?**
Short, URL-safe, collision-resistant IDs for public share links. Each analysis gets a unique 10-character shareId at creation time, enabling read-only public access without exposing MongoDB ObjectIds.

**Why separate rate limiters?**
A global limiter (50 req/15min) protects all endpoints from abuse. A tighter analysis limiter (10/hour) specifically protects the Gemini API quota which has daily limits on the free tier.

---

## Screenshots

> Add screenshots here after deployment

---

Built by [Aryan Singhal](https://github.com/AryanSinghal88)