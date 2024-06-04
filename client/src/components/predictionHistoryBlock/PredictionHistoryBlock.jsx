import React, {useEffect, useState} from 'react';
import {HistoryCard} from "../historyCard/HistoryCard.jsx";
import "./PredictionHistoryBlock.css";

export const PredictionHistoryBlock = () => {
    const [history, setHistory] = React.useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHistory();
        const interval = setInterval(() => {
            fetchHistory();
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:8000/history');
            const json = await response.json();
            setHistory(json)
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    return (
        <div className="prediction-history-block">
            <h2>Prediction History</h2>
            <div className="prediction-history-items">
                {
                    !isLoading && !error && (
                        history.map(history => (
                            <HistoryCard
                                key={history.id}
                                image={history.image}
                                predicted_class={history.predicted_class}
                                timestamp={history.timestamp}
                            />
                        ))
                    )
                }
                {
                    isLoading && (
                        <div className="loader"></div>
                    )
                }
                {
                    error && (
                        <div className="error">{error}</div>
                    )
                }
            </div>
        </div>
    );
};
