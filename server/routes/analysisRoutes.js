import express from 'express'
import {
  createAnalysis,
  getAnalyses,
  getAnalysis,
  deleteAnalysis,
} from '../controllers/analysisController.js'
import { protect } from '../middleware/authMiddleware.js'
import { getSharedAnalysis } from '../controllers/getShareAnalysis.js'
const router = express.Router()

router.route('/').get(protect, getAnalyses).post(protect, createAnalysis)
router.get('/share/:shareId', getSharedAnalysis)
router
  .route('/:id')
  .get(protect, getAnalysis)
  .delete(protect, deleteAnalysis)

export default router