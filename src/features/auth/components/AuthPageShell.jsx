import { Chip, Typography } from '@mui/material'
import { AUTH_VIEW_CONTENT } from '../../../constants'
import styles from '../styles/AuthPage.module.css'

function AuthPageShell({ children }) {
  return (
    <main className={styles.page}>
      <section className={styles.layout}>
        <div className={styles.copyColumn}>
          <Chip color="primary" label={AUTH_VIEW_CONTENT.shell.badge} size="small" />

          <Typography className={styles.title} variant="h2">
            {AUTH_VIEW_CONTENT.shell.title}
          </Typography>

          <Typography className={styles.description} color="text.secondary" variant="body1">
            {AUTH_VIEW_CONTENT.shell.description}
          </Typography>

          <div className={styles.highlightList}>
            {AUTH_VIEW_CONTENT.shell.highlights.map((highlight) => (
              <article key={highlight} className={styles.highlightCard}>
                <Typography variant="body2">{highlight}</Typography>
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
