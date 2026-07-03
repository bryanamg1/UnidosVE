import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded'
import { IconButton, Tooltip } from '@mui/material'
import L from 'leaflet'
import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import { DONOR_MAP_CONTENT, MAP_DEFAULTS } from '../../../constants'
import styles from '../styles/DonorMapPage.module.css'

function MapLocateControl({ onRequestLocation, userCoordinates }) {
  const map = useMap()
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    L.DomEvent.disableClickPropagation(containerRef.current)
    L.DomEvent.disableScrollPropagation(containerRef.current)
  }, [])

  async function handleClick() {
    if (userCoordinates) {
      map.flyTo([userCoordinates.lat, userCoordinates.lng], MAP_DEFAULTS.userLocationZoom, {
        duration: 0.85,
      })
      return
    }

    const nextCoordinates = await onRequestLocation()

    if (!nextCoordinates) {
      return
    }

    map.flyTo([nextCoordinates.lat, nextCoordinates.lng], MAP_DEFAULTS.userLocationZoom, {
      duration: 0.85,
    })
  }

  return (
    <div className={`leaflet-top leaflet-right ${styles.mapLocateControlShell}`} ref={containerRef}>
      <Tooltip placement="left" title={DONOR_MAP_CONTENT.mapControls.centerUserLabel}>
        <IconButton
          aria-label={DONOR_MAP_CONTENT.mapControls.centerUserAriaLabel}
          className={styles.mapLocateControlButton}
          color="primary"
          onClick={handleClick}
          size="small"
          type="button"
        >
          <GpsFixedRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default MapLocateControl
