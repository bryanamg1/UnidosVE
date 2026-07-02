import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { MAP_DEFAULTS } from '../../../constants'

function MapViewportSync({ focusCoordinates }) {
  const map = useMap()

  useEffect(() => {
    if (!focusCoordinates) {
      return
    }

    map.flyTo([focusCoordinates.lat, focusCoordinates.lng], MAP_DEFAULTS.focusZoom, {
      duration: 0.85,
    })
  }, [focusCoordinates, map])

  return null
}

export default MapViewportSync
