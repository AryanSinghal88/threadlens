import { useState, useEffect } from 'react'

const words = ['actually', 'really', 'honestly', 'truly']

const CyclingWord = () => {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % words.length)
        setVisible(true)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span style={{
      color: 'var(--accent)',
      display: 'inline-block',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      textAlign: 'center',
    }}>
      {words[index]}
    </span>
  )
}

export default CyclingWord