import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  APP_ROUTES,
  AUTH_REDIRECT_BY_ROLE,
  AUTH_VIEW_CONTENT,
} from '../../../constants'
import AuthFormCard from '../components/AuthFormCard'
import AuthPageShell from '../components/AuthPageShell'
import { useAuth } from '../hooks/useAuth'

const LOGIN_FIELDS = [
  {
    name: 'email',
    label: AUTH_VIEW_CONTENT.shared.emailLabel,
    type: 'email',
    required: true,
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: AUTH_VIEW_CONTENT.shared.passwordLabel,
    type: 'password',
    required: true,
    autoComplete: 'current-password',
  },
]

function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, status, error, clearError } = useAuth()
  const [successMessage, setSuccessMessage] = useState('')
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const infoMessage = location.state?.reason ?? ''

  function handleFieldChange(event) {
    const { name, value } = event.target
    clearError()
    setSuccessMessage('')
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const nextUser = await login(formValues)
      setSuccessMessage(AUTH_VIEW_CONTENT.alerts.loginSuccess)
      navigate(AUTH_REDIRECT_BY_ROLE[nextUser.role], { replace: true })
    } catch {
      return
    }
  }

  return (
    <AuthPageShell>
      <AuthFormCard
        error={error}
        fields={LOGIN_FIELDS}
        infoMessage={infoMessage}
        isSubmitting={status === 'loading'}
        mode={AUTH_VIEW_CONTENT.login}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
        secondaryActionLabel={AUTH_VIEW_CONTENT.login.secondaryActionLabel}
        secondaryRoute={APP_ROUTES.REGISTER}
        successMessage={successMessage}
        values={formValues}
      />
    </AuthPageShell>
  )
}

export default LoginPage
