import { useEffect, useState } from 'react'
import { centersService } from '../services/centersService'

export function useCenters() {
  const [centers, setCenters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCenters() {
      try {
        const response = await centersService.getPublicCenters()

        if (!isMounted) {
          return
        }

        setCenters(response)
      } catch {
        if (!isMounted) {
          return
        }

        setError('No fue posible cargar los centros mock en este momento.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCenters()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    centers,
    isLoading,
    error,
  }
}
