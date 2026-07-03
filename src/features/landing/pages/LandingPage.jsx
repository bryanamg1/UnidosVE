import { Chip, Stack, Typography } from '@mui/material'
import { LANDING_CONTENT } from '../../../constants'
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
