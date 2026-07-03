import { Chip, Stack, Typography } from '@mui/material'
import {
  DONATION_STATUSES,
  DONATION_STATUS_COLORS,
  DONATION_STATUS_LABELS,
  DONOR_FEED_CONTENT,
} from '../../../constants'
import styles from '../../map/styles/DonorMapPage.module.css'

function getDonationAccentClass(status) {
  if (
    status === DONATION_STATUSES.PREPARING ||
    status === DONATION_STATUSES.IN_TRANSIT
  ) {
    return styles.surfaceAccentWarning
  }

  if (
    status === DONATION_STATUSES.RECEIVED ||
    status === DONATION_STATUSES.COMPLETED
  ) {
    return styles.surfaceAccentSuccess
  }

  if (status === DONATION_STATUSES.CANCELED) {
    return styles.surfaceAccentMuted
  }

  return styles.surfaceAccentInfo
}

const STATUS_STEPS = [
  DONATION_STATUSES.COMMITTED,
  DONATION_STATUSES.PREPARING,
  DONATION_STATUSES.IN_TRANSIT,
  DONATION_STATUSES.RECEIVED,
  DONATION_STATUSES.COMPLETED,
]

const STEP_SHORT_LABELS = {
  [DONATION_STATUSES.COMMITTED]: 'Comprometida',
  [DONATION_STATUSES.PREPARING]: 'Preparando',
  [DONATION_STATUSES.IN_TRANSIT]: 'En camino',
  [DONATION_STATUSES.RECEIVED]: 'Recibida',
  [DONATION_STATUSES.COMPLETED]: 'Completada',
}

function DonationTrackerCard({ donation }) {
  const currentStepIndex = STATUS_STEPS.indexOf(donation.status)
  const isCanceled = donation.status === DONATION_STATUSES.CANCELED

  return (
    <article
      className={`${styles.trackingItem} ${styles.surfaceAccent} ${getDonationAccentClass(donation.status)}`}
    >
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {donation.needTitle}
        </Typography>
        <Chip
          color={DONATION_STATUS_COLORS[donation.status] ?? 'default'}
          label={DONATION_STATUS_LABELS[donation.status] ?? donation.status}
          size="small"
        />
      </Stack>

      <Typography color="text.secondary" variant="body2" sx={{ mt: -0.5 }}>
        {donation.centerName}
      </Typography>

      <Typography variant="body2">
        <strong>{DONOR_FEED_CONTENT.donorTracking.amountLabel}:</strong> {donation.amount} {donation.unit}
      </Typography>

      {!isCanceled && currentStepIndex !== -1 && (
        <div className={styles.stepperContainer}>
          <div className={styles.stepperProgressLine}>
            <div
              className={styles.stepperActiveProgress}
              style={{
                width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>
          <div className={styles.stepperDotsRow}>
            {STATUS_STEPS.map((step, index) => {
              const isActive = index <= currentStepIndex
              const isCurrent = index === currentStepIndex
              return (
                <div
                  key={step}
                  className={`${styles.stepperDot} ${isActive ? styles.stepperDotActive : ''} ${
                    isCurrent ? styles.stepperDotCurrent : ''
                  }`}
                  title={DONATION_STATUS_LABELS[step]}
                />
              )
            })}
          </div>
          <div className={styles.stepperLabelsRow}>
            {STATUS_STEPS.map((step, index) => {
              const isCurrent = index === currentStepIndex
              return (
                <Typography
                  key={step}
                  variant="caption"
                  className={`${styles.stepperLabel} ${isCurrent ? styles.stepperLabelCurrent : ''}`}
                >
                  {STEP_SHORT_LABELS[step]}
                </Typography>
              )
            })}
          </div>
        </div>
      )}
    </article>
  )
}

export default DonationTrackerCard
