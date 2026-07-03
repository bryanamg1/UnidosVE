import React from 'react'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import { Button, Chip, Stack, Typography, useMediaQuery, IconButton } from '@mui/material'
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { useAuth } from '../../features/auth/hooks/useAuth'
import { APP_ROUTES, AUTH_ROLES } from '../../constants'
import styles from './Header.module.css'

function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width: 600px)')

  const handleLogout = async () => {
    await logout()
    navigate(APP_ROUTES.HOME)
  }

  const isDonatePage = location.pathname === APP_ROUTES.DONATE
  const isDashboardPage = [
    APP_ROUTES.CENTER_DASHBOARD,
    APP_ROUTES.CENTER_NEEDS,
    APP_ROUTES.CENTER_DONATIONS,
    APP_ROUTES.CENTER_REGISTER
  ].includes(location.pathname)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <RouterLink to={APP_ROUTES.HOME} className={styles.logoLink}>
          <VolunteerActivismRoundedIcon className={styles.logoIcon} />
          <Typography variant="h5" className={styles.logoText}>
            UnidosVE
          </Typography>
        </RouterLink>

        <Stack direction="row" spacing={1.5} alignItems="center">
          {isAuthenticated ? (
            <>
              {!isMobile && (
                <Chip
                  className={styles.userBadge}
                  label={`${user?.firstName || ''} (${user?.role === AUTH_ROLES.DONOR ? 'Donante' : 'Centro'})`}
                  variant="outlined"
                  size="small"
                />
              )}

              {user?.role === AUTH_ROLES.DONOR && (
                <Button
                  component={RouterLink}
                  to={APP_ROUTES.DONATE}
                  variant={isDonatePage ? 'text' : 'outlined'}
                  color="primary"
                  size="small"
                  className={isDonatePage ? styles.navLinkActive : styles.navLinkButton}
                  startIcon={<ExploreRoundedIcon />}
                >
                  {isMobile ? 'Mapa' : 'Mapa de Ayuda'}
                </Button>
              )}

              {user?.role === AUTH_ROLES.CENTER && (
                <Button
                  component={RouterLink}
                  to={APP_ROUTES.CENTER_DASHBOARD}
                  variant={isDashboardPage ? 'text' : 'outlined'}
                  color="primary"
                  size="small"
                  className={isDashboardPage ? styles.navLinkActive : styles.navLinkButton}
                  startIcon={<DashboardRoundedIcon />}
                >
                  {isMobile ? 'Panel' : 'Panel de Control'}
                </Button>
              )}

              <IconButton
                onClick={handleLogout}
                className={styles.logoutButton}
                size="small"
                title="Cerrar sesión"
                color="inherit"
              >
                <LogoutRoundedIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                component={RouterLink}
                to={APP_ROUTES.LOGIN}
                variant="text"
                color="inherit"
                size="small"
                startIcon={<LoginRoundedIcon />}
              >
                Acceder
              </Button>
              {!isMobile && (
                <Button
                  component={RouterLink}
                  to={APP_ROUTES.REGISTER}
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<PersonAddAltRoundedIcon />}
                >
                  Registro
                </Button>
              )}
            </>
          )}
        </Stack>
      </div>
    </header>
  )
}

export default Header
