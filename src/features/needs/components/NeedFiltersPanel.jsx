import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { DONOR_FEED_CONTENT } from '../../../constants'
import styles from '../../map/styles/DonorMapPage.module.css'

function NeedFiltersPanel({
  categoryOptions,
  cities,
  filterValues,
  onChange,
  onReset,
  proximityOptions,
  statusOptions,
  urgencyOptions,
}) {
  return (
    <Card className={styles.feedSideCard}>
      <CardContent className={styles.feedSideCardContent}>
        <div className={styles.sideCardHeader}>
          <Typography variant="h5">{DONOR_FEED_CONTENT.filters.title}</Typography>
          <Typography color="text.secondary" variant="body2">
            {DONOR_FEED_CONTENT.filters.subtitle}
          </Typography>
        </div>

        <Stack spacing={1.5}>
          <Select displayEmpty name="status" onChange={onChange} value={filterValues.status}>
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <Select displayEmpty name="city" onChange={onChange} value={filterValues.city}>
            <MenuItem value="all">{DONOR_FEED_CONTENT.filters.allOptionLabel}</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>

          <Select
            displayEmpty
            name="category"
            onChange={onChange}
            value={filterValues.category}
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <Select displayEmpty name="urgency" onChange={onChange} value={filterValues.urgency}>
            {urgencyOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <Select
            displayEmpty
            name="proximity"
            onChange={onChange}
            value={filterValues.proximity}
          >
            {proximityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          <Button onClick={onReset} variant="outlined">
            {DONOR_FEED_CONTENT.filters.resetLabel}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default NeedFiltersPanel
