import React, { useState, useEffect } from 'react';
import styles from './Exchange.module.css';

const Exchange = () => {
    const [cryptoOptions, setCryptoOptions] = useState([]);
    const [fromCrypto, setFromCrypto] = useState('');
    const [toCrypto, setToCrypto] = useState('');
    const [amount, setAmount] = useState(0);
    const [exchangeResult, setExchangeResult] = useState(0);

    useEffect(() => {
        const fetchCryptoOptions = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
                const data = await response.json();
                setCryptoOptions(data);
            } catch (error) {
                console.error('Error fetching crypto options:', error);
            }
        };

        fetchCryptoOptions();
    }, []);

    useEffect(() => {
        const handleExchange = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCrypto},${toCrypto}&vs_currencies=usd`);
                const data = await response.json();
                const fromCryptoPrice = data[fromCrypto].usd;
                const toCryptoPrice = data[toCrypto].usd;
                const result = (amount * fromCryptoPrice) / toCryptoPrice;
                setExchangeResult(result.toFixed(3));
            } catch (error) {
                console.error('Error fetching exchange data:', error);
            }
        };

        if (fromCrypto && toCrypto && amount !== null) {
            handleExchange();
        }
    }, [fromCrypto, toCrypto, amount]);

    const handleSwap = () => {
        const temp = fromCrypto;
        setFromCrypto(toCrypto);
        setToCrypto(temp);
    };

    return (
        <div className={styles.containerEx}>
            <h2>Crypto Exchange</h2>
            <div className={styles.cryptoInputs}>
                <div className={styles.cryptoSelectContainer}>
                    <label>From Crypto:</label>
                    <select className={styles.cryptoSelect} value={fromCrypto} onChange={(e) => setFromCrypto(e.target.value)}>
                        {cryptoOptions.map((crypto) => (
                            <option key={crypto.id} value={crypto.id}>
                                {crypto.name} <img src={crypto.image} alt={crypto.name} height="20" width="20" />
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.amountInputContainer}>
                    <label>Amount:</label>
                    <input className={styles.amountInput} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
            </div>
            <div className={styles.swapButtonContainer}>
                <button className={styles.swapButton} onClick={handleSwap}>&#8644;</button>
            </div>
            <div className={styles.cryptoInputs}>
                <div className={styles.cryptoSelectContainer}>
                    <label>To Crypto:</label>
                    <select className={styles.cryptoSelect} value={toCrypto} onChange={(e) => setToCrypto(e.target.value)}>
                        {cryptoOptions.map((crypto) => (
                            <option key={crypto.id} value={crypto.id}>
                                {crypto.name} <img src={crypto.image} alt={crypto.name} height="20" width="20" />
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.amountInputContainer}>
                    <label>Exchange Result:</label>
                    <input className={styles.amountInput} type="text" value={exchangeResult} readOnly />
                </div>
            </div>

        </div>
    );
};

export { Exchange };