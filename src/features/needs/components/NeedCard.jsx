import {
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import {
  CENTER_TYPE_LABELS,
  DONOR_FEED_CONTENT,
  NEED_STATUSES,
  NEED_STATUS_COLORS,
  NEED_STATUS_LABELS,
} from '../../../constants'
import { formatDistance } from '../../map/utils/mapDistance'
import styles from '../../map/styles/DonorMapPage.module.css'

function getNeedAccentClass(need) {
  if (need.displayStatus === NEED_STATUSES.CRITICAL || need.urgency === 'critica') {
    return styles.surfaceAccentCritical
  }

  if (
    need.displayStatus === NEED_STATUSES.PARTIALLY_COVERED ||
    need.displayStatus === NEED_STATUSES.IN_TRANSIT
  ) {
    return styles.surfaceAccentWarning
  }

  if (need.displayStatus === NEED_STATUSES.COVERED) {
    return styles.surfaceAccentSuccess
  }

  return styles.surfaceAccentInfo
}

function getProgressGradient(need) {
  if (need.displayStatus === NEED_STATUSES.CRITICAL || need.urgency === 'critica') {
    return 'linear-gradient(90deg, #d64545 0%, #ff7878 100%)'
  }

  if (need.displayStatus === NEED_STATUSES.COVERED) {
    return 'linear-gradient(90deg, #29b36a 0%, #5ce69e 100%)'
  }

  if (
    need.displayStatus === NEED_STATUSES.PARTIALLY_COVERED ||
    need.displayStatus === NEED_STATUSES.IN_TRANSIT
  ) {
    return 'linear-gradient(90deg, #f0a43b 0%, #ffc575 100%)'
  }

  return 'linear-gradient(90deg, #1769ff 0%, #00d2ff 100%)'
}

function NeedCard({ need, onDonate }) {
  const coverageRatio = Math.min(
    ((need.progress.committed + need.progress.received) / need.progress.required) * 100,
    100,
  )

  return (
    <Card className={`${styles.needCard} ${styles.surfaceAccent} ${getNeedAccentClass(need)}`}>
      <CardContent className={styles.needCardContent}>
        <div className={styles.needCardHeader}>
          <div className={styles.needCardCopy}>
            <Typography variant="h5">{need.title}</Typography>
            <Typography color="text.secondary" variant="body2">
              {need.summary}
            </Typography>
          </div>

          <div className={styles.needCardChips}>
            <Chip
              color={NEED_STATUS_COLORS[need.displayStatus] ?? 'default'}
              label={NEED_STATUS_LABELS[need.displayStatus] ?? need.displayStatus}
              size="small"
            />
            <Chip label={need.categoryLabel} size="small" variant="outlined" />
            <Chip label={need.urgencyLabel} size="small" variant="outlined" />
          </div>
        </div>

        <div className={styles.needMetaGrid}>
          <article className={styles.needMetaItem}>
            <Typography color="text.secondary" variant="caption">
              {DONOR_FEED_CONTENT.needCard.centerLabel}
            </Typography>
            <Typography variant="body2">
              {need.centerName} - {CENTER_TYPE_LABELS[need.centerType] ?? need.centerType}
            </Typography>
          </article>

          <article className={styles.needMetaItem}>
            <Typography color="text.secondary" variant="caption">
              {DONOR_FEED_CONTENT.needCard.distanceLabel}
            </Typography>
            <Typography variant="body2">
              {typeof need.distanceKm === 'number'
                ? formatDistance(need.distanceKm)
                : DONOR_FEED_CONTENT.needCard.unknownDistanceLabel}
            </Typography>
          </article>

          <article className={styles.needMetaItem}>
            <Typography color="text.secondary" variant="caption">
              {DONOR_FEED_CONTENT.needCard.updatedLabel}
            </Typography>
            <Typography variant="body2">{need.updatedLabel}</Typography>
          </article>
        </div>

        <div className={styles.progressBlock}>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Typography variant="body2">{DONOR_FEED_CONTENT.needCard.progressLabel}</Typography>
            <Typography color="text.secondary" variant="body2">
              {Math.round(coverageRatio)}%
            </Typography>
          </Stack>
          <LinearProgress
            className={styles.progressBar}
            value={coverageRatio}
            variant="determinate"
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              '& .MuiLinearProgress-bar': {
                background: getProgressGradient(need),
                borderRadius: 999,
              },
            }}
          />
        </div>

        <div className={styles.progressGrid}>
          <article className={styles.progressMetric}>
            <Typography color="text.secondary" variant="caption">
              {DONOR_FEED_CONTENT.needCard.requiredLabel}
            </Typography>
            <Typography variant="body2">
              {need.progress.required} {need.unit}
            </Typography>
          </article>
          <article className={styles.progressMetric}>
            <Typography color="text.secondary" variant="caption">
              {DONOR_FEED_CONTENT.needCard.committedLabel}
            </Typography>
            <Typography variant="body2">
              {need.progress.committed} {need.unit}
            </Typography>
          </article>
          <article className={styles.progressMetric}>
            <Typography color="text.secondary" variant="caption">
              {DONOR_FEED_CONTENT.needCard.receivedLabel}
            </Typography>
            <Typography variant="body2">
              {need.progress.received} {need.unit}
            </Typography>
          </article>
          <article className={styles.progressMetric}>
            <Typography color="text.secondary" variant="caption">
              {DONOR_FEED_CONTENT.needCard.remainingLabel}
            </Typography>
            <Typography variant="body2">
              {need.progress.remaining} {need.unit}
            </Typography>
          </article>
        </div>

        <div className={styles.needCardFooter}>
          <Typography color="text.secondary" variant="body2">
            {need.city}
          </Typography>
          <Button onClick={() => onDonate(need)} variant="contained">
            {DONOR_FEED_CONTENT.needCard.donateLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default NeedCard
