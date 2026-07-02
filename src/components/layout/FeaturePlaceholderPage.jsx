import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { Alert, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { APP_ROUTES, AUTH_VIEW_CONTENT } from '../../constants'
import { useAuth } from '../../features/auth/hooks/useAuth'
import styles from './FeaturePlaceholderPage.module.css'

function FeaturePlaceholderPage({ content }) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const infoMessage = location.state?.reason ?? ''

  return (
    <main className={styles.page}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Chip color="primary" label={content.badge} size="small" />
            {user ? (
              <Chip
                label={`${user.firstName} ${user.lastName} - ${user.role}`}
                size="small"
                variant="outlined"
              />
            ) : null}
          </Stack>

          <Typography className={styles.title} variant="h3">
            {content.title}
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {content.description}
          </Typography>

          {infoMessage ? <Alert severity="info">{infoMessage}</Alert> : null}

          <div className={styles.actions}>
            <Button
              component={RouterLink}
              startIcon={<ArrowBackRoundedIcon />}
              to={APP_ROUTES.HOME}
              variant="outlined"
            >
              {AUTH_VIEW_CONTENT.shared.backHomeLabel}
            </Button>

            <Button
              component={RouterLink}
              onClick={logout}
              startIcon={<LogoutRoundedIcon />}
              to={APP_ROUTES.HOME}
              variant="contained"
            >
              {AUTH_VIEW_CONTENT.shared.logoutLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default FeaturePlaceholderPage
