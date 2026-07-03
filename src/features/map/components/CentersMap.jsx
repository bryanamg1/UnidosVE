import L from 'leaflet'
import { Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { CircleMarker, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import {
  APP_ROUTES,
  DONOR_MAP_CONTENT,
  MAP_DEFAULTS,
  MAP_INTERACTION,
  MAP_TILE_CONFIG,
} from '../../../constants'
import MapLocateControl from './MapLocateControl'
import MapViewportSync from './MapViewportSync'
import styles from '../styles/DonorMapPage.module.css'

const centerMarkerIcon = L.divIcon({
  className: styles.centerMarkerShell,
  html: `<span class="${styles.centerMarkerIcon}"><span class="${styles.centerMarkerCore}"></span></span>`,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -30],
})

function CentersMap({ activeCenter, centers, onRequestLocation, userCoordinates }) {
  const initialFocus = activeCenter?.coordinates ?? userCoordinates ?? MAP_DEFAULTS.center

  return (
    <MapContainer
      center={[initialFocus.lat, initialFocus.lng]}
      className={styles.mapCanvas}
      scrollWheelZoom
      zoom={MAP_DEFAULTS.zoom}
    >
      <TileLayer attribution={MAP_TILE_CONFIG.attribution} url={MAP_TILE_CONFIG.url} />

      <MapViewportSync focusCoordinates={initialFocus} />
      <MapLocateControl
        onRequestLocation={onRequestLocation}
        userCoordinates={userCoordinates}
      />

      {centers.map((center) => (
        <Marker
          icon={centerMarkerIcon}
          key={center.id}
          position={[center.coordinates.lat, center.coordinates.lng]}
        >
          <Popup>
            <div className={styles.popupContent}>
              <Typography variant="subtitle1">{center.name}</Typography>
              <Typography color="text.secondary" variant="body2">
                {center.address}
              </Typography>
              <Typography variant="body2">
                {DONOR_MAP_CONTENT.popup.activeNeedsLabel}: {center.activeNeedsCount}
              </Typography>
              <Typography variant="body2">
                {DONOR_MAP_CONTENT.popup.scheduleLabel}: {center.schedule}
              </Typography>
              <Typography variant="body2">
                {DONOR_MAP_CONTENT.popup.routeHintLabel}: {center.city}
              </Typography>
              <Button
                component={RouterLink}
                size="small"
                to={APP_ROUTES.CENTERS}
                variant="contained"
                color="primary"
                sx={{ mt: 1, borderRadius: 2 }}
              >
                {DONOR_MAP_CONTENT.popup.detailActionLabel}
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}

      {userCoordinates ? (
        <CircleMarker
          center={[userCoordinates.lat, userCoordinates.lng]}
          pathOptions={{ color: '#29b36a', fillColor: '#29b36a', fillOpacity: 0.35 }}
          radius={MAP_INTERACTION.userMarkerRadius}
        >
          <Popup>
            <div className={styles.popupContent}>
              <Typography variant="subtitle1">
                {DONOR_MAP_CONTENT.userMarker.title}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {DONOR_MAP_CONTENT.userMarker.description}
              </Typography>
            </div>
          </Popup>
        </CircleMarker>
      ) : null}
    </MapContainer>
  )
}

export default CentersMap
