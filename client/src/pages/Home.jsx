import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAnalysis } from '../services/api'
import { useAuth } from '../hooks/useAuth'
import AnalysisCard from '../components/AnalysisCard'
import Loader from '../components/Loader'
import CyclingWord from '../components/CyclingWord'

const Home = () => {
  const [url, setUrl] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    setError('')
    setAnalysis(null)
    setLoading(true)
    try {
      const res = await createAnalysis(url)
      setAnalysis(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '72px 24px 80px',
    }}>

      {/* Radial glow behind hero */}
      <div style={{
        position: 'fixed',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '300px',
        background: 'radial-gradient(ellipse at center, rgba(212, 148, 58, 0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ width: '100%', maxWidth: '720px', position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '28px',
          animation: 'fadeUp 0.5s ease forwards',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '100px',
            background: 'rgba(212, 148, 58, 0.07)',
            border: '1px solid rgba(212, 148, 58, 0.15)',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent)',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{
              fontSize: '12px',
              color: 'var(--accent)',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.04em',
            }}>
              AI-powered · YouTube comments
            </span>
          </div>
        </div>

        {/* Hero heading with cycling word */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          animation: 'fadeUp 0.5s ease 0.1s forwards',
          opacity: 0,
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '-1.5px',
            lineHeight: '1.1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0 12px',
          }}>
            <p>What do people</p>
            <CyclingWord />
            <p>think?</p>
          </h1>
        </div>

        {/* Subheading */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          animation: 'fadeUp 0.5s ease 0.2s forwards',
          opacity: 0,
        }}>
          <p style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            lineHeight: '1.65',
            maxWidth: '460px',
            margin: '0 auto',
            fontWeight: '400',
          }}>
            Paste any YouTube URL. ThreadLens reads every comment
            and distills the real consensus — in seconds.
          </p>
        </div>

        {/* Input */}
        <div style={{
          marginBottom: '32px',
          animation: 'fadeUp 0.5s ease 0.3s forwards',
          opacity: 0,
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex',
              borderRadius: '14px',
              background: 'var(--bg-surface)',
              border: `1px solid ${loading ? 'var(--accent)' : 'var(--border)'}`,
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              overflow: 'hidden',
              boxShadow: loading
                ? '0 0 0 3px rgba(212, 148, 58, 0.08), 0 0 30px rgba(212, 148, 58, 0.05)'
                : '0 1px 3px rgba(0,0,0,0.3)',
              animation: loading ? 'glow 2s ease-in-out infinite' : 'none',
            }}>
              <input
                ref={inputRef}
                type='text'
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder='https://youtube.com/watch?v=...'
                required
                style={{
                  flex: 1,
                  padding: '15px 18px',
                  fontSize: '13px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontFamily: 'JetBrains Mono, monospace',
                  minWidth: 0,
                }}
              />
              <button
                type='submit'
                disabled={loading || !url.trim()}
                style={{
                  padding: '15px 26px',
                  background: loading || !url.trim() ? 'var(--accent-dim)' : 'var(--accent)',
                  color: '#000',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'Space Grotesk, sans-serif',
                  opacity: loading || !url.trim() ? 0.5 : 1,
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  letterSpacing: '-0.2px',
                }}
                onMouseEnter={e => {
                  if (!loading && url.trim()) {
                    e.currentTarget.style.background = '#E8A840'
                  }
                }}
                onMouseLeave={e => {
                  if (!loading && url.trim()) {
                    e.currentTarget.style.background = 'var(--accent)'
                  }
                }}
              >
                {loading ? 'Analyzing...' : '→ Analyze'}
              </button>
            </div>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div
            className='animate-fade-in'
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(224, 85, 85, 0.08)',
              border: '1px solid rgba(224, 85, 85, 0.2)',
              color: 'var(--danger)',
              fontSize: '14px',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        {/* Loader */}
        {loading && <Loader text='Reading the room...' />}

        {/* Result — staggered card reveal */}
        {analysis && !loading && (
          <div className='animate-fade-in'>
            <AnalysisCard analysis={analysis} />
          </div>
        )}

        {/* Empty hints */}
        {!analysis && !loading && !error && (
          <div style={{
            textAlign: 'center',
            marginTop: '48px',
            animation: 'fadeUp 0.5s ease 0.4s forwards',
            opacity: 0,
          }}>
            <p style={{
              fontSize: '11px',
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: '14px',
            }}>
              Works great with
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
            }}>
              {['Product reviews', 'Music videos', 'News coverage', 'Movie trailers', 'Tech tutorials'].map((hint, i) => (
                <span
                  key={hint}
                  style={{
                    fontSize: '12px',
                    padding: '5px 13px',
                    borderRadius: '100px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    animation: `fadeUp 0.4s ease ${0.5 + i * 0.07}s forwards`,
                    opacity: 0,
                  }}
                >
                  {hint}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home