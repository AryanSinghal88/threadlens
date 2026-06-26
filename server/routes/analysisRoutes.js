import express from 'express'
import {
  createAnalysis,
  getAnalyses,
  getAnalysis,
  deleteAnalysis,
} from '../controllers/analysisController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getAnalyses).post(protect, createAnalysis)

router
  .route('/:id')
  .get(protect, getAnalysis)
  .delete(protect, deleteAnalysis)

export default router