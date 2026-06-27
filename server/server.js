import express from 'express'
import connectDB from './config/db.js'

import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import analysisRoutes from './routes/analysisRoutes.js'



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

app.get('/', (req, res)=>{
    res.json({ 'message': 'Welcome to the Threadlens API' })
})

const PORT = process.env.PORT || 5175
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

