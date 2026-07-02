import { useEffect, useState } from 'react'
import { donationsService } from '../services/donationsService'

export function useDonations() {
  const [donations, setDonations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadDonations() {
      try {
        const response = await donationsService.getDonations()

        if (!isMounted) {
          return
        }

        setDonations(response)
      } catch {
        if (isMounted) {
          setError('NO_DONATIONS_AVAILABLE')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDonations()

    return () => {
      isMounted = false
    }
  }, [])

  async function createDonation(payload) {
    setIsSubmitting(true)
    setError('')

    try {
      const nextDonation = await donationsService.createDonation(payload)
      setDonations((currentDonations) => [nextDonation, ...currentDonations])
      return nextDonation
    } catch {
      setError('DONATION_CREATE_FAILED')
      throw new Error('DONATION_CREATE_FAILED')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    donations,
    isLoading,
    isSubmitting,
    error,
    createDonation,
  }
}
