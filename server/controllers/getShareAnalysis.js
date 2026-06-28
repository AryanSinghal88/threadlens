import Analysis from '../models/Analysis.js'

export const getSharedAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ shareId: req.params.shareId })

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' })
    }

    res.status(200).json(analysis)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}