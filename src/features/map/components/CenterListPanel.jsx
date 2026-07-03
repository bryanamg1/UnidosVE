import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import { Button, Chip, Stack, Typography } from '@mui/material'
import {
  CENTER_TYPE_LABELS,
  DONOR_MAP_CONTENT,
  MAP_DEFAULTS,
} from '../../../constants'
import { formatDistance } from '../utils/mapDistance'
import styles from '../styles/DonorMapPage.module.css'

function getCenterAccentClass(isActive, isNearby) {
  if (isActive) {
    return styles.surfaceAccentInfo
  }

  if (isNearby) {
    return styles.surfaceAccentSuccess
  }

  return styles.surfaceAccentMuted
}

function CenterListPanel({ activeCenterId, centers, onSelectCenter }) {
  return (
    <section className={styles.sideCard}>
      <div className={styles.sideCardHeader}>
        <Typography variant="h5">{DONOR_MAP_CONTENT.centerList.title}</Typography>
        <Typography color="text.secondary" variant="body2">
          {DONOR_MAP_CONTENT.centerList.subtitle}
        </Typography>
      </div>

      <div className={`${styles.centerList} ${styles.scrollPanel} ${styles.centersListPanel}`}>
        {centers.map((center) => {
          const isActive = center.id === activeCenterId
          const distanceText =
            typeof center.distanceKm === 'number'
              ? formatDistance(center.distanceKm)
              : DONOR_MAP_CONTENT.centerList.noDistanceLabel
          const isNearby =
            typeof center.distanceKm === 'number' &&
            center.distanceKm <= MAP_DEFAULTS.nearbyRadiusKm

          return (
            <article
              key={center.id}
              className={`${styles.centerListItem} ${styles.surfaceAccent} ${getCenterAccentClass(isActive, isNearby)} ${isActive ? styles.centerListItemActive : ''}`}
            >
              <Stack direction="row" justifyContent="space-between" spacing={1.5}>
                <Typography variant="h6">{center.name}</Typography>
                <PlaceRoundedIcon color={isActive ? 'primary' : 'inherit'} fontSize="small" />
              </Stack>

              <Typography color="text.secondary" variant="body2">
                {center.address}
              </Typography>

              <div className={styles.centerMetaRow}>
                <Chip
                  label={CENTER_TYPE_LABELS[center.type] ?? center.type}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  color={isNearby ? 'success' : 'default'}
                  label={distanceText}
                  size="small"
                />
              </div>

              <Typography color="text.secondary" variant="body2">
                {center.activeNeedsCount} {DONOR_MAP_CONTENT.centerList.activeNeedsSuffix}
              </Typography>

              <Button onClick={() => onSelectCenter(center.id)} variant="text">
                {DONOR_MAP_CONTENT.centerList.selectActionLabel}
              </Button>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default CenterListPanel
