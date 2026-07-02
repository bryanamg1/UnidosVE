import { Navigate, useLocation } from 'react-router-dom'
import { APP_ROUTES, AUTH_VIEW_CONTENT } from '../constants'
import { useAuth } from '../features/auth/hooks/useAuth'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const { isAuthenticated, status } = useAuth()

  if (status === 'idle') {
    return null
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        state={{ from: location, reason: AUTH_VIEW_CONTENT.alerts.authRequired }}
        to={APP_ROUTES.LOGIN}
      />
    )
  }

  return children
}

export default ProtectedRoute
