import { BarChartBids } from '../components/Graphics/BarChartBids';
import { PieChartBids } from '../components/Graphics/PieChartBids';
import { PieChartBidsUnit } from '../components/Graphics/PieChartBidsUnit';
import styles from './ShowGraphs.module.css';

export function ShowGraphs() {
  return (
    <div className={styles.container}>
      <div className={styles.charts}>
        <BarChartBids />
      </div>
      <div className={styles.charts}>
        <PieChartBidsUnit />
      </div>
      <div className={styles.charts}>
        <PieChartBids />
      </div>
    </div>
  );
}
