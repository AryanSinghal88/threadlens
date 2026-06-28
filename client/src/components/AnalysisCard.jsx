import { useState } from 'react'

const extractVideoId = (url) => {
  if (!url) return ''
  const patterns = [
    /[?&]v=([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
    /(?:youtube\.com\/shorts\/)([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return ''
}

const fields = [
  {
    key: 'consensus',
    label: 'Consensus',
    sub: 'What most people agree on',
    color: 'var(--text-primary)',
    dot: 'var(--accent)',
    bg: 'rgba(212, 148, 58, 0.04)',
    borderHover: 'rgba(212, 148, 58, 0.15)',
  },
  {
    key: 'topPraise',
    label: 'Top Praise',
    sub: 'Most common positive sentiment',
    color: 'var(--success)',
    dot: 'var(--success)',
    bg: 'rgba(46, 204, 143, 0.04)',
    borderHover: 'rgba(46, 204, 143, 0.15)',
  },
  {
    key: 'topComplaint',
    label: 'Top Complaint',
    sub: 'Most common criticism',
    color: 'var(--danger)',
    dot: 'var(--danger)',
    bg: 'rgba(224, 85, 85, 0.04)',
    borderHover: 'rgba(224, 85, 85, 0.15)',
  },
  {
    key: 'contrarian',
    label: 'Contrarian Take',
    sub: 'The minority view worth knowing',
    color: '#A78BFA',
    dot: '#A78BFA',
    bg: 'rgba(167, 139, 250, 0.04)',
    borderHover: 'rgba(167, 139, 250, 0.15)',
  },
  {
    key: 'verdict',
    label: 'Verdict',
    sub: 'One-line summary',
    color: 'var(--accent)',
    dot: 'var(--accent)',
    bg: 'rgba(212, 148, 58, 0.06)',
    borderHover: 'rgba(212, 148, 58, 0.2)',
  },
]

const FieldCard = ({ field, value, delay }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '18px 20px',
        borderRadius: '12px',
        background: field.bg,
        border: `1px solid ${hovered ? field.borderHover : 'var(--border)'}`,
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        cursor: 'default',
        opacity: 0,
        animation: `fadeUp 0.45s ease ${delay}ms forwards`,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px',
        flexWrap: 'wrap',
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: field.dot,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '11px',
          fontWeight: '700',
          color: field.color,
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {field.label}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
          — {field.sub}
        </span>
      </div>
      <p style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        lineHeight: '1.65',
        margin: 0,
      }}>
        {value}
      </p>
    </div>
  )
}

const AnalysisCard = ({ analysis }) => {
  const videoId = extractVideoId(analysis.youtubeUrl)
//   const [imgSrc, setImgSrc] = useState(
//     `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
//   )
  const [imgError, setImgError] = useState(false)
  const apiBase = import.meta.env.VITE_API_URL || ''
  const thumbnailUrl = `${apiBase}/api/thumbnail/${videoId}`
  const [copied, setCopied] = useState(false)
  return (
    <div style={{ width: '100%' }}>

      {/* Video info with thumbnail */}
      <div style={{
        borderRadius: '12px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        marginBottom: '12px',
        overflow: 'hidden',
        opacity: 0,
        animation: 'fadeUp 0.45s ease 0ms forwards',
      }}>

        {/* Thumbnail */}
        <div style={{ width: '100%', height: '180px', overflow: 'hidden', position: 'relative', background: 'var(--bg-elevated)' }}>
  {!imgError ? (
  <img
    src={thumbnailUrl}
    alt={analysis.postTitle}
    onError={() => setImgError(true)}
    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
  />
) : (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      <svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='var(--text-dim)' strokeWidth='1.5'>
        <path d='M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z'/>
        <polygon points='9.75 15.02 15.5 12 9.75 8.98 9.75 15.02'/>
      </svg>
      <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono, monospace' }}>
        thumbnail loads on deployment
      </span>
    </div>
  )}
  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)' }}>
    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
      <svg width='16' height='16' viewBox='0 0 24 24' fill='var(--accent)'>
        <polygon points='9.75 15.02 15.5 12 9.75 8.98 9.75 15.02'/>
      </svg>
    </div>
  </div>
</div>

        {/* Meta */}
        <div style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              fontFamily: 'Space Grotesk, sans-serif',
              marginBottom: '3px',
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
            }}>
              {analysis.commentCount} comments analyzed
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
            onClick={() => {
            const shareUrl = `${window.location.origin}/share/${analysis.shareId}`
            navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            }}
            style={{
            fontSize: '11px',
            color: copied ? 'var(--success)' : 'var(--text-secondary)',
            fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap',
            padding: '4px 10px',
            borderRadius: '6px',
            border: `1px solid ${copied ? 'rgba(46, 204, 143, 0.3)' : 'var(--border)'}`,
            background: copied ? 'rgba(46, 204, 143, 0.06)' : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s',
            }}
        >
            {copied ? 'Copied!' : 'Share'}
        </button>
            <a
            href={analysis.youtubeUrl}
            target='_blank'
            rel='noopener noreferrer'
            style={{
            fontSize: '11px',
            color: 'var(--accent)',
            fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(212, 148, 58, 0.2)',
            background: 'rgba(212, 148, 58, 0.06)',
            }}
        >
            Watch
        </a>
        </div>
          
        </div>
      </div>

      {/* Field cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {fields.map((field, index) => (
          <FieldCard
            key={field.key}
            field={field}
            value={analysis[field.key]}
            delay={index * 80 + 100}
          />
        ))}
      </div>
    </div>
  )
}

export default AnalysisCard