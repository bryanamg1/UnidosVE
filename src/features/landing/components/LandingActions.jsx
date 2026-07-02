import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import styles from '../styles/LandingPage.module.css'

const ACTION_ICONS = {
  center: BusinessRoundedIcon,
  donate: FavoriteRoundedIcon,
  login: LoginRoundedIcon,
  register: PersonAddAltRoundedIcon,
}

function LandingActions({ actions }) {
  return (
    <div className={styles.actionsGrid}>
      {actions.map((action) => {
        const Icon = ACTION_ICONS[action.id] ?? ArrowOutwardRoundedIcon

        return (
          <Card key={action.id} className={styles.actionCard}>
            <CardContent className={styles.actionCardContent}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Typography variant="h6">{action.label}</Typography>
                <Icon fontSize="small" />
              </Stack>

              <Typography color="text.secondary" variant="body2">
                {action.description}
              </Typography>

              <Button
                component={RouterLink}
                to={action.to}
                variant={action.variant}
              >
                {action.label}
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default LandingActions
