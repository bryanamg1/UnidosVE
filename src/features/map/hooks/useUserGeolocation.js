import { useState } from 'react'
import { DONOR_MAP_CONTENT, GEOLOCATION_STATUS } from '../../../constants'

export function useUserGeolocation() {
  const [status, setStatus] = useState(GEOLOCATION_STATUS.IDLE)
  const [coordinates, setCoordinates] = useState(null)
  const [message, setMessage] = useState(DONOR_MAP_CONTENT.geolocation.idleMessage)

  function requestLocation() {
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
    isUnavailable: status === GEOLOCATION_STATUS.UNAVAILABLE,
  }
}
