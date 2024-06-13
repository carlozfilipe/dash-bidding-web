import styles from './App.module.css';
import './global.css';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';


export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
    </>
  );
}
