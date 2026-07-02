import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { Button, Chip, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { APP_ROUTES, LANDING_CONTENT } from '../../../constants'
import LandingActions from '../components/LandingActions'
import LandingSignalPanel from '../components/LandingSignalPanel'
import styles from '../styles/LandingPage.module.css'

function LandingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.layout}>
        <div className={styles.copyColumn}>
          <Chip color="primary" label={LANDING_CONTENT.badge} size="small" />

          <Typography className={styles.title} variant="h1">
            {LANDING_CONTENT.title}
          </Typography>

          <Typography className={styles.description} color="text.secondary" variant="body1">
            {LANDING_CONTENT.description}
          </Typography>

          <Stack className={styles.chipRow} direction="row" flexWrap="wrap" gap={1}>
            {LANDING_CONTENT.highlightChips.map((chip) => (
              <Chip key={chip} label={chip} variant="outlined" />
            ))}
          </Stack>

          <div className={styles.heroActions}>
            <Button
              component={RouterLink}
              endIcon={<ArrowForwardRoundedIcon />}
              to={APP_ROUTES.DONATE}
              variant="contained"
            >
              {LANDING_CONTENT.cta.primaryLabel}
            </Button>

            <Button component={RouterLink} to={APP_ROUTES.CENTERS} variant="text">
              {LANDING_CONTENT.cta.secondaryLabel}
            </Button>
          </div>

          <div className={styles.statsGrid}>
            {LANDING_CONTENT.stats.map((stat) => (
              <article key={stat.label} className={styles.statCard}>
                <Typography className={styles.statValue} variant="h4">
                  {stat.value}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {stat.label}
                </Typography>
              </article>
            ))}
          </div>

          <LandingActions actions={LANDING_CONTENT.actions} />
        </div>

        <div className={styles.visualColumn}>
          <LandingSignalPanel cards={LANDING_CONTENT.workflowCards} />
        </div>
      </section>
    </main>
  )
}

export default LandingPage
