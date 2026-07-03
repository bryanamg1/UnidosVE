import { createTheme } from '@mui/material/styles'
import { UI_THEME_TOKENS } from '../constants'

const { colors, borderRadius } = UI_THEME_TOKENS

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      light: '#5393ff',
      dark: '#0047c5',
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
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.04em',
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '0',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0',
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
          paddingInline: 24,
          minHeight: 46,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(23, 105, 255, 0.12)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.card,
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.pill,
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          transition: 'all 0.2s ease',
          backgroundColor: '#ffffff',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(23, 105, 255, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
            borderWidth: 1.5,
          },
        },
        notchedOutline: {
          borderColor: 'rgba(15, 23, 42, 0.12)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: '#ffffff',
        },
      },
    },
  },
})
