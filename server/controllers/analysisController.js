import Analysis from '../models/Analysis.js'
import { fetchYouTubeComments } from '../services/youtubeService.js'
import { analyzeComments } from '../services/geminiService.js'

export const createAnalysis = async (req, res) => {
  try {
    const { youtubeUrl } = req.body

    if (!youtubeUrl) {
      return res.status(400).json({ message: 'YouTube URL is required' })
    }

    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)/
    if (!urlPattern.test(youtubeUrl)) {
      return res.status(400).json({ message: 'Please provide a valid YouTube URL' })
    }

    const existingAnalysis = await Analysis.findOne({
      user: req.user._id,
      youtubeUrl: youtubeUrl,
    })

    if (existingAnalysis) {
      return res.status(200).json(existingAnalysis)
    }

    const { videoTitle, videoDescription, comments } = await fetchYouTubeComments(youtubeUrl)

    const { consensus, topPraise, topComplaint, contrarian, verdict } =
      await analyzeComments(videoTitle, videoDescription, comments)

    const analysis = await Analysis.create({
      user: req.user._id,
      youtubeUrl: youtubeUrl,
      postTitle: videoTitle,
      consensus,
      topPraise,
      topComplaint,
      contrarian,
      verdict,
      commentCount: comments.length,
    })

    res.status(201).json(analysis)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id }).sort({
      createdAt: -1,
    })

    res.status(200).json(analyses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id)

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' })
    }

    if (analysis.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    res.status(200).json(analysis)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id)

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' })
    }

    if (analysis.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' })
    }

    await analysis.deleteOne()

    res.status(200).json({ message: 'Analysis deleted', id: req.params.id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}