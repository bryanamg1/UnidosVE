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

function DonationTrackerCard({ donation }) {
  return (
    <article
      className={`${styles.trackingItem} ${styles.surfaceAccent} ${getDonationAccentClass(donation.status)}`}
    >
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <Typography variant="subtitle2">{donation.needTitle}</Typography>
        <Chip
          color={DONATION_STATUS_COLORS[donation.status] ?? 'default'}
          label={DONATION_STATUS_LABELS[donation.status] ?? donation.status}
          size="small"
        />
      </Stack>

      <Typography color="text.secondary" variant="body2">
        {donation.centerName}
      </Typography>

      <Typography variant="body2">
        {DONOR_FEED_CONTENT.donorTracking.amountLabel}: {donation.amount} {donation.unit}
      </Typography>
    </article>
  )
}

export default DonationTrackerCard
