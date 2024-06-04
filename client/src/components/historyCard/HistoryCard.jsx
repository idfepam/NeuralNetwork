import React from 'react';
import "./HistoryCard.css";

function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = {
        year: 365 * 24 * 60 * 60,
        month: 30 * 24 * 60 * 60,
        week: 7 * 24 * 60 * 60,
        day: 24 * 60 * 60,
        hour: 60 * 60,
        minute: 60,
        second: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const value = Math.floor(diffInSeconds / secondsInUnit);
        if (value > 0) {
            return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}

export const HistoryCard = ({image, predicted_class, timestamp}) => {
    return (
        <div className="history-card">
            <div className="history-card-image">
                <img src={`http://localhost:8000/images/${image}`} alt=""/>
            </div>
            <div className="history-card-text">Ethnicity: {predicted_class}</div>
            <div className="history-card-time">{timeAgo(timestamp)}</div>
        </div>
    );
};
