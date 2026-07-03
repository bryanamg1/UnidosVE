import React from 'react'
import { Typography, Link } from '@mui/material'
import styles from './Footer.module.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {currentYear} UnidosVE. Desarrollado con el fin de coordinar ayuda humanitaria en Venezuela.
        </Typography>
        <div className={styles.links}>
          <Link href="#" variant="caption" color="text.secondary" underline="hover">
            Términos de servicio
          </Link>
          <Link href="#" variant="caption" color="text.secondary" underline="hover">
            Políticas de privacidad
          </Link>
          <Link href="#" variant="caption" color="text.secondary" underline="hover">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
