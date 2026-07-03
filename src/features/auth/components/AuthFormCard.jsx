import {
  Alert,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { AUTH_ROLE_OPTIONS, AUTH_VIEW_CONTENT } from '../../../constants'
import styles from '../styles/AuthPage.module.css'

function AuthFormCard({
  mode,
  fields,
  values,
  onFieldChange,
  onSubmit,
  isSubmitting,
  error,
  infoMessage,
  successMessage,
  secondaryRoute,
  secondaryActionLabel,
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className={styles.formCard}>
      <CardContent className={styles.formCardContent}>
        <Stack spacing={1}>
          <Typography color="primary" variant="overline">
            {mode.badge}
          </Typography>
          <Typography variant="h4">{mode.title}</Typography>
          <Typography color="text.secondary" variant="body2">
            {mode.description}
          </Typography>
        </Stack>

        {infoMessage ? <Alert severity="warning">{infoMessage}</Alert> : null}
        {error ? <Alert severity="error">{error}</Alert> : null}
        {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

        <Stack component="form" spacing={2.25} onSubmit={onSubmit}>
          {fields.map((field) => {
            if (field.type === 'select') {
              return (
                <Select
                  key={field.name}
                  displayEmpty
                  name={field.name}
                  onChange={onFieldChange}
                  value={values[field.name]}
                >
                  <MenuItem disabled value="">
                    {field.label}
                  </MenuItem>

                  {AUTH_ROLE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )
            }

            const isPasswordField = field.type === 'password'

            return (
              <TextField
                key={field.name}
                autoComplete={field.autoComplete}
                label={field.label}
                name={field.name}
                onChange={onFieldChange}
                required={field.required}
                type={isPasswordField && showPassword ? 'text' : field.type}
                value={values[field.name]}
                slotProps={{
                  input: isPasswordField
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }
                    : undefined,
                }}
              />
            )
          })}

          <Button disabled={isSubmitting} type="submit" variant="contained">
            {isSubmitting ? AUTH_VIEW_CONTENT.shared.submitLoading : mode.submitLabel}
          </Button>
        </Stack>

        <Typography color="text.secondary" variant="body2">
          {mode.secondaryPrompt}{' '}
          <Button component={RouterLink} to={secondaryRoute} variant="text">
            {secondaryActionLabel}
          </Button>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AuthFormCard
