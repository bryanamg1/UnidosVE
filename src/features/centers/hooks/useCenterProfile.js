import { useEffect, useState } from 'react'
import { centersService } from '../services/centersService'

export function useCenterProfile(user) {
  const [center, setCenter] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(user?.id))
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCenterProfile() {
      if (!user?.id) {
        setIsLoading(false)
        return
      }

      try {
        const response = await centersService.getCenterByOwner(user)

        if (!isMounted) {
          return
        }

        setCenter(response)
      } catch {
        if (isMounted) {
          setError('CENTER_PROFILE_LOAD_FAILED')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCenterProfile()

    return () => {
      isMounted = false
    }
  }, [user])

  async function saveCenterProfile(payload) {
    if (!user?.id) {
      return null
    }

    setIsSaving(true)
    setError('')

    try {
      const nextCenter = await centersService.saveCenterProfile(user, payload, center?.id ?? null)
      setCenter(nextCenter)
      return nextCenter
    } catch {
      setError('CENTER_PROFILE_SAVE_FAILED')
      throw new Error('CENTER_PROFILE_SAVE_FAILED')
    } finally {
      setIsSaving(false)
    }
  }

  return {
    center,
    isLoading,
    isSaving,
    error,
    saveCenterProfile,
  }
}
