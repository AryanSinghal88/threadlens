const Loader = ({ text = 'Analyzing comments...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      padding: '56px 0',
      animation: 'fadeIn 0.3s ease forwards',
    }}>
      {/* Spinner */}
      <div style={{ position: 'relative', width: '40px', height: '40px' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid var(--border)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'var(--accent)',
          animation: 'spin 0.8s linear infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '8px',
          borderRadius: '50%',
          border: '1.5px solid transparent',
          borderBottomColor: 'var(--text-dim)',
          animation: 'spin 1.2s linear infinite reverse',
        }} />
      </div>

      <p style={{
        fontSize: '11px',
        color: 'var(--text-secondary)',
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {text}
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Loader