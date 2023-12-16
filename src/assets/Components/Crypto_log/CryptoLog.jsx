import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CryptoLog.module.css';

const CryptoLog = () => {
    const [cryptoData, setCryptoData] = useState([]);

    const fetchCryptoData = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 15,
                    page: 1,
                    sparkline: false,
                },
            });
            setCryptoData(response.data);
        } catch (error) {
            console.error('Error loading cryptocurrency data', error);
        }
    };

    useEffect(() => {
        fetchCryptoData();

        const interval = setInterval(() => {
            fetchCryptoData();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.CryptoLogContainer}>
            <table className={styles.CryptoTable}>
                <thead>
                    <tr>
                        <th>Crypto name</th>
                        <th>Price</th>
                        <th>Capitalization</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptoData.map((crypto, index) => (
                        <tr key={index}>
                            <td>
                                <div>
                                    <img src={crypto.image} alt={crypto.name} />
                                    {crypto.name}
                                </div>
                            </td>
                            <td>${crypto.current_price}</td>
                            <td>${crypto.market_cap}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { CryptoLog };