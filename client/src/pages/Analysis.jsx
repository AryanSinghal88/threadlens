import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAnalysis } from '../services/api'
import AnalysisCard from '../components/AnalysisCard'
import Loader from '../components/Loader'

const Analysis = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await getAnalysis(id)
        setAnalysis(res.data)
      } catch (err) {
        setError('Analysis not found')
      } finally {
        setLoading(false)
      }
    }
    fetchAnalysis()
  }, [id])

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 24px 80px',
    }}>
      <div style={{ width: '100%', maxWidth: '640px' }}>

        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: 'var(--text-secondary)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '32px',
            padding: '0',
            fontFamily: 'Inter, sans-serif',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M19 12H5M12 19l-7-7 7-7'/>
          </svg>
          Back to history
        </button>

        {loading && <Loader text='Loading analysis...' />}

        {error && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'rgba(224, 85, 85, 0.08)',
            border: '1px solid rgba(224, 85, 85, 0.2)',
            color: 'var(--danger)',
            fontSize: '14px',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {analysis && !loading && <AnalysisCard analysis={analysis} />}
      </div>
    </div>
  )
}

export default Analysis