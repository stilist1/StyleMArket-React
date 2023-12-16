import React from "react";
import styles from "./AboutUs.module.css";

const AboutUsEl = () => {
    return (
        <div className={styles.aboutUs}>
            <div className={styles.splitContainer}>
                <div className={styles.leftPanel}>
                    <h2>About Us</h2>
                    <p>
                        Welcome to StyleMarket – your go-to platform for tracking cryptocurrency
                        and stock prices. We believe in providing you with accurate and timely
                        information to help you make informed investment decisions.
                    </p>
                </div>
                <div className={styles.verticalLine}></div>
                <div className={styles.rightPanel}>
                    <p>
                        Important Notice: The user is solely responsible for their funds. The site does not provide financial recommendations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export { AboutUsEl };
