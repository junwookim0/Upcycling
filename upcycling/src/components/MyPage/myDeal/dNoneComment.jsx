import styles from './dCommonCSS.module.css';

const DNoneComment = () => {
    return (
        <div className={styles.noDeal}>
            <h3>아직 작성하신 댓글이 없습니다!</h3>
        </div>
    )
}

export default DNoneComment;