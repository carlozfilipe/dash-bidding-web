import styles from './ErrorPage.module.css';
import { Header } from '../components/Header';

export function ErrorPage() {
  return (
    <>
      <Header />
      <div className={styles.error}>
        <h1>Página 404 - Not Found </h1>
      </div>
    </>
  );
}
