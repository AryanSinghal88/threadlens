import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'
import { useAuth } from '../hooks/useAuth'

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  fontSize: '14px',
  fontFamily: 'JetBrains Mono, monospace',
  outline: 'none',
  transition: 'border-color 0.2s',
  display: 'block',
}

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await loginUser(formData)
      login(res.data)
      navigate('/')
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '26px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '8px',
            letterSpacing: '-0.5px',
          }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Sign in to ThreadLens
          </p>
        </div>

        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '28px',
        }}>
          {error && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(224, 85, 85, 0.08)',
              border: '1px solid rgba(224, 85, 85, 0.2)',
              color: 'var(--danger)',
              fontSize: '13px',
              marginBottom: '20px',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--text-dim)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: '8px',
              }}>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='you@example.com'
                style={{
                  ...inputStyle,
                  borderColor: focused === 'email' ? 'var(--accent)' : 'var(--border)',
                }}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: '600',
                color: 'var(--text-dim)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: '8px',
              }}>
                Password
              </label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                placeholder='••••••••'
                style={{
                  ...inputStyle,
                  borderColor: focused === 'password' ? 'var(--accent)' : 'var(--border)',
                }}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused('')}
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '10px',
                background: loading ? 'var(--accent-dim)' : 'var(--accent)',
                color: '#000',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'Space Grotesk, sans-serif',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s',
                letterSpacing: '-0.2px',
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{
          textAlign: 'center',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          marginTop: '24px',
        }}>
          No account?{' '}
          <Link to='/register' style={{ color: 'var(--accent)', fontWeight: '500' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login