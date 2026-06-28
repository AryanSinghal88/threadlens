import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import analysisRoutes from './routes/analysisRoutes.js'
import rateLimit from 'express-rate-limit'
const app = express()

connectDB()

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://threadlens.vercel.app',
    /\.vercel\.app$/,
  ],
  credentials: true,
}))

app.use(express.json())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { message: 'Too many requests, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
})

const analysisLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { message: 'Analysis limit reached. Please try again after an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', limiter)
app.use('/api/analyses', analysisLimiter)
app.use('/api/auth', authRoutes)
app.use('/api/analyses', analysisRoutes)

app.get('/api/thumbnail/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params
    const url = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Thumbnail not found')
    const buffer = await response.arrayBuffer()
    res.set('Content-Type', 'image/jpeg')
    res.set('Cache-Control', 'public, max-age=86400')
    res.send(Buffer.from(buffer))
  } catch (error) {
    res.status(404).json({ message: 'Thumbnail not found' })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'ThreadLens API is running' })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

