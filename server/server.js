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
app.use('/api/analysis', analysisRoutes)

app.get('/', (req, res)=>{
    res.json({ 'message': 'Welcome to the Threadlens API' })
})

const PORT = process.env.PORT || 5175
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

