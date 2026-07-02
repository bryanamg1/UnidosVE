import { useEffect, useState } from 'react'
import { needsService } from '../services/needsService'

export function useCenterNeeds(centerId) {
  const [needs, setNeeds] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(centerId))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCenterNeeds() {
      if (!centerId) {
        setNeeds([])
        setIsLoading(false)
        return
      }

      try {
        const response = await needsService.getCenterNeeds(centerId)

        if (!isMounted) {
          return
        }

        setNeeds(response)
      } catch {
        if (isMounted) {
          setError('CENTER_NEEDS_LOAD_FAILED')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCenterNeeds()

    return () => {
      isMounted = false
    }
  }, [centerId])

  async function createNeed(payload) {
    setIsSubmitting(true)
    setError('')

    try {
      const nextNeed = await needsService.createNeed(payload)
      setNeeds((currentNeeds) => [nextNeed, ...currentNeeds])
      return nextNeed
    } catch {
      setError('CENTER_NEEDS_CREATE_FAILED')
      throw new Error('CENTER_NEEDS_CREATE_FAILED')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function updateNeedStatus(needId, status) {
    setIsSubmitting(true)
    setError('')

    try {
      const updatedNeed = await needsService.updateNeedStatus(needId, status)

      if (updatedNeed) {
        setNeeds((currentNeeds) =>
          currentNeeds.map((need) => (need.id === needId ? updatedNeed : need)),
        )
      }

      return updatedNeed
    } catch {
      setError('CENTER_NEEDS_STATUS_FAILED')
      throw new Error('CENTER_NEEDS_STATUS_FAILED')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    needs,
    isLoading,
    isSubmitting,
    error,
    createNeed,
    updateNeedStatus,
  }
}
