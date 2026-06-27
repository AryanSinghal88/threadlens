import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAnalyses, deleteAnalysis } from '../services/api'
import Loader from '../components/Loader'

const Dashboard = () => {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [hoveredId, setHoveredId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const res = await getAnalyses()
        setAnalyses(res.data)
      } catch (err) {
        setError('Failed to load your analyses')
      } finally {
        setLoading(false)
      }
    }
    fetchAnalyses()
  }, [])

  const handleDelete = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await deleteAnalysis(id)
      setAnalyses(analyses.filter(a => a._id !== id))
    } catch (err) {
      setError('Failed to delete')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '56px 24px 80px',
    }}>
      <div style={{ width: '100%', maxWidth: '640px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '26px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
            marginBottom: '6px',
            fontFamily: 'Space Grotesk, sans-serif',
          }}>
            History
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Your past analyses
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '10px',
            background: 'rgba(224, 85, 85, 0.08)',
            border: '1px solid rgba(224, 85, 85, 0.2)',
            color: 'var(--danger)',
            fontSize: '14px',
            marginBottom: '24px',
          }}>
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && <Loader text='Loading history...' />}

        {/* Empty state */}
        {!loading && analyses.length === 0 && (
          <div style={{
            padding: '64px 32px',
            borderRadius: '16px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            textAlign: 'center',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'var(--bg-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='var(--text-dim)' strokeWidth='1.5'>
                <circle cx='11' cy='11' r='8'/>
                <path d='m21 21-4.35-4.35'/>
              </svg>
            </div>
            <p style={{
              fontSize: '15px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              fontFamily: 'Space Grotesk, sans-serif',
              marginBottom: '8px',
            }}>
              No analyses yet
            </p>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              marginBottom: '24px',
            }}>
              Paste a YouTube URL to get started
            </p>
            <Link to='/' style={{
              display: 'inline-block',
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'var(--accent)',
              color: '#000',
              fontSize: '14px',
              fontWeight: '600',
              fontFamily: 'Space Grotesk, sans-serif',
            }}>
              Analyze a video
            </Link>
          </div>
        )}

        {/* List */}
        {!loading && analyses.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {analyses.map(analysis => (
              <div
                key={analysis._id}
                onClick={() => navigate(`/analysis/${analysis._id}`)}
                onMouseEnter={() => setHoveredId(analysis._id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  padding: '16px 18px',
                  borderRadius: '12px',
                  background: hoveredId === analysis._id ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  position: 'relative',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'var(--bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>
                  <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='var(--accent)' strokeWidth='2'>
                    <path d='M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z'/>
                    <polygon points='9.75 15.02 15.5 12 9.75 8.98 9.75 15.02'/>
                  </svg>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'var(--text-primary)',
                    fontFamily: 'Space Grotesk, sans-serif',
                    marginBottom: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {analysis.postTitle}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: 'var(--text-dim)',
                    fontFamily: 'JetBrains Mono, monospace',
                    marginBottom: '8px',
                  }}>
                    {analysis.commentCount} comments · {formatDate(analysis.createdAt)}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {analysis.verdict}
                  </p>
                </div>

                {/* Delete button */}
                {hoveredId === analysis._id && (
                  <button
                    onClick={(e) => handleDelete(e, analysis._id)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: 'rgba(224, 85, 85, 0.08)',
                      border: '1px solid rgba(224, 85, 85, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(224, 85, 85, 0.15)'
                      e.currentTarget.style.borderColor = 'rgba(224, 85, 85, 0.3)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(224, 85, 85, 0.08)'
                      e.currentTarget.style.borderColor = 'rgba(224, 85, 85, 0.15)'
                    }}
                  >
                    <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='var(--danger)' strokeWidth='2'>
                      <polyline points='3 6 5 6 21 6'/>
                      <path d='M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'/>
                      <path d='M10 11v6M14 11v6'/>
                      <path d='M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2'/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* New analysis link */}
        {!loading && analyses.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to='/' style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              transition: 'all 0.2s',
            }}>
              + New analysis
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard