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
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
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

        {mode.demoAccounts?.length ? (
          <Alert severity="info">
            <strong>{AUTH_VIEW_CONTENT.shared.demoTitle}:</strong>{' '}
            {mode.demoAccounts.join(' | ')}
          </Alert>
        ) : null}

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

            return (
              <TextField
                key={field.name}
                autoComplete={field.autoComplete}
                label={field.label}
                name={field.name}
                onChange={onFieldChange}
                required={field.required}
                type={field.type}
                value={values[field.name]}
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
