import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  APP_ROUTES,
  AUTH_QUERY_PARAMS,
  AUTH_REDIRECT_BY_ROLE,
  AUTH_ROLES,
  AUTH_SUPPORTED_ROLES,
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
  {
    name: 'role',
    label: AUTH_VIEW_CONTENT.shared.roleLabel,
    type: 'select',
    required: true,
  },
]

function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, status, error, clearError } = useAuth()
  const [successMessage, setSuccessMessage] = useState('')
  const derivedRole = searchParams.get(AUTH_QUERY_PARAMS.ROLE)
  const initialRole = AUTH_SUPPORTED_ROLES.includes(derivedRole)
    ? derivedRole
    : AUTH_ROLES.DONOR
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    role: initialRole,
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
