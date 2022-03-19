import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [time, setTime] = useState(0);
	const [isStart, setIsStart] = useState(false);
	const [laps, setLaps] = useState<number[]>([]);

	useEffect(() => {
		let timeId: any;
		if (isStart) {
			timeId = window.setInterval(() => {
				setTime(prevtime => prevtime + 1);
			}, 100);
		}

		return () => {
			console.log('clear');
			clearInterval(timeId);
		};
	}, [isStart]);

	return (
		<div className='App'>
			<h1>{time}</h1>
			<div>
				{isStart && time > 0 && (
					<button type='button' onClick={() => setLaps([...laps, time])}>
						Lap
					</button>
				)}
				{isStart && <button onClick={() => setIsStart(false)}>pause</button>}
				{!isStart && time > 0 && <button onClick={() => setIsStart(true)}>resume</button>}
				{!isStart && time === 0 && <button onClick={() => setIsStart(true)}>start</button>}
				{!isStart && time > 0 && (
					<button
						onClick={() => {
							setLaps([]);
							setTime(0);
						}}
					>
						reset
					</button>
				)}
			</div>
			<ul style={{ width: '500px', margin: '20px auto' }}>
				{laps.map((lap, i) => (
					<li key={i}>{lap}</li>
				))}
				{isStart && laps.length === 0 && <p>No laps yet</p>}
			</ul>
		</div>
	);
}

export default App;
