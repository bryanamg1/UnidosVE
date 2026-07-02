import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { APP_ROUTES, AUTH_ROLES, PROTECTED_PAGE_CONTENT } from '../constants'
import FeaturePlaceholderPage from '../components/layout/FeaturePlaceholderPage'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import DonorMapPage from '../features/map/pages/DonorMapPage'
import PublicRoute from './PublicRoute'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'
import LandingPage from '../features/landing/pages/LandingPage'
import PublicPlaceholderPage from '../features/landing/pages/PublicPlaceholderPage'

const PUBLIC_ROUTES = [
  { path: APP_ROUTES.CENTERS, pageKey: 'centers' },
  { path: APP_ROUTES.NOT_FOUND, pageKey: 'notFound' },
]

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={APP_ROUTES.HOME}
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        <Route
          path={APP_ROUTES.LOGIN}
          element={
            <PublicRoute restrictWhenAuthenticated>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path={APP_ROUTES.REGISTER}
          element={
            <PublicRoute restrictWhenAuthenticated>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {PUBLIC_ROUTES.map(({ path, pageKey }) => (
          <Route
            key={path}
            path={path}
            element={
              <PublicRoute>
                <PublicPlaceholderPage pageKey={pageKey} />
              </PublicRoute>
            }
          />
        ))}

        <Route
          path={APP_ROUTES.DONATE}
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[AUTH_ROLES.DONOR]}>
                <DonorMapPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path={APP_ROUTES.CENTER_REGISTER}
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[AUTH_ROLES.CENTER]}>
                <FeaturePlaceholderPage content={PROTECTED_PAGE_CONTENT.centerDashboard} />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path={APP_ROUTES.CENTER_DASHBOARD}
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[AUTH_ROLES.CENTER]}>
                <FeaturePlaceholderPage content={PROTECTED_PAGE_CONTENT.centerDashboard} />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path={APP_ROUTES.CENTER_NEEDS}
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[AUTH_ROLES.CENTER]}>
                <FeaturePlaceholderPage content={PROTECTED_PAGE_CONTENT.centerNeeds} />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path={APP_ROUTES.CENTER_DONATIONS}
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={[AUTH_ROLES.CENTER]}>
                <FeaturePlaceholderPage content={PROTECTED_PAGE_CONTENT.centerDonations} />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate replace to={APP_ROUTES.NOT_FOUND} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
