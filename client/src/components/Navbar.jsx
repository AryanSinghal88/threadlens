import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      background: 'rgba(8, 12, 20, 0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <Link to='/' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '8px',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: '700',
          color: 'var(--bg-primary)',
          fontFamily: 'Space Grotesk, sans-serif',
          flexShrink: 0,
        }}>
          T
        </div>
        <span style={{
          fontSize: '17px',
          fontWeight: '600',
          fontFamily: 'Space Grotesk, sans-serif',
          color: 'var(--text-primary)',
          letterSpacing: '-0.3px',
        }}>
          Thread<span style={{ color: 'var(--accent)' }}>Lens</span>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {user ? (
          <>
            <Link to='/dashboard' style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              padding: '6px 12px',
              borderRadius: '8px',
              transition: 'color 0.2s',
              fontWeight: '500',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              History
            </Link>
            <button
              onClick={handleLogout}
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                padding: '6px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'transparent',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.borderColor = 'var(--text-dim)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link to='/login' style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              padding: '6px 12px',
              fontWeight: '500',
            }}>
              Sign in
            </Link>
            <Link to='/register' style={{
              fontSize: '14px',
              color: 'var(--bg-primary)',
              background: 'var(--accent)',
              padding: '7px 18px',
              borderRadius: '8px',
              fontWeight: '600',
              fontFamily: 'Space Grotesk, sans-serif',
            }}>
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar