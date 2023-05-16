import { useState } from 'react';
import styles from './App.module.css';

function App() {
	const arrSymbols = [
		{ label: '1', onClick: () => addNumber('1') },
		{ label: '2', onClick: () => addNumber('2') },
		{ label: '3', onClick: () => addNumber('3') },
		{ label: '4', onClick: () => addNumber('4') },
		{ label: '5', onClick: () => addNumber('5') },
		{ label: '6', onClick: () => addNumber('6') },
		{ label: '7', onClick: () => addNumber('7') },
		{ label: '8', onClick: () => addNumber('8') },
		{ label: '9', onClick: () => addNumber('9') },
		{ label: '0', onClick: () => addNumber('0') },
		{ label: '+', onClick: () => sum() },
		{ label: '-', onClick: () => sub() },
		{ label: '=', onClick: () => calculateString(value) },
		{ label: 'C', onClick: () => clear() },
	];

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
				{arrSymbols.map((obj) => {
					return (
						<button onClick={obj.onClick} key={obj.label}>
							{obj.label}
						</button>
					);
				})}
			</div>
		</>
	);
}

export default App;
