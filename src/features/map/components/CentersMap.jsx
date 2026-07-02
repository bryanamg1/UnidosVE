import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
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
import MapViewportSync from './MapViewportSync'
import styles from '../styles/DonorMapPage.module.css'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function CentersMap({ activeCenter, centers, userCoordinates }) {
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

      {centers.map((center) => (
        <Marker
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
                variant="outlined"
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
