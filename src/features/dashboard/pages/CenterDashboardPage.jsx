import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import {
  APP_ROUTES,
  CENTER_DASHBOARD_CONTENT,
  CENTER_TYPE_LABELS,
  CENTER_TYPES,
  DONATION_STATUS_COLORS,
  DONATION_STATUS_LABELS,
  DONATION_STATUSES,
  NEED_CATEGORIES,
  NEED_STATUS_COLORS,
  NEED_STATUS_LABELS,
  NEED_STATUSES,
  NEED_URGENCY_LEVELS,
} from '../../../constants'
import { useAuth } from '../../auth/hooks/useAuth'
import { useCenterProfile } from '../../centers/hooks/useCenterProfile'
import { useCenterDonations } from '../../donations/hooks/useCenterDonations'
import { useCenterNeeds } from '../../needs/hooks/useCenterNeeds'
import styles from '../styles/CenterDashboardPage.module.css'

const CENTER_TAB_PATHS = {
  profile: APP_ROUTES.CENTER_DASHBOARD,
  needs: APP_ROUTES.CENTER_NEEDS,
  donations: APP_ROUTES.CENTER_DONATIONS,
}

const EMPTY_CENTER_FORM = {
  name: '',
  type: CENTER_TYPES[0],
  description: '',
  address: '',
  city: '',
  latitude: '',
  longitude: '',
  contactPhone: '',
  contactEmail: '',
  managerName: '',
  authorizationProfile: '',
  privateCode: '',
  schedule: '',
}

const EMPTY_NEED_FORM = {
  title: '',
  summary: '',
  category: NEED_CATEGORIES[0],
  urgency: NEED_URGENCY_LEVELS[1],
  status: NEED_STATUSES.ACTIVE,
  requiredQuantity: '',
  unit: '',
}

function createCenterForm(center) {
  if (!center) {
    return EMPTY_CENTER_FORM
  }

  return {
    name: center.name,
    type: center.type,
    description: center.description,
    address: center.address,
    city: center.city,
    latitude: String(center.latitude),
    longitude: String(center.longitude),
    contactPhone: center.contactPhone,
    contactEmail: center.contactEmail,
    managerName: center.managerName,
    authorizationProfile: center.authorizationProfile,
    privateCode: center.privateCode,
    schedule: center.schedule,
  }
}

function CenterProfileForm({ center, isSaving, onSave }) {
  const [form, setForm] = useState(() => createCenterForm(center))

  function handleFieldChange(event) {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await onSave(form)
  }

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
      <div className={styles.formGrid}>
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.name}
          name="name"
          onChange={handleFieldChange}
          required
          value={form.name}
        />
        <Select name="type" onChange={handleFieldChange} value={form.type}>
          {CENTER_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {CENTER_TYPE_LABELS[type]}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.city}
          name="city"
          onChange={handleFieldChange}
          required
          value={form.city}
        />
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.address}
          name="address"
          onChange={handleFieldChange}
          required
          value={form.address}
        />
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.latitude}
          name="latitude"
          onChange={handleFieldChange}
          required
          type="number"
          value={form.latitude}
        />
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.longitude}
          name="longitude"
          onChange={handleFieldChange}
          required
          type="number"
          value={form.longitude}
        />
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.contactPhone}
          name="contactPhone"
          onChange={handleFieldChange}
          required
          value={form.contactPhone}
        />
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.contactEmail}
          name="contactEmail"
          onChange={handleFieldChange}
          required
          value={form.contactEmail}
        />
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.managerName}
          name="managerName"
          onChange={handleFieldChange}
          required
          value={form.managerName}
        />
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.authorizationProfile}
          name="authorizationProfile"
          onChange={handleFieldChange}
          required
          value={form.authorizationProfile}
        />
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.privateCode}
          name="privateCode"
          onChange={handleFieldChange}
          required
          value={form.privateCode}
        />
        <TextField
          label={CENTER_DASHBOARD_CONTENT.profile.fields.schedule}
          name="schedule"
          onChange={handleFieldChange}
          required
          value={form.schedule}
        />
      </div>

      <TextField
        label={CENTER_DASHBOARD_CONTENT.profile.fields.description}
        minRows={4}
        multiline
        name="description"
        onChange={handleFieldChange}
        required
        value={form.description}
      />

      <Button disabled={isSaving} type="submit" variant="contained">
        {CENTER_DASHBOARD_CONTENT.profile.saveLabel}
      </Button>
    </Stack>
  )
}

function getActiveTab(pathname) {
  if (pathname === APP_ROUTES.CENTER_NEEDS) {
    return 'needs'
  }

  if (pathname === APP_ROUTES.CENTER_DONATIONS) {
    return 'donations'
  }

  return 'profile'
}

function getNeedCardTone(status) {
  if (status === NEED_STATUSES.CRITICAL) {
    return styles.workspaceCardCritical
  }

  if (status === NEED_STATUSES.COVERED) {
    return styles.workspaceCardSuccess
  }

  if (status === NEED_STATUSES.PARTIALLY_COVERED || status === NEED_STATUSES.IN_TRANSIT) {
    return styles.workspaceCardWarning
  }

  return styles.workspaceCardInfo
}

function getDonationCardTone(status) {
  if (status === DONATION_STATUSES.RECEIVED || status === DONATION_STATUSES.COMPLETED) {
    return styles.workspaceCardSuccess
  }

  if (status === DONATION_STATUSES.PREPARING || status === DONATION_STATUSES.IN_TRANSIT) {
    return styles.workspaceCardWarning
  }

  if (status === DONATION_STATUSES.CANCELED) {
    return styles.workspaceCardCritical
  }

  return styles.workspaceCardInfo
}

function CenterDashboardPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = getActiveTab(location.pathname)
  const { user, logout } = useAuth()
  const {
    center,
    isLoading: isCenterLoading,
    isSaving: isCenterSaving,
    error: centerError,
    saveCenterProfile,
  } = useCenterProfile(user)
  const centerId = center?.id ?? null
  const {
    needs,
    isLoading: isNeedsLoading,
    isSubmitting: isNeedsSubmitting,
    error: needsError,
    createNeed,
    updateNeedStatus,
  } = useCenterNeeds(centerId)
  const {
    donations,
    isLoading: isDonationsLoading,
    isSubmitting: isDonationsSubmitting,
    error: donationsError,
    updateDonationStatus,
  } = useCenterDonations(centerId)

  const [needForm, setNeedForm] = useState(EMPTY_NEED_FORM)
  const [needStatusDrafts, setNeedStatusDrafts] = useState({})
  const [donationStatusDrafts, setDonationStatusDrafts] = useState({})
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const donationCards = useMemo(() => {
    return donations.map((donation) => {
      const relatedNeed = needs.find((need) => need.id === donation.needId)

      return {
        ...donation,
        needTitle: relatedNeed?.title ?? donation.needId,
      }
    })
  }, [donations, needs])

  function handleTabChange(_, nextTab) {
    navigate(CENTER_TAB_PATHS[nextTab])
  }

  function handleNeedFieldChange(event) {
    const { name, value } = event.target
    setNeedForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSaveCenter(form) {
    try {
      await saveCenterProfile(form)
      setFeedback({
        type: 'success',
        message: CENTER_DASHBOARD_CONTENT.profile.successMessage,
      })
    } catch {
      setFeedback({
        type: 'error',
        message: CENTER_DASHBOARD_CONTENT.alerts.genericError,
      })
    }
  }

  async function handleCreateNeed(event) {
    event.preventDefault()

    if (!centerId) {
      setFeedback({
        type: 'warning',
        message: CENTER_DASHBOARD_CONTENT.alerts.centerRequired,
      })
      return
    }

    try {
      await createNeed({
        ...needForm,
        centerId,
      })
      setNeedForm(EMPTY_NEED_FORM)
      setFeedback({
        type: 'success',
        message: CENTER_DASHBOARD_CONTENT.needs.successCreateMessage,
      })
    } catch {
      setFeedback({
        type: 'error',
        message: CENTER_DASHBOARD_CONTENT.alerts.genericError,
      })
    }
  }

  async function handleNeedStatusSave(needId) {
    const nextStatus = needStatusDrafts[needId]
    const activeNeed = needs.find((need) => need.id === needId)

    if (!nextStatus || !activeNeed) {
      return
    }

    try {
      await updateNeedStatus(needId, nextStatus, {
        centerAccessCode: center?.privateCode ?? '',
        receivedQuantity:
          nextStatus === NEED_STATUSES.COVERED ? activeNeed.baseProgress.required : undefined,
      })
      setFeedback({
        type: 'success',
        message: CENTER_DASHBOARD_CONTENT.needs.successStatusMessage,
      })
    } catch {
      setFeedback({
        type: 'error',
        message: CENTER_DASHBOARD_CONTENT.alerts.genericError,
      })
    }
  }

  async function handleDonationStatusSave(donationId) {
    const nextStatus = donationStatusDrafts[donationId]
    const activeDonation = donations.find((donation) => donation.id === donationId)

    if (!nextStatus || !activeDonation) {
      return
    }

    try {
      await updateDonationStatus(donationId, nextStatus, {
        centerAccessCode: center?.privateCode ?? '',
        receivedQuantity:
          nextStatus === DONATION_STATUSES.RECEIVED ||
          nextStatus === DONATION_STATUSES.COMPLETED
            ? activeDonation.amount
            : undefined,
      })
      setFeedback({
        type: 'success',
        message: CENTER_DASHBOARD_CONTENT.donations.successStatusMessage,
      })
    } catch {
      setFeedback({
        type: 'error',
        message: CENTER_DASHBOARD_CONTENT.alerts.genericError,
      })
    }
  }

  const isPageLoading =
    isCenterLoading ||
    (Boolean(centerId) && activeTab === 'needs' && isNeedsLoading) ||
    (Boolean(centerId) && activeTab === 'donations' && isDonationsLoading)

  return (
    <main className={styles.page}>
      <section className={styles.layout}>
        <div className={styles.heroCard}>
          <div className={styles.heroCopy}>
            <Chip color="primary" label={CENTER_DASHBOARD_CONTENT.shell.badge} size="small" />
            <Typography className={styles.heroTitle} variant="h2">
              {CENTER_DASHBOARD_CONTENT.shell.title}
            </Typography>
            <Typography color="text.secondary" variant="body1">
              {CENTER_DASHBOARD_CONTENT.shell.description}
            </Typography>
          </div>

          <div className={styles.heroActions}>
            <Chip
              label={`${user?.firstName ?? ''} ${user?.lastName ?? ''} - ${user?.role ?? ''}`}
              size="small"
              variant="outlined"
            />
            <Stack direction="row" spacing={1.25}>
              <Button
                component={RouterLink}
                startIcon={<ExploreRoundedIcon />}
                to={APP_ROUTES.HOME}
                variant="outlined"
              >
                {CENTER_DASHBOARD_CONTENT.shell.backHomeLabel}
              </Button>
              <Button
                component={RouterLink}
                onClick={logout}
                startIcon={<LogoutRoundedIcon />}
                to={APP_ROUTES.HOME}
                variant="contained"
              >
                {CENTER_DASHBOARD_CONTENT.shell.logoutLabel}
              </Button>
            </Stack>
          </div>

          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <Typography variant="h5">{center ? '1' : '0'}</Typography>
              <Typography color="text.secondary" variant="body2">
                {CENTER_DASHBOARD_CONTENT.shell.summary.profileLabel}
              </Typography>
            </article>
            <article className={styles.summaryCard}>
              <Typography variant="h5">{needs.length}</Typography>
              <Typography color="text.secondary" variant="body2">
                {CENTER_DASHBOARD_CONTENT.shell.summary.needsLabel}
              </Typography>
            </article>
            <article className={styles.summaryCard}>
              <Typography variant="h5">{donations.length}</Typography>
              <Typography color="text.secondary" variant="body2">
                {CENTER_DASHBOARD_CONTENT.shell.summary.donationsLabel}
              </Typography>
            </article>
          </div>
        </div>

        <Card className={styles.tabsCard}>
          <Tabs onChange={handleTabChange} value={activeTab} variant="fullWidth">
            <Tab label={CENTER_DASHBOARD_CONTENT.shell.tabs.profile} value="profile" />
            <Tab label={CENTER_DASHBOARD_CONTENT.shell.tabs.needs} value="needs" />
            <Tab label={CENTER_DASHBOARD_CONTENT.shell.tabs.donations} value="donations" />
          </Tabs>
        </Card>

        {feedback.message ? <Alert severity={feedback.type}>{feedback.message}</Alert> : null}
        {centerError || needsError || donationsError ? (
          <Alert severity="error">{CENTER_DASHBOARD_CONTENT.alerts.genericError}</Alert>
        ) : null}

        {isPageLoading ? (
          <div className={styles.loadingState}>
            <CircularProgress size={30} />
            <Typography color="text.secondary" variant="body2">
              {CENTER_DASHBOARD_CONTENT.shell.loadingLabel}
            </Typography>
          </div>
        ) : null}

        {!isPageLoading && activeTab === 'profile' ? (
          <Card className={styles.sectionCard}>
            <CardContent className={styles.sectionContent}>
              <div className={styles.sectionHeader}>
                <Typography variant="h4">{CENTER_DASHBOARD_CONTENT.profile.title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {center
                    ? CENTER_DASHBOARD_CONTENT.profile.description
                    : CENTER_DASHBOARD_CONTENT.profile.emptyMessage}
                </Typography>
              </div>

              <CenterProfileForm
                center={center}
                isSaving={isCenterSaving}
                key={center?.id ?? 'new-center'}
                onSave={handleSaveCenter}
              />
            </CardContent>
          </Card>
        ) : null}

        {!isPageLoading && activeTab === 'needs' ? (
          <div className={styles.contentGrid}>
            <Card className={styles.sectionCard}>
              <CardContent className={styles.sectionContent}>
                <div className={styles.sectionHeader}>
                  <Typography variant="h4">{CENTER_DASHBOARD_CONTENT.needs.title}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {CENTER_DASHBOARD_CONTENT.needs.description}
                  </Typography>
                </div>

                <Stack component="form" onSubmit={handleCreateNeed} spacing={2}>
                  <div className={styles.formGrid}>
                    <TextField
                      label={CENTER_DASHBOARD_CONTENT.needs.fields.title}
                      name="title"
                      onChange={handleNeedFieldChange}
                      required
                      value={needForm.title}
                    />
                    <Select
                      name="category"
                      onChange={handleNeedFieldChange}
                      value={needForm.category}
                    >
                      {NEED_CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select
                      name="urgency"
                      onChange={handleNeedFieldChange}
                      value={needForm.urgency}
                    >
                      {NEED_URGENCY_LEVELS.map((urgency) => (
                        <MenuItem key={urgency} value={urgency}>
                          {urgency}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select
                      name="status"
                      onChange={handleNeedFieldChange}
                      value={needForm.status}
                    >
                      {Object.values(NEED_STATUSES).map((status) => (
                        <MenuItem key={status} value={status}>
                          {NEED_STATUS_LABELS[status]}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      label={CENTER_DASHBOARD_CONTENT.needs.fields.requiredQuantity}
                      name="requiredQuantity"
                      onChange={handleNeedFieldChange}
                      required
                      type="number"
                      value={needForm.requiredQuantity}
                    />
                    <TextField
                      label={CENTER_DASHBOARD_CONTENT.needs.fields.unit}
                      name="unit"
                      onChange={handleNeedFieldChange}
                      required
                      value={needForm.unit}
                    />
                  </div>

                  <TextField
                    label={CENTER_DASHBOARD_CONTENT.needs.fields.summary}
                    minRows={3}
                    multiline
                    name="summary"
                    onChange={handleNeedFieldChange}
                    required
                    value={needForm.summary}
                  />

                  <Button
                    disabled={isNeedsSubmitting || !centerId}
                    type="submit"
                    variant="contained"
                  >
                    {CENTER_DASHBOARD_CONTENT.needs.createLabel}
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Card className={styles.sectionCard}>
              <CardContent className={styles.sectionContent}>
                <div className={styles.sectionHeader}>
                  <Typography variant="h4">{CENTER_DASHBOARD_CONTENT.shell.tabs.needs}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {centerId
                      ? CENTER_DASHBOARD_CONTENT.needs.description
                      : CENTER_DASHBOARD_CONTENT.alerts.centerRequired}
                  </Typography>
                </div>

                {!centerId ? (
                  <Alert severity="warning">{CENTER_DASHBOARD_CONTENT.alerts.centerRequired}</Alert>
                ) : needs.length ? (
                  <div className={styles.cardList}>
                    {needs.map((need) => (
                      <article
                        className={`${styles.workspaceCard} ${getNeedCardTone(need.status)}`}
                        key={need.id}
                      >
                        <Stack direction="row" justifyContent="space-between" spacing={1}>
                          <Typography variant="h6">{need.title}</Typography>
                          <Chip
                            color={NEED_STATUS_COLORS[need.status] ?? 'default'}
                            label={NEED_STATUS_LABELS[need.status] ?? need.status}
                            size="small"
                          />
                        </Stack>

                        <Typography color="text.secondary" variant="body2">
                          {need.summary}
                        </Typography>

                        <Typography variant="body2">
                          {need.baseProgress.required} {need.unit}
                        </Typography>

                        <Stack direction="row" spacing={1.25}>
                          <Select
                            onChange={(event) =>
                              setNeedStatusDrafts((current) => ({
                                ...current,
                                [need.id]: event.target.value,
                              }))
                            }
                            size="small"
                            value={needStatusDrafts[need.id] ?? need.status}
                          >
                            {Object.values(NEED_STATUSES).map((status) => (
                              <MenuItem key={status} value={status}>
                                {NEED_STATUS_LABELS[status]}
                              </MenuItem>
                            ))}
                          </Select>

                          <Button
                            disabled={isNeedsSubmitting}
                            onClick={() => handleNeedStatusSave(need.id)}
                            variant="outlined"
                          >
                            {CENTER_DASHBOARD_CONTENT.needs.fields.status}
                          </Button>
                        </Stack>
                      </article>
                    ))}
                  </div>
                ) : (
                  <Alert severity="info">{CENTER_DASHBOARD_CONTENT.needs.emptyMessage}</Alert>
                )}
              </CardContent>
            </Card>
          </div>
        ) : null}

        {!isPageLoading && activeTab === 'donations' ? (
          <Card className={styles.sectionCard}>
            <CardContent className={styles.sectionContent}>
              <div className={styles.sectionHeader}>
                <Typography variant="h4">{CENTER_DASHBOARD_CONTENT.donations.title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {centerId
                    ? CENTER_DASHBOARD_CONTENT.donations.description
                    : CENTER_DASHBOARD_CONTENT.alerts.centerRequired}
                </Typography>
              </div>

              {!centerId ? (
                <Alert severity="warning">{CENTER_DASHBOARD_CONTENT.alerts.centerRequired}</Alert>
              ) : donationCards.length ? (
                <div className={styles.cardList}>
                  {donationCards.map((donation) => (
                    <article
                      className={`${styles.workspaceCard} ${getDonationCardTone(donation.status)}`}
                      key={donation.id}
                    >
                      <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <Typography variant="h6">{donation.needTitle}</Typography>
                        <Chip
                          color={DONATION_STATUS_COLORS[donation.status] ?? 'default'}
                          label={DONATION_STATUS_LABELS[donation.status] ?? donation.status}
                          size="small"
                        />
                      </Stack>

                      <Typography color="text.secondary" variant="body2">
                        {CENTER_DASHBOARD_CONTENT.donations.donorLabel}: {donation.donorName}
                      </Typography>

                      <Typography variant="body2">
                        {donation.amount} {donation.unit}
                      </Typography>

                      {donation.note ? (
                        <Typography color="text.secondary" variant="body2">
                          {CENTER_DASHBOARD_CONTENT.donations.noteLabel}: {donation.note}
                        </Typography>
                      ) : null}

                      <Stack direction="row" spacing={1.25}>
                        <Select
                          onChange={(event) =>
                            setDonationStatusDrafts((current) => ({
                              ...current,
                              [donation.id]: event.target.value,
                            }))
                          }
                          size="small"
                          value={donationStatusDrafts[donation.id] ?? donation.status}
                        >
                          {Object.values(DONATION_STATUSES).map((status) => (
                            <MenuItem key={status} value={status}>
                              {DONATION_STATUS_LABELS[status]}
                            </MenuItem>
                          ))}
                        </Select>

                        <Button
                          disabled={isDonationsSubmitting}
                          onClick={() => handleDonationStatusSave(donation.id)}
                          variant="outlined"
                        >
                          {CENTER_DASHBOARD_CONTENT.donations.saveStatusLabel}
                        </Button>
                      </Stack>
                    </article>
                  ))}
                </div>
              ) : (
                <Alert severity="info">{CENTER_DASHBOARD_CONTENT.donations.emptyMessage}</Alert>
              )}
            </CardContent>
          </Card>
        ) : null}
      </section>
    </main>
  )
}

export default CenterDashboardPage
