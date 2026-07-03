import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'
import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import styles from '../styles/LandingPage.module.css'

const ACTION_ICONS = {
  center: BusinessRoundedIcon,
  login: LoginRoundedIcon,
  register: PersonAddAltRoundedIcon,
}

function LandingActions({ actions }) {
  return (
    <div className={styles.actionsGrid}>
      {actions.map((action) => {
        const Icon = ACTION_ICONS[action.id] ?? ArrowOutwardRoundedIcon
        const isCenterAction = action.id === 'center'

        return (
          <Card
            key={action.id}
            className={`${styles.actionCard} ${isCenterAction ? styles.actionCardPrimary : ''}`}
          >
            <CardContent className={styles.actionCardContent}>
              <div className={styles.actionCardBody}>
                <Stack
                  className={styles.actionCardHeader}
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography variant="h6">{action.label}</Typography>
                  <span className={styles.actionCardIcon}>
                    <Icon fontSize="small" />
                  </span>
                </Stack>

                <Typography color="text.secondary" variant="body2">
                  {action.description}
                </Typography>
              </div>

              <Button
                className={`${styles.actionButton} ${isCenterAction ? styles.actionButtonPrimary : ''}`}
                component={RouterLink}
                to={action.to}
                variant="outlined"
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
