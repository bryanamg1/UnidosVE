import { createTheme } from '@mui/material/styles'
import { UI_THEME_TOKENS } from '../constants'

const { colors, borderRadius } = UI_THEME_TOKENS

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
    },
    success: {
      main: colors.success,
    },
    warning: {
      main: colors.warning,
    },
    error: {
      main: colors.danger,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  shape: {
    borderRadius: borderRadius.card,
  },
  typography: {
    fontFamily: "'Segoe UI Variable Text', 'Trebuchet MS', 'Segoe UI', sans-serif",
    h1: {
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          minHeight: 46,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.card,
          backgroundImage: 'none',
          backdropFilter: 'blur(18px)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.pill,
        },
      },
    },
  },
})
