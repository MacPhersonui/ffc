import styles from '../styles/layout.module.scss'
import Link from 'next/link'

const Footer = ({ t }) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.copyright}>
                <div className={styles.inner}>
                    <span>© 2022 FFC. All rights reserved.</span>
                    <span>FFC Club.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer