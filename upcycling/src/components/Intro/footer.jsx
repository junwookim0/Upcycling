import React from 'react';
import styles from './footer.module.css'

const Footer = () => {
    return (
        <section className={styles.container}>
            <div className={styles.info_container}>
                <div className={styles.info}>
                    <p>name / aaaa@google.com</p>
                    <p>name / aaaa@google.com</p>
                    <p>name / aaaa@google.com</p>
                    <br/>
                </div>
                <div className={styles.copy}>
                    <p>Copyright ⓒ uptown All rights reserved</p>
                </div>
            </div>
        </section>
    );
};

export default Footer;