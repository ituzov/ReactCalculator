import { useState } from 'react';
import styles from './App.module.css';

function App() {
	const arrNumbers = Array.from({ length: 10 }, (_, i) => i);

	const [value, setValue] = useState('0');
	const [newOperation, setNewOperation] = useState(false);
	const sum = () => {
		if (!value.endsWith(' + ') && !value.endsWith(' - ')) {
			setValue(value + ' + ');
			setNewOperation(false);
		}
	};

	const sub = () => {
		if (!value.endsWith(' + ') && !value.endsWith(' - ')) {
			setValue(value + ' - ');
			setNewOperation(false);
		}
	};

	const clear = () => {
		setValue('0');
		setNewOperation(false);
	};

	const addNumber = (item) => {
		if (newOperation) {
			setValue(item.toString());
			setNewOperation(false);
		} else {
			setValue(value === '0' ? item.toString() : value + item.toString());
			setNewOperation(false);
		}
	};

	const calculateString = (str) => {
		str = str.trim().replace(/\s+/g, '');

		const addSubExpressions = str.split('+').map((exp) => exp.split('-'));
		const result = addSubExpressions.reduce((acc, addSubExp, index) => {
			const sum = addSubExp.reduce((acc2, num, index2) => {
				return acc2 + (index2 === 0 ? Number(num) : -Number(num));
			}, 0);

			return acc + (index === 0 ? sum : +sum);
		}, 0);

		setValue(result.toString());
		setNewOperation(true);
	};

	return (
		<>
			<div
				className={styles.display}
				style={{ backgroundColor: newOperation ? 'green' : '#000' }}
			>
				{value}
			</div>
			<div className={styles.container}>
				{arrNumbers.map((item) => {
					return (
						<button onClick={() => addNumber(item)} key={item}>
							{item}
						</button>
					);
				})}
				<button onClick={sum}>+</button>
				<button onClick={sub}>-</button>
				<button
					onClick={() => {
						calculateString(value);
					}}
				>
					=
				</button>
				<button onClick={clear}>C</button>
			</div>
		</>
	);
}

export default App;
