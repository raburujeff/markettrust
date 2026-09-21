import { useEffect, useState } from 'react'

/** Makes the low-bandwidth / offline design constraint visible in the PoC. */
export function ConnectionBanner() {
  const [online, setOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  )

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  if (online) return null

  return (
    <div className="connection-banner" role="status">
      You’re offline — Ask still works from the in-bundle corpus. Tips stay on this device.
    </div>
  )
}
