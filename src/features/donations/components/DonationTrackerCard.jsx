import { Chip, Stack, Typography } from '@mui/material'
import {
  DONATION_STATUS_COLORS,
  DONATION_STATUS_LABELS,
  DONOR_FEED_CONTENT,
} from '../../../constants'
import styles from '../../map/styles/DonorMapPage.module.css'

function DonationTrackerCard({ donation }) {
  return (
    <article className={styles.trackingItem}>
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
