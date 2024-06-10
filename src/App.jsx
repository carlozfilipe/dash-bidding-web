import styles from './App.module.css';
import './global.css';
import { Header } from './components/Header';
import { Bids } from './components/Bids';
import { BidFilters } from './components/BidFilters';
import { InfoUpload } from './components/InfoUpload';

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Bids />
        <BidFilters />
        <InfoUpload />

        <main></main>
      </div>
    </>
  );
}
