import { useEffect, useRef, useState } from 'react'
import {
  DONOR_MAP_CONTENT,
  GEOLOCATION_STATUS,
  MAP_NOTIFICATION_TIMEOUT_MS,
} from '../../../constants'

export function useUserGeolocation() {
  const [status, setStatus] = useState(GEOLOCATION_STATUS.IDLE)
  const [coordinates, setCoordinates] = useState(null)
  const [message, setMessage] = useState(DONOR_MAP_CONTENT.geolocation.idleMessage)
  const timeoutRef = useRef(null)

  function clearDismissTimeout() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      clearDismissTimeout()
    }
  }, [])

  function requestLocation() {
    clearDismissTimeout()

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setStatus(GEOLOCATION_STATUS.UNAVAILABLE)
      setMessage(DONOR_MAP_CONTENT.geolocation.unavailableMessage)
      return
    }

    setStatus(GEOLOCATION_STATUS.LOADING)
    setMessage(DONOR_MAP_CONTENT.geolocation.loadingMessage)

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates({
          lat: coords.latitude,
          lng: coords.longitude,
        })
        setStatus(GEOLOCATION_STATUS.SUCCESS)
        setMessage(DONOR_MAP_CONTENT.geolocation.activeLabel)
        timeoutRef.current = window.setTimeout(() => {
          setStatus(GEOLOCATION_STATUS.IDLE)
          setMessage(DONOR_MAP_CONTENT.geolocation.idleMessage)
          timeoutRef.current = null
        }, MAP_NOTIFICATION_TIMEOUT_MS)
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setStatus(GEOLOCATION_STATUS.DENIED)
          setMessage(DONOR_MAP_CONTENT.geolocation.deniedMessage)
          return
        }

        setStatus(GEOLOCATION_STATUS.ERROR)
        setMessage(DONOR_MAP_CONTENT.geolocation.errorMessage)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    )
  }

  return {
    coordinates,
    message,
    requestLocation,
    status,
    isReady: status !== GEOLOCATION_STATUS.LOADING,
    hasActiveMessage: status !== GEOLOCATION_STATUS.IDLE,
    isUnavailable: status === GEOLOCATION_STATUS.UNAVAILABLE,
  }
}
