import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { APP_ROUTES, DONOR_MAP_CONTENT, GEOLOCATION_STATUS } from '../../../constants'
import { useAuth } from '../../auth/hooks/useAuth'
import { useCenters } from '../../centers/hooks/useCenters'
import CenterListPanel from '../components/CenterListPanel'
import CentersMap from '../components/CentersMap'
import { useUserGeolocation } from '../hooks/useUserGeolocation'
import styles from '../styles/DonorMapPage.module.css'
import { getDistanceKm } from '../utils/mapDistance'

function DonorMapPage() {
  const { user, logout } = useAuth()
  const { centers, error, isLoading } = useCenters()
  const {
    coordinates,
    isReady,
    message,
    requestLocation,
    status: geolocationStatus,
  } = useUserGeolocation()
  const [activeCenterId, setActiveCenterId] = useState(null)

  const centersWithDistance = useMemo(() => {
    const enrichedCenters = centers.map((center) => ({
      ...center,
      distanceKm: coordinates ? getDistanceKm(coordinates, center.coordinates) : null,
    }))

    return enrichedCenters.sort((left, right) => {
      if (left.distanceKm === null && right.distanceKm === null) {
        return 0
      }

      if (left.distanceKm === null) {
        return 1
      }

      if (right.distanceKm === null) {
        return -1
      }

      return left.distanceKm - right.distanceKm
    })
  }, [centers, coordinates])

  const activeCenter =
    centersWithDistance.find((center) => center.id === activeCenterId) ??
    centersWithDistance[0] ??
    null

  return (
    <main className={styles.page}>
      <section className={styles.layout}>
        <div className={styles.headerCard}>
          <div className={styles.headerCopy}>
            <Chip color="primary" label={DONOR_MAP_CONTENT.header.badge} size="small" />
            <Typography className={styles.headerTitle} variant="h2">
              {DONOR_MAP_CONTENT.header.title}
            </Typography>
            <Typography color="text.secondary" variant="body1">
              {DONOR_MAP_CONTENT.header.description}
            </Typography>
          </div>

          <div className={styles.headerActions}>
            <Chip
              label={`${user?.firstName ?? ''} ${user?.lastName ?? ''} - ${user?.role ?? ''}`}
              size="small"
              variant="outlined"
            />

            <Stack direction="row" spacing={1.25}>
              <Button
                component={RouterLink}
                startIcon={<ExploreRoundedIcon />}
                to={APP_ROUTES.HOME}
                variant="outlined"
              >
                {DONOR_MAP_CONTENT.header.backHomeLabel}
              </Button>
              <Button
                component={RouterLink}
                onClick={logout}
                startIcon={<LogoutRoundedIcon />}
                to={APP_ROUTES.HOME}
                variant="contained"
              >
                {DONOR_MAP_CONTENT.header.logoutLabel}
              </Button>
            </Stack>
          </div>

          <div className={styles.summaryGrid}>
            {DONOR_MAP_CONTENT.header.summaryCards.map((summaryCard) => (
              <article key={summaryCard.label} className={styles.summaryCard}>
                <Typography variant="h5">{summaryCard.value}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {summaryCard.label}
                </Typography>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.mapSection}>
          <Card className={styles.mapCard}>
            <CardContent className={styles.mapCardContent}>
              <div className={styles.mapCardHeader}>
                <div>
                  <Chip color="primary" label={DONOR_MAP_CONTENT.mapCard.badge} size="small" />
                  <Typography className={styles.mapTitle} variant="h4">
                    {DONOR_MAP_CONTENT.mapCard.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {DONOR_MAP_CONTENT.mapCard.description}
                  </Typography>
                </div>

                <Button disabled={!isReady} onClick={requestLocation} variant="contained">
                  {DONOR_MAP_CONTENT.geolocation.actionLabel}
                </Button>
              </div>

              <Alert
                severity={
                  geolocationStatus === GEOLOCATION_STATUS.SUCCESS
                    ? 'success'
                    : geolocationStatus === GEOLOCATION_STATUS.LOADING
                      ? 'info'
                      : geolocationStatus === GEOLOCATION_STATUS.DENIED ||
                          geolocationStatus === GEOLOCATION_STATUS.ERROR ||
                          geolocationStatus === GEOLOCATION_STATUS.UNAVAILABLE
                        ? 'warning'
                        : 'info'
                }
              >
                {message}
              </Alert>

              {error ? <Alert severity="error">{error}</Alert> : null}

              {isLoading ? (
                <div className={styles.mapLoadingState}>
                  <CircularProgress size={28} />
                  <Typography color="text.secondary" variant="body2">
                    {DONOR_MAP_CONTENT.header.loadingCentersLabel}
                  </Typography>
                </div>
              ) : (
                <CentersMap
                  activeCenter={activeCenter}
                  centers={centersWithDistance}
                  userCoordinates={coordinates}
                />
              )}
            </CardContent>
          </Card>

          <div className={styles.sideColumn}>
            <CenterListPanel
              activeCenterId={activeCenter?.id ?? ''}
              centers={centersWithDistance}
              onSelectCenter={setActiveCenterId}
            />

            <Card className={styles.phaseNoteCard}>
              <CardContent className={styles.phaseNoteContent}>
                <Chip label={DONOR_MAP_CONTENT.phaseNote.badge} size="small" variant="outlined" />
                <Typography variant="h6">{DONOR_MAP_CONTENT.phaseNote.title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {DONOR_MAP_CONTENT.phaseNote.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}

export default DonorMapPage
