import styles from './dCommonCSS.module.css';

const DNoneLike = () => {
    return (
        <div className={styles.noDeal}>
            <h3>아직 좋아요를 누른 거래글이 없습니다!</h3>
        </div>
    )
}

export default DNoneLike;