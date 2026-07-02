import { Navigate } from 'react-router-dom'
import { AUTH_REDIRECT_BY_ROLE } from '../constants'
import { useAuth } from '../features/auth/hooks/useAuth'

function PublicRoute({ children, restrictWhenAuthenticated = false }) {
  const { isAuthenticated, role, status } = useAuth()

  if (status === 'idle') {
    return null
  }

  if (restrictWhenAuthenticated && isAuthenticated) {
    return <Navigate replace to={AUTH_REDIRECT_BY_ROLE[role]} />
  }

  return children
}

export default PublicRoute
