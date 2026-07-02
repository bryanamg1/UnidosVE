import { Navigate } from 'react-router-dom'
import {
  APP_ROUTES,
  AUTH_REDIRECT_BY_ROLE,
  AUTH_ROLES,
  AUTH_VIEW_CONTENT,
} from '../constants'
import { useAuth } from '../features/auth/hooks/useAuth'

function getUnauthorizedMessage(allowedRoles) {
  if (allowedRoles.length === 1 && allowedRoles[0] === AUTH_ROLES.DONOR) {
    return AUTH_VIEW_CONTENT.alerts.unauthorizedDonor
  }

  if (allowedRoles.length === 1 && allowedRoles[0] === AUTH_ROLES.CENTER) {
    return AUTH_VIEW_CONTENT.alerts.unauthorizedCenter
  }

  return AUTH_VIEW_CONTENT.alerts.genericError
}

function RoleRoute({ allowedRoles, children }) {
  const { role } = useAuth()

  if (!allowedRoles.includes(role)) {
    return (
      <Navigate
        replace
        state={{ reason: getUnauthorizedMessage(allowedRoles) }}
        to={AUTH_REDIRECT_BY_ROLE[role] ?? APP_ROUTES.HOME}
      />
    )
  }

  return children
}

export default RoleRoute
