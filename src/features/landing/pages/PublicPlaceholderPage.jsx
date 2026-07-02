import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { Button, Chip, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { APP_ROUTES, PUBLIC_PAGE_ACTIONS, PUBLIC_PAGE_CONTENT } from '../../../constants'
import styles from '../styles/PublicPlaceholderPage.module.css'

function PublicPlaceholderPage({ pageKey }) {
  const content = PUBLIC_PAGE_CONTENT[pageKey] ?? PUBLIC_PAGE_CONTENT.notFound

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <Chip color="primary" label={content.badge} size="small" />

        <Typography className={styles.title} variant="h2">
          {content.title}
        </Typography>

        <Typography className={styles.description} color="text.secondary" variant="body1">
          {content.description}
        </Typography>

        <Button
          component={RouterLink}
          startIcon={<ArrowBackRoundedIcon />}
          to={APP_ROUTES.HOME}
          variant="contained"
        >
          {PUBLIC_PAGE_ACTIONS.backHomeLabel}
        </Button>
      </section>
    </main>
  )
}

export default PublicPlaceholderPage
