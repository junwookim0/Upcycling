import React from 'react';
import styles from './footer.module.css'

const Footer = () => {
    return (
        <section className={styles.container}>
            <div >
                Copyright ⓒ uptown All rights reserved
            </div>
            <div className={styles.info_container}>
                <div className={styles.info}>
                    <p>name / aaaa@google.com</p>
                    <p>name / aaaa@google.com</p>
                    <p>name / aaaa@google.com</p>
                </div>
            </div>
        </section>
    );
};

export default Footer;