import { Chip, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { LANDING_CONTENT } from '../../../constants'
import LandingActions from '../components/LandingActions'
import LandingSignalPanel from '../components/LandingSignalPanel'
import styles from '../styles/LandingPage.module.css'

function LandingPage() {
  return (
    <main className={styles.page}>
      <section className={styles.layout}>
        <div className={styles.copyColumn}>
          <Chip
            color="primary"
            label={LANDING_CONTENT.badge}
            size="small"
            variant="outlined"
            sx={{
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(23, 105, 255, 0.08)',
              borderColor: 'rgba(23, 105, 255, 0.25)',
              color: '#5393ff',
              fontWeight: 600,
              px: 1.5,
              py: 0.5,
              mb: 1.5,
            }}
          />

          <Typography className={styles.title} variant="h1">
            Transforma tu{' '}
            <span className={styles.titleHighlight}>solidaridad por Venezuela</span> en{' '}
            <span className={styles.titleHighlight}>acción directa</span>.
          </Typography>

          <Typography className={styles.description} color="text.secondary" variant="body1">
            {LANDING_CONTENT.description}
          </Typography>

          <Stack className={styles.chipRow} direction="row" flexWrap="wrap" gap={1.5}>
            {LANDING_CONTENT.highlightChips.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                }}
              />
            ))}
          </Stack>

          <LandingActions actions={LANDING_CONTENT.actions} />

          <Typography className={styles.loginPrompt} variant="body2">
            ¿Ya tienes una cuenta registrada?{' '}
            <RouterLink to="/login" className={styles.loginTextLink}>
              Inicia sesión aquí
            </RouterLink>
          </Typography>
        </div>

        <div className={styles.visualColumn}>
          <LandingSignalPanel cards={LANDING_CONTENT.workflowCards} />
        </div>
      </section>
    </main>
  )
}

export default LandingPage
