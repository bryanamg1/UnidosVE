import { CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { appTheme } from './styles/appTheme'

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
