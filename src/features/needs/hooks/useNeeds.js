import { useEffect, useState } from 'react'
import { needsService } from '../services/needsService'

export function useNeeds() {
  const [needs, setNeeds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadNeeds() {
      try {
        const response = await needsService.getPublishedNeeds()

        if (!isMounted) {
          return
        }

        setNeeds(response)
      } catch {
        if (isMounted) {
          setError('NO_NEEDS_AVAILABLE')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadNeeds()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    needs,
    isLoading,
    error,
  }
}
