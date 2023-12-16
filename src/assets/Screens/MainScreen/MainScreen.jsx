import React, { useEffect, useState } from "react";
import styles from "./AboutUs.module.css";
import { Header } from "../../Components/Header/Header.jsx";
import {CryptoLog} from "../../Components/Crypto_log/CryptoLog.jsx";
import {StocksLine} from "../../Components/StocksLine/StocksLine.jsx";
import { FearGreedChart } from "../../Components/FearGreedChart/FearGreedChart.jsx"; 


const MainScreen = () => {
    const [showRulesPopup, setShowRulesPopup] = useState(false);

    useEffect(() => {
        const hasAgreed = localStorage.getItem("hasAgreed");
        if (!hasAgreed) {
            setShowRulesPopup(true);
        }
    }, []);

    const handleAgree = () => {
        setShowRulesPopup(false);
        localStorage.setItem("hasAgreed", "true");
    };

    const handleDisagree = () => {
        window.location.href = "/AboutUs";
    };

    return (
        <div>
            <div>
                <Header/>
                <StocksLine/>
                <FearGreedChart/>
                <CryptoLog/>
            </div>
            {showRulesPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h3>Welcome to StyleMarket!</h3>
                        <p>
                            Thank you for visiting StyleMarket – your premier platform for
                            tracking cryptocurrency and stock prices.
                        </p>
                        <p>
                            Before you proceed, please review and accept our{" "}
                            <span className={styles.link} onClick={handleAgree}>
                                Terms and Conditions
                            </span>
                            .
                        </p>
                        <div className={styles.buttonContainer}>
                            <button className={styles.agreeButton} onClick={handleAgree}>
                                I Agree
                            </button>
                            <button className={styles.disagreeButton} onClick={handleDisagree}>
                                I Disagree
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MainScreen;
