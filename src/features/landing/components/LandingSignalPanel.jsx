import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import RadarRoundedIcon from '@mui/icons-material/RadarRounded'
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded'
import { Chip, Typography } from '@mui/material'
import { LANDING_CONTENT } from '../../../constants'
import styles from '../styles/LandingPage.module.css'

const CARD_ICONS = [
  RadarRoundedIcon,
  VolunteerActivismRoundedIcon,
  PlaceRoundedIcon,
]

function LandingSignalPanel({ cards }) {
  return (
    <section className={styles.signalPanel}>
      <div className={styles.signalHeader}>
        <Typography className={styles.signalEyebrow} variant="overline">
          {LANDING_CONTENT.signalPanel.badge}
        </Typography>
        <Typography variant="h5">
          {LANDING_CONTENT.signalPanel.title}
        </Typography>
      </div>

      <div className={styles.signalCanvas}>
        <div className={`${styles.signalOrbit} animatedOrbit`} />
        <div className={styles.signalGrid}>
          {cards.map((card, index) => {
            const Icon = CARD_ICONS[index] ?? RadarRoundedIcon

            return (
              <article key={card.title} className={styles.signalCard}>
                <div className={styles.signalCardHeader}>
                  <span className={`${styles.signalIcon} ${index === 0 ? 'animatedPulse' : ''}`}>
                    <Icon fontSize="small" />
                  </span>
                  <Chip color="primary" label={card.status} size="small" />
                </div>

                <Typography className={styles.signalCardEyebrow} variant="overline">
                  {card.eyebrow}
                </Typography>

                <Typography variant="h6">{card.title}</Typography>

                <Typography color="text.secondary" variant="body2">
                  {card.detail}
                </Typography>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default LandingSignalPanel
