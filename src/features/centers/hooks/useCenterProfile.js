import { useEffect, useState } from 'react'
import { centersService } from '../services/centersService'

export function useCenterProfile(ownerUserId) {
  const [center, setCenter] = useState(null)
  const [isLoading, setIsLoading] = useState(Boolean(ownerUserId))
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCenterProfile() {
      if (!ownerUserId) {
        setIsLoading(false)
        return
      }

      try {
        const response = await centersService.getCenterByOwner(ownerUserId)

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
  }, [ownerUserId])

  async function saveCenterProfile(payload) {
    if (!ownerUserId) {
      return null
    }

    setIsSaving(true)
    setError('')

    try {
      const nextCenter = await centersService.saveCenterProfile(ownerUserId, payload)
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
