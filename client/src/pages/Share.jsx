import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSharedAnalysis } from '../services/api'
import AnalysisCard from '../components/AnalysisCard'
import Loader from '../components/Loader'

const Share = () => {
  const { shareId } = useParams()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await getSharedAnalysis(shareId)
        setAnalysis(res.data)
      } catch (err) {
        setError('This analysis does not exist or has been deleted')
      } finally {
        setLoading(false)
      }
    }
    fetchAnalysis()
  }, [shareId])

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 24px 80px',
    }}>
      <div style={{ width: '100%', maxWidth: '640px' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
        }}>
          <div>
            <p style={{
              fontSize: '11px',
              color: 'var(--text-dim)',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              Shared analysis
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              via ThreadLens
            </p>
          </div>
          <Link to='/' style={{
            fontSize: '13px',
            color: 'var(--accent)',
            fontWeight: '500',
            padding: '7px 16px',
            borderRadius: '8px',
            background: 'rgba(212, 148, 58, 0.08)',
            border: '1px solid rgba(212, 148, 58, 0.2)',
            fontFamily: 'Space Grotesk, sans-serif',
          }}>
            Try ThreadLens
          </Link>
        </div>

        {loading && <Loader text='Loading shared analysis...' />}

        {error && (
          <div style={{
            padding: '32px',
            borderRadius: '12px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {error}
            </p>
            <Link to='/' style={{
              fontSize: '14px',
              color: 'var(--accent)',
              fontWeight: '500',
            }}>
              Go to ThreadLens
            </Link>
          </div>
        )}

        {analysis && !loading && <AnalysisCard analysis={analysis} />}
      </div>
    </div>
  )
}

export default Share