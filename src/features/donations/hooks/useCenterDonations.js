import { useEffect, useState } from 'react'
import { donationsService } from '../services/donationsService'

export function useCenterDonations(centerId) {
  const [donations, setDonations] = useState([])
  const [isLoading, setIsLoading] = useState(Boolean(centerId))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCenterDonations() {
      if (!centerId) {
        setDonations([])
        setIsLoading(false)
        return
      }

      try {
        const response = await donationsService.getCenterDonations(centerId)

        if (!isMounted) {
          return
        }

        setDonations(response)
      } catch {
        if (isMounted) {
          setError('CENTER_DONATIONS_LOAD_FAILED')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCenterDonations()

    return () => {
      isMounted = false
    }
  }, [centerId])

  async function updateDonationStatus(donationId, status, options) {
    setIsSubmitting(true)
    setError('')

    try {
      const updatedDonation = await donationsService.updateDonationStatus(
        donationId,
        status,
        options,
      )

      if (updatedDonation) {
        setDonations((currentDonations) =>
          currentDonations.map((donation) =>
            donation.id === donationId ? updatedDonation : donation,
          ),
        )
      }

      return updatedDonation
    } catch {
      setError('CENTER_DONATIONS_STATUS_FAILED')
      throw new Error('CENTER_DONATIONS_STATUS_FAILED')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    donations,
    isLoading,
    isSubmitting,
    error,
    updateDonationStatus,
  }
}
