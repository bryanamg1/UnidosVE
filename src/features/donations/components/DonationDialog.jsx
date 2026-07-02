import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DONOR_FEED_CONTENT } from '../../../constants'

function DonationDialog({
  amount,
  isOpen,
  isSubmitting,
  need,
  note,
  onAmountChange,
  onClose,
  onNoteChange,
  onSubmit,
}) {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={isOpen}>
      <DialogTitle>
        {DONOR_FEED_CONTENT.donationDialog.titlePrefix} {need?.title ?? ''}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.25}>
          <Typography color="text.secondary" variant="body2">
            {DONOR_FEED_CONTENT.donationDialog.description}
          </Typography>

          <TextField
            autoFocus
            label={DONOR_FEED_CONTENT.donationDialog.amountLabel}
            onChange={onAmountChange}
            type="number"
            value={amount}
          />

          <TextField
            label={DONOR_FEED_CONTENT.donationDialog.noteLabel}
            minRows={3}
            multiline
            onChange={onNoteChange}
            placeholder={DONOR_FEED_CONTENT.donationDialog.notePlaceholder}
            value={note}
          />

          {need ? (
            <Typography color="text.secondary" variant="caption">
              {need.unit} - {DONOR_FEED_CONTENT.donationDialog.helperSuffix}
            </Typography>
          ) : null}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="text">
          {DONOR_FEED_CONTENT.donationDialog.cancelLabel}
        </Button>
        <Button disabled={isSubmitting || !amount} onClick={onSubmit} variant="contained">
          {DONOR_FEED_CONTENT.donationDialog.submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DonationDialog
