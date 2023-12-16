import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import styles from './FearGreedChart.module.css';

const FearGreedChart = () => {
    const [setFearAndGreedIndex] = useState(null);
    const [fearAndGreedData, setFearAndGreedData] = useState([]);
    const [bitcoinPriceData, setBitcoinPriceData] = useState([]);
    const [tooltipData] = useState(null);

    useEffect(() => {
        fetch('https://api.alternative.me/fng/?limit=7')
            .then((response) => response.json())
            .then((data) => {
                setFearAndGreedData(data.data);
                setFearAndGreedIndex(data.data[0].value);
            })
            .catch((error) => console.error("Error fetching Fear & Greed Index:", error));

        fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
            .then((response) => response.json())
            .then((data) => {
                const priceData = data.prices.map(([timestamp, price]) => ({
                    timestamp: new Date(timestamp),
                    price,
                }));
                setBitcoinPriceData(priceData);
            })
            .catch((error) => console.error("Error fetching Bitcoin price data:", error));
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.chart_container} style={{ marginRight: '20px' }}>
                <div className={styles.fear_label}>Fear & Greed Index</div>
                {fearAndGreedData.length > 0 && (
                    <LineChart width={600} height={300} data={fearAndGreedData}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(timestamp) => {
                                const date = new Date(timestamp);
                                return `${date.getMonth() + 1}/${date.getDate()}`;
                            }}
                        />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={{ r: 4 }} />
                    </LineChart>
                )}
            </div>
            <div className={styles.chart_container}>
                <div className={styles.crypto_label}>Bitcoin Price Chart</div>
                {bitcoinPriceData.length > 0 && (
                    <LineChart width={600} height={300} data={bitcoinPriceData}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="timestamp" />
                        <YAxis domain={['dataMin', 'dataMax']} tickFormatter={(value) => value.toFixed(1)} />
                        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" dot={{ r: 4 }} />
                    </LineChart>
                )}
            </div>
            {tooltipData && (
                <div className={styles.custom_tooltip}>
                    <p>Price: ${tooltipData.price.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export { FearGreedChart };
