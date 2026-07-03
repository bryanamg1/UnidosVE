import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded'
import { Button, Chip, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { APP_ROUTES, AUTH_VIEW_CONTENT } from '../../../constants'
import styles from '../styles/AuthPage.module.css'

function AuthPageShell({ children, isRegister = false }) {
  const badgeText = isRegister ? 'Registro Seguro' : AUTH_VIEW_CONTENT.shell.badge
  const titleText = isRegister 
    ? 'Únete a la red de ayuda humanitaria.' 
    : AUTH_VIEW_CONTENT.shell.title
  const descriptionText = isRegister
    ? 'Crea una cuenta en segundos para comenzar a canalizar aportes o dar de alta tu centro de acopio.'
    : AUTH_VIEW_CONTENT.shell.description
  const highlights = isRegister
    ? [
        'Canalización directa de insumos',
        'Trazabilidad en tiempo real',
        'Acceso rápido a necesidades',
      ]
    : AUTH_VIEW_CONTENT.shell.highlights

  return (
    <main className={styles.page}>
      <section className={styles.layout}>
        <div className={styles.copyColumn}>
          <Button
            className={styles.backHomeButton}
            component={RouterLink}
            startIcon={<KeyboardBackspaceRoundedIcon />}
            to={APP_ROUTES.HOME}
            variant="text"
            sx={{ mb: 2 }}
          >
            {AUTH_VIEW_CONTENT.shared.backHomeLabel}
          </Button>

          <Chip 
            color="primary" 
            label={badgeText} 
            size="small" 
            variant="outlined"
            sx={{
              alignSelf: 'flex-start',
              backgroundColor: 'rgba(23, 105, 255, 0.08)',
              borderColor: 'rgba(23, 105, 255, 0.25)',
              color: '#5393ff',
              fontWeight: 600,
              mb: 1,
            }}
          />

          <Typography className={styles.title} variant="h2" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.15 }}>
            {isRegister ? (
              <>
                Únete a la red de{' '}
                <span className={styles.titleGradient}>ayuda humanitaria</span>.
              </>
            ) : (
              <>
                Ingresa para{' '}
                <span className={styles.titleGradient}>coordinar ayuda</span> desde tu espacio.
              </>
            )}
          </Typography>

          <Typography className={styles.description} color="text.secondary" variant="body1" sx={{ mb: 3 }}>
            {descriptionText}
          </Typography>

          <div className={styles.highlightList}>
            {highlights.map((highlight) => (
              <article key={highlight} className={styles.highlightCard}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {highlight}
                </Typography>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.formColumn}>{children}</div>
      </section>
    </main>
  )
}

export default AuthPageShell
