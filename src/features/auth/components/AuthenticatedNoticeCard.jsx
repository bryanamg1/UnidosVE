import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { AUTH_VIEW_CONTENT } from '../../../constants'
import styles from '../styles/AuthPage.module.css'

function AuthenticatedNoticeCard({ destination }) {
  return (
    <Card className={styles.formCard}>
      <CardContent className={styles.formCardContent}>
        <Stack spacing={1}>
          <Typography color="primary" variant="overline">
            {AUTH_VIEW_CONTENT.shared.authenticatedTitle}
          </Typography>
          <Typography variant="h4">
            {AUTH_VIEW_CONTENT.shared.authenticatedTitle}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {AUTH_VIEW_CONTENT.shared.authenticatedDescription}
          </Typography>
        </Stack>

        <Button component={RouterLink} to={destination} variant="contained">
          {AUTH_VIEW_CONTENT.shared.authenticatedAction}
        </Button>
      </CardContent>
    </Card>
  )
}

export default AuthenticatedNoticeCard
