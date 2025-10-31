import { useState, useEffect } from 'react'
import { getInitialTheme, type Theme } from './utils/theme'

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const systemTheme: Theme = e.matches ? 'dark' : 'light'
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(systemTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Design System Foundation</h1>
      <p>Theme: {theme}</p>
      <p>This is the foundation setup for the design system.</p>
      <p>Components will be added to the <code>src/design-system/</code> directory.</p>

    </div>
  )
}

export default App

