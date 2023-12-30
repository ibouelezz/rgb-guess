import './App.css';

import { useRef, useEffect, useState } from 'react';
import { generateRandomColors, pickColor } from './helpers';

import useSound from 'use-sound';
import success from './assets/success.mp3';
import failure from './assets/failure.mp3';

function App() {
    const squares = useRef([]);
    const header = useRef(null);

    const [successSound] = useSound(success);
    const [failureSound] = useSound(failure);

    const [numSquares, setNumSquares] = useState(6);
    const [isHardMode, setIsHardMode] = useState(true);

    const [colorText, setColorText] = useState('RGB');
    const [resetBtnText, setResetBtnText] = useState('New Colors');
    const [messageText, setMessageText] = useState('');

    let clickedColor = '';
    const [colors, setColors] = useState([]);
    const [pickedColor, setPickedColor] = useState('');

    useEffect(() => {
        setColors(() => generateRandomColors(numSquares));
    }, []);

    useEffect(() => {
        for (let i = 0; i < squares.current.length; i++) {
            if (squares.current[i]) squares.current[i].style.background = colors[i];
        }
    }, [colors]);

    useEffect(() => {
        if (!pickedColor) setPickedColor(() => pickColor(colors));
        if (pickedColor) setColorText(pickedColor);
    }, [colors, pickedColor]);

    useEffect(() => {
        reset();
    }, [numSquares]);

    const changeMode = (mode) => {
        if (mode) {
            // HARD
            setNumSquares(6);
            setIsHardMode(true);
        } else {
            // EASY
            setNumSquares(3);
            setIsHardMode(false);
        }
    };

    const changeColors = (color) => {
        // loop through all squares
        for (let i = 0; i < squares.current.length; i++) {
            //change each color to match given color
            if (squares.current[i]) squares.current[i].style.background = color;
        }
    };

    const reset = () => {
        setColors(() => generateRandomColors(numSquares));
        //pick a new random color from array
        setPickedColor('');
        //reset text fields
        setResetBtnText('New Colors');
        setMessageText('');
        //change colors of squares
        for (let i = 0; i < squares.length; i++) {
            if (colors[i]) {
                squares.current[i].style.display = 'block';
                squares.current[i].style.background = colors[i];
            } else {
                squares.current[i].style.display = 'none';
            }
        }
        header.current.style.background = 'steelblue';
    };

    const onColorClick = (e, i) => {
        // setClickedColor(e.target.style.background);
        clickedColor = e.target.style.background;

        if (clickedColor === pickedColor) {
            setMessageText('Correct!');
            changeColors(clickedColor);
            header.current.style.backgroundColor = clickedColor;
            setResetBtnText('Play Again!');
            successSound();
        } else {
            squares.current[i].style.background = '#494b4f';
            setMessageText('Try Again');
            failureSound();
        }
    };

    return (
        <>
            <h1 ref={(el) => (header.current = el)}>
                The Great
                <br /> <span id="colorDisplay">{colorText}</span> <br />
                Color Game
            </h1>

            <div id="curtain">
                <button onClick={reset}>{resetBtnText}</button>
                <span id="message">{messageText}</span>
                <button onClick={() => changeMode(0)} className={`mode ${!isHardMode && 'selected'}`}>
                    Easy
                </button>
                <button onClick={() => changeMode(1)} className={`mode ${isHardMode && 'selected'}`}>
                    Hard
                </button>
            </div>

            <div id="container">
                {Array(numSquares)
                    .fill(0)
                    .map((_, i) => (
                        <div
                            key={i}
                            className="square"
                            ref={(el) => (squares.current[i] = el)}
                            onClick={(e) => onColorClick(e, i)}
                        ></div>
                    ))}
            </div>
        </>
    );
}

export default App;
