import styles from './Header.module.css'
import { Link } from 'react-router-dom';

const Header = () =>{
    return(
        <header className={styles.header}>
            <div className={styles.LeftSection}>
                <Link to="/">
                    <button  className={styles.Logo}>StyleMarket</button>
                </Link>
                <Link to="/Exchanges">
                    <button  className={styles.Exchanges}>Exchanges</button>
                </Link>
            </div>
            <div className={styles.RightSection}>
                <switch className={styles.switchTheme}/>
                <Link to="/AboutUs">
                    <button className={styles.About_Us}>About Us</button>
                </Link>
            </div>
        </header>
    )
}

export {Header};