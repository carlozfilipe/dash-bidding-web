import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import {
  House,
  ChartBar,
  Upload,
  Faders,
  Scroll,
} from '@phosphor-icons/react';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Dashbid</h1>
      </div>

      <div className={styles.navbar}>
        <nav>
          <ul>
            <li>
              <Link to="/home">
                <House size={24} />
                Home
              </Link>
            </li>
            <li>
              <Link to="/bidsbynumbers">
                <Scroll size={24} />
                Licitações por Nº de processo
              </Link>
            </li>
            <li>
              <Link to="/bidsbydate">
                <Faders size={24} />
                Licitações por data
              </Link>
            </li>
            <li>
              <Link to="/graphics">
                <ChartBar size={24} />
                Gráficos
              </Link>
            </li>
            <li>
              <Link to="/uploadform">
                <Upload size={24} />
                Upload
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
