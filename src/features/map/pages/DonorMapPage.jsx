import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  APP_ROUTES,
  DONATION_COMMITTED_STATUSES,
  DONATION_RECEIVED_STATUSES,
  DONATION_STATUSES,
  DONOR_FEED_CONTENT,
  DONOR_MAP_CONTENT,
  GEOLOCATION_STATUS,
  NEED_CATEGORIES,
  NEED_FILTER_VALUES,
  NEED_STATUSES,
  NEED_STATUS_LABELS,
  NEED_URGENCY_LEVELS,
} from '../../../constants'
import { useAuth } from '../../auth/hooks/useAuth'
import { useCenters } from '../../centers/hooks/useCenters'
import DonationDialog from '../../donations/components/DonationDialog'
import DonationTrackerCard from '../../donations/components/DonationTrackerCard'
import { useDonations } from '../../donations/hooks/useDonations'
import NeedCard from '../../needs/components/NeedCard'
import NeedFiltersPanel from '../../needs/components/NeedFiltersPanel'
import { useNeeds } from '../../needs/hooks/useNeeds'
import CenterListPanel from '../components/CenterListPanel'
import CentersMap from '../components/CentersMap'
import { useUserGeolocation } from '../hooks/useUserGeolocation'
import styles from '../styles/DonorMapPage.module.css'
import { calculateDistanceKm, sortByDistance } from '../utils/mapDistance'

const INITIAL_FILTERS = {
  status: NEED_FILTER_VALUES.ALL,
  city: NEED_FILTER_VALUES.ALL,
  category: NEED_FILTER_VALUES.ALL,
  urgency: NEED_FILTER_VALUES.ALL,
  proximity: NEED_FILTER_VALUES.ALL,
}

function getDisplayStatus(need) {
  if (need.progress.received >= need.progress.required) {
    return NEED_STATUSES.COVERED
  }

  if (need.progress.received > 0) {
    return NEED_STATUSES.PARTIALLY_COVERED
  }

  if (need.progress.committed > 0) {
    return NEED_STATUSES.IN_TRANSIT
  }

  if (need.status === NEED_STATUSES.CRITICAL || need.urgency === 'critica') {
    return NEED_STATUSES.CRITICAL
  }

  return need.status
}

function DonorMapPage() {
  const { user, logout } = useAuth()
  const { centers, error: centersError, isLoading: isCentersLoading } = useCenters()
  const { needs, error: needsError, isLoading: isNeedsLoading } = useNeeds()
  const {
    donations,
    error: donationsError,
    isLoading: isDonationsLoading,
    isSubmitting,
    createDonation,
  } = useDonations()
  const {
    coordinates,
    hasActiveMessage,
    isReady,
    message,
    requestLocation,
    status: geolocationStatus,
  } = useUserGeolocation()
  const [activeCenterId, setActiveCenterId] = useState(null)
  const [filterValues, setFilterValues] = useState(INITIAL_FILTERS)
  const [selectedNeed, setSelectedNeed] = useState(null)
  const [donationAmount, setDonationAmount] = useState('')
  const [donationNote, setDonationNote] = useState('')
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const centersWithDistance = useMemo(() => {
    const enrichedCenters = centers.map((center) => ({
      ...center,
      distanceKm: coordinates
        ? calculateDistanceKm(coordinates, center.coordinates)
        : null,
    }))

    return sortByDistance(enrichedCenters, (center) => center.distanceKm)
  }, [centers, coordinates])

  const activeCenter =
    centersWithDistance.find((center) => center.id === activeCenterId) ??
    centersWithDistance[0] ??
    null

  const donationsByNeed = useMemo(() => {
    return donations.reduce((accumulator, donation) => {
      const current = accumulator[donation.needId] ?? { committed: 0, received: 0 }

      if (DONATION_COMMITTED_STATUSES.includes(donation.status)) {
        current.committed += donation.amount
      }

      if (DONATION_RECEIVED_STATUSES.includes(donation.status)) {
        current.received += donation.amount
      }

      accumulator[donation.needId] = current
      return accumulator
    }, {})
  }, [donations])

  const enrichedNeeds = useMemo(() => {
    return needs
      .map((need) => {
        const center = centersWithDistance.find((item) => item.id === need.centerId)

        if (!center) {
          return null
        }

        const donationTotals = donationsByNeed[need.id] ?? { committed: 0, received: 0 }
        const progress = {
          required: need.baseProgress.required,
          committed: need.baseProgress.committed + donationTotals.committed,
          received: need.baseProgress.received + donationTotals.received,
          remaining: Math.max(
            need.baseProgress.required -
              need.baseProgress.committed -
              donationTotals.committed -
              need.baseProgress.received -
              donationTotals.received,
            0,
          ),
        }

        const normalizedNeed = {
          ...need,
          centerName: center.name,
          centerType: center.type,
          city: center.city,
          categoryLabel: need.category,
          urgencyLabel: need.urgency,
          distanceKm: center.distanceKm,
          progress,
          updatedLabel: new Date(need.updatedAt).toLocaleDateString('es-VE'),
        }

        return {
          ...normalizedNeed,
          displayStatus: getDisplayStatus(normalizedNeed),
        }
      })
      .filter(Boolean)
  }, [needs, centersWithDistance, donationsByNeed])

  const filteredNeeds = useMemo(() => {
    const nextNeeds = enrichedNeeds.filter((need) => {
      if (
        filterValues.status !== NEED_FILTER_VALUES.ALL &&
        need.displayStatus !== filterValues.status
      ) {
        return false
      }

      if (filterValues.city !== NEED_FILTER_VALUES.ALL && need.city !== filterValues.city) {
        return false
      }

      if (
        filterValues.category !== NEED_FILTER_VALUES.ALL &&
        need.category !== filterValues.category
      ) {
        return false
      }

      if (
        filterValues.urgency !== NEED_FILTER_VALUES.ALL &&
        need.urgency !== filterValues.urgency
      ) {
        return false
      }

      if (filterValues.proximity === NEED_FILTER_VALUES.NEARBY) {
        return true
      }

      return true
    })

    if (filterValues.proximity === NEED_FILTER_VALUES.NEARBY && coordinates) {
      return sortByDistance(nextNeeds, (need) => need.distanceKm)
    }

    return nextNeeds
  }, [coordinates, enrichedNeeds, filterValues])

  const donorDonations = useMemo(() => {
    return donations
      .filter((donation) => donation.donorId === user?.id)
      .map((donation) => {
        const need = enrichedNeeds.find((item) => item.id === donation.needId)

        return {
          ...donation,
          needTitle: need?.title ?? donation.needId,
          centerName: need?.centerName ?? donation.centerId,
        }
      })
  }, [donations, enrichedNeeds, user?.id])

  const cityOptions = useMemo(() => {
    return [...new Set(enrichedNeeds.map((need) => need.city))].sort()
  }, [enrichedNeeds])

  const statusOptions = useMemo(() => {
    return [
      { value: NEED_FILTER_VALUES.ALL, label: DONOR_FEED_CONTENT.filters.allOptionLabel },
      ...Object.values(NEED_STATUSES).map((status) => ({
        value: status,
        label: NEED_STATUS_LABELS[status] ?? status,
      })),
    ]
  }, [])

  const categoryOptions = useMemo(() => {
    return [
      { value: NEED_FILTER_VALUES.ALL, label: DONOR_FEED_CONTENT.filters.allOptionLabel },
      ...NEED_CATEGORIES.map((category) => ({
        value: category,
        label: category,
      })),
    ]
  }, [])

  const urgencyOptions = useMemo(() => {
    return [
      { value: NEED_FILTER_VALUES.ALL, label: DONOR_FEED_CONTENT.filters.allOptionLabel },
      ...NEED_URGENCY_LEVELS.map((urgency) => ({
        value: urgency,
        label: urgency,
      })),
    ]
  }, [])

  const proximityOptions = useMemo(() => {
    return [
      { value: NEED_FILTER_VALUES.ALL, label: DONOR_FEED_CONTENT.filters.allOptionLabel },
      { value: NEED_FILTER_VALUES.NEARBY, label: DONOR_FEED_CONTENT.filters.nearbyOptionLabel },
    ]
  }, [])

  const summaryCards = useMemo(() => {
    const activeNeedsCount = enrichedNeeds.filter(
      (need) =>
        need.displayStatus !== NEED_STATUSES.COVERED &&
        need.displayStatus !== NEED_STATUSES.CANCELED,
    ).length
    const coveredNeedsCount = enrichedNeeds.filter(
      (need) => need.displayStatus === NEED_STATUSES.COVERED,
    ).length
    const inTransitDonationsCount = donations.filter(
      (donation) =>
        donation.status === DONATION_STATUSES.PREPARING ||
        donation.status === DONATION_STATUSES.IN_TRANSIT,
    ).length
    const valuesById = {
      activeCenters: centers.length,
      activeNeeds: activeNeedsCount,
      inTransitDonations: inTransitDonationsCount,
      coveredNeeds: coveredNeedsCount,
    }

    return DONOR_MAP_CONTENT.header.summaryCards.map((summaryCard) => ({
      ...summaryCard,
      value: valuesById[summaryCard.id] ?? 0,
    }))
  }, [centers.length, donations, enrichedNeeds])

  const geolocationAlertSeverity =
    geolocationStatus === GEOLOCATION_STATUS.SUCCESS
      ? 'success'
      : geolocationStatus === GEOLOCATION_STATUS.LOADING
        ? 'info'
        : geolocationStatus === GEOLOCATION_STATUS.DENIED ||
            geolocationStatus === GEOLOCATION_STATUS.ERROR ||
            geolocationStatus === GEOLOCATION_STATUS.UNAVAILABLE
          ? 'warning'
          : 'info'

  function handleFilterChange(event) {
    const { name, value } = event.target

    setFilterValues((current) => ({
      ...current,
      [name]: value,
    }))

    if (
      name === 'proximity' &&
      value === NEED_FILTER_VALUES.NEARBY &&
      !coordinates &&
      geolocationStatus !== GEOLOCATION_STATUS.LOADING
    ) {
      requestLocation()
    }
  }

  function handleResetFilters() {
    setFilterValues(INITIAL_FILTERS)
  }

  function handleOpenDonationDialog(need) {
    setSelectedNeed(need)
    setDonationAmount('')
    setDonationNote('')
    setFeedback({ type: '', message: '' })
  }

  function handleCloseDonationDialog() {
    setSelectedNeed(null)
    setDonationAmount('')
    setDonationNote('')
  }

  async function handleCreateDonation() {
    if (!selectedNeed || !user) {
      return
    }

    try {
      await createDonation({
        needId: selectedNeed.id,
        centerId: selectedNeed.centerId,
        donorId: user.id,
        donorName: `${user.firstName} ${user.lastName}`,
        amount: donationAmount,
        unit: selectedNeed.unit,
        note: donationNote,
      })

      handleCloseDonationDialog()
      setFeedback({
        type: 'success',
        message: DONOR_FEED_CONTENT.alerts.donationSuccess,
      })
    } catch {
      setFeedback({
        type: 'error',
        message: DONOR_FEED_CONTENT.alerts.donationError,
      })
    }
  }

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
            {summaryCards.map((summaryCard) => (
              <article key={summaryCard.label} className={styles.summaryCard}>
                <Typography variant="h5">{summaryCard.value}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {summaryCard.label}
                </Typography>
              </article>
            ))}
          </div>
        </div>

        {feedback.message ? <Alert severity={feedback.type}>{feedback.message}</Alert> : null}

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

              {hasActiveMessage ? <Alert severity={geolocationAlertSeverity}>{message}</Alert> : null}

              {centersError ? <Alert severity="error">{centersError}</Alert> : null}

              {isCentersLoading ? (
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
          </div>
        </div>

        <section className={styles.feedSection}>
          <div className={styles.feedHeader}>
            <Chip color="primary" label={DONOR_FEED_CONTENT.section.badge} size="small" />
            <Typography variant="h3">{DONOR_FEED_CONTENT.section.title}</Typography>
            <Typography color="text.secondary" variant="body1">
              {DONOR_FEED_CONTENT.section.description}
            </Typography>
          </div>

          <div className={styles.feedGrid}>
            <div className={styles.feedSidebar}>
              <NeedFiltersPanel
                categoryOptions={categoryOptions}
                cities={cityOptions}
                filterValues={filterValues}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
                proximityOptions={proximityOptions}
                statusOptions={statusOptions}
                urgencyOptions={urgencyOptions}
              />

              <Card className={`${styles.feedSideCard} ${styles.donationsPanel}`}>
                <CardContent className={styles.feedSideCardContent}>
                  <div className={styles.sideCardHeader}>
                    <Typography variant="h5">{DONOR_FEED_CONTENT.donorTracking.title}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {DONOR_FEED_CONTENT.donorTracking.subtitle}
                    </Typography>
                  </div>

                  {isDonationsLoading ? (
                    <div className={styles.inlineLoadingState}>
                      <CircularProgress size={22} />
                    </div>
                  ) : donorDonations.length ? (
                    <div className={`${styles.trackingList} ${styles.scrollPanel}`}>
                      {donorDonations.map((donation) => (
                        <DonationTrackerCard donation={donation} key={donation.id} />
                      ))}
                    </div>
                  ) : (
                    <Alert severity="info">{DONOR_FEED_CONTENT.donorTracking.emptyLabel}</Alert>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className={styles.feedListCard}>
              <CardContent className={styles.feedListCardContent}>
                <div className={styles.feedListHeader}>
                  <div>
                    <Typography variant="h4">{DONOR_FEED_CONTENT.needsList.title}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {DONOR_FEED_CONTENT.needsList.subtitle}
                    </Typography>
                  </div>
                  <Chip
                    label={`${filteredNeeds.length} ${DONOR_FEED_CONTENT.needsList.resultsLabelSuffix}`}
                    size="small"
                    variant="outlined"
                  />
                </div>

                <Divider />

                {needsError || donationsError ? (
                  <Alert severity="error">{DONOR_FEED_CONTENT.alerts.needsError}</Alert>
                ) : null}

                {isNeedsLoading ? (
                  <div className={styles.inlineLoadingState}>
                    <CircularProgress size={24} />
                  </div>
                ) : filteredNeeds.length ? (
                  <div className={styles.needsList}>
                    {filteredNeeds.map((need) => (
                      <NeedCard key={need.id} need={need} onDonate={handleOpenDonationDialog} />
                    ))}
                  </div>
                ) : (
                  <Alert severity="info">
                    <strong>{DONOR_FEED_CONTENT.needsList.emptyTitle}</strong>{' '}
                    {DONOR_FEED_CONTENT.needsList.emptyDescription}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </section>

      <DonationDialog
        amount={donationAmount}
        isOpen={Boolean(selectedNeed)}
        isSubmitting={isSubmitting}
        need={selectedNeed}
        note={donationNote}
        onAmountChange={(event) => setDonationAmount(event.target.value)}
        onClose={handleCloseDonationDialog}
        onNoteChange={(event) => setDonationNote(event.target.value)}
        onSubmit={handleCreateDonation}
      />
    </main>
  )
}

export default DonorMapPage
