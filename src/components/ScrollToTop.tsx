import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Reset window scroll on route change without fighting in-page containers. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
