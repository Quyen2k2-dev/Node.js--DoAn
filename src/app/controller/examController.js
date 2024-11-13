/* Frontend (React Component cho Nút và Bộ đếm Thời gian) */
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 phút tính bằng giây

    // Logic cho bộ đếm thời gian
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            alert('Bạn đã hết thời gian làm bài!');
        }
    }, [timeLeft]);

    // Xử lý khi bấm nút nộp bài
    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    // Định dạng thời gian dưới dạng mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="App">
            <div className="timer">
                <h2>Thời gian còn lại: {formatTime(timeLeft)}</h2>
            </div>
            <button onClick={handleSubmit} className="submit-button">
                Nộp Bài
            </button>
            {isSubmitted && (
                <div className="submission-message">
                    <h3>Bài làm của bạn đã được nộp!</h3>
                </div>
            )}
        </div>
    );
}

export default App;

/* Backend (Node.js/Express Endpoint) */
const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/submit', (req, res) => {
    // Xử lý logic nộp bài ở đây, ví dụ như lưu dữ liệu vào cơ sở dữ liệu
    res.send({ message: 'Bài làm của bạn đã được nộp!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

/* CSS (App.css) */
// .App {
//   text-align: center;
//   margin-top: 50px;
// }

// .timer {
//   font-size: 24px;
//   margin-bottom: 20px;
// }

// .submit-button {
//   padding: 10px 20px;
//   font-size: 16px;
//   cursor: pointer;
// }

// .submission-message {
//   margin-top: 20px;
//   font-size: 20px;
//   color: green;
// }
