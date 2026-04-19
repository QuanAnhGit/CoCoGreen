import { useEffect } from 'react';
import styles from './Landing.module.css';

export function Landing({ onNavigate }) {
    return (
        <div className={styles.landingContainer}>
            <div className={styles.landing}>
                <div>
                    <h1>Chào mừng bạn đến với CoCoGreen</h1>
                    <p>Hành trình đến một tương lai xanh hơn bắt đầu từ đây.</p>
                    <button className={styles.enterBtn} onClick={() => onNavigate('home')}>
                        Khám phá CoCoGreen →
                    </button>
                </div>
            </div>
        </div>
    );
}