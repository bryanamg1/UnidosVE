import { CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { APP_ROUTES, AUTH_ROLES } from '../constants'
import PublicRoute from './PublicRoute'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'
import Layout from '../components/layout/Layout'

const LandingPage = lazy(() => import('../features/landing/pages/LandingPage'))
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage'))
const CenterDashboardPage = lazy(() => import('../features/dashboard/pages/CenterDashboardPage'))
const DonorMapPage = lazy(() => import('../features/map/pages/DonorMapPage'))
const PublicPlaceholderPage = lazy(
  () => import('../features/landing/pages/PublicPlaceholderPage'),
)

const PUBLIC_ROUTES = [
  { path: APP_ROUTES.CENTERS, pageKey: 'centers' },
  { path: APP_ROUTES.NOT_FOUND, pageKey: 'notFound' },
]

function RouteLoadingFallback() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <CircularProgress size={28} />
    </main>
  )
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route
            path={APP_ROUTES.HOME}
            element={
              <PublicRoute>
                <Layout>
                  <LandingPage />
                </Layout>
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
                  <Layout>
                    <PublicPlaceholderPage pageKey={pageKey} />
                  </Layout>
                </PublicRoute>
              }
            />
          ))}

          <Route
            path={APP_ROUTES.DONATE}
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={[AUTH_ROLES.DONOR]}>
                  <Layout>
                    <DonorMapPage />
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path={APP_ROUTES.CENTER_REGISTER}
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={[AUTH_ROLES.CENTER]}>
                  <Layout>
                    <CenterDashboardPage />
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path={APP_ROUTES.CENTER_DASHBOARD}
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={[AUTH_ROLES.CENTER]}>
                  <Layout>
                    <CenterDashboardPage />
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path={APP_ROUTES.CENTER_NEEDS}
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={[AUTH_ROLES.CENTER]}>
                  <Layout>
                    <CenterDashboardPage />
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path={APP_ROUTES.CENTER_DONATIONS}
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={[AUTH_ROLES.CENTER]}>
                  <Layout>
                    <CenterDashboardPage />
                  </Layout>
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate replace to={APP_ROUTES.NOT_FOUND} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
