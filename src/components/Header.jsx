import styles from './Header.module.css';

import bidLogo from '../assets/bid.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={bidLogo} alt="Logotipo do Dashbid" />
      <h1>Dashbid</h1>
    </header>
  )
}