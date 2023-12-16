import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './StocksLine.module.css';

const StocksLine = () => {
    const [stocks, setStocks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchStockData = async () => {
            const symbols = [
                'NASDAQ',
                'TESLA',
                'S&P 500',
                'APPLE',
                'NFLX',
                'MSFT',
                'GOOGL',
                'AMZN',
                'FB',
                'NVDA',
                'JPM',
            ];

            const stockData = [];

            for (const symbol of symbols) {
                try {
                    let symbolQueryParam = symbol;
                    if (symbol === 'NASDAQ') {
                        symbolQueryParam = '^IXIC';
                    } else if (symbol === 'S&P 500') {
                        symbolQueryParam = '^GSPC';
                    } else if (symbol === 'TESLA') {
                        symbolQueryParam = 'TSLA';
                    } else if (symbol === 'APPLE') {
                        symbolQueryParam = 'AAPL';
                    }

                    const response = await axios.get(`https://yfapi.net/v11/finance/quoteSummary/${symbolQueryParam}`, {
                        params: { modules: 'price' },
                        headers: { 'x-api-key': 'YOUR YFAPI APIKEY' },
                    });

                    const stockInfo = response.data.quoteSummary.result[0].price;
                    stockData.push({
                        symbol: symbol,
                        price: stockInfo.regularMarketPrice.raw,
                        percentChange: stockInfo.regularMarketChangePercent.raw,
                    });
                } catch (error) {
                    console.error(`Error fetching data for ${symbol}:`, error);
                }
            }

            const duplicatedStocks = [...stockData, ...stockData, ...stockData];

            setStocks(duplicatedStocks);
        };

        fetchStockData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % stocks.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [stocks]);

    return (
        <div className={styles.scrollContainer}>
            {stocks.length > 0 && (
                <div className={styles.scrollContent}>
                    {stocks.map((stock, index) => (
                        <div
                            key={index}
                            className={`${styles.stockItem} ${stock.percentChange < 0 ? 'negative' : ''}`}
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                            }}
                        >
                            <div className={styles.stockName}>{stock.symbol}</div>
                            <div className={styles.price}>Price: ${stock.price.toFixed(2)}</div>
                            <div className={styles.change}>Change: {stock.percentChange.toFixed(2)}%</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { StocksLine };
