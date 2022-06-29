import styles from './dCommonCSS.module.css';

const DNoneDeal = () => {
    return (
        <div className={styles.noDeal}>
            <h3>아직 작성하신 거래글이 없습니다!</h3>
        </div>
    )
};

export default DNoneDeal;