const randomColor = () => {
    let r = Math.floor(Math.random() * 266);
    let g = Math.floor(Math.random() * 266);
    let b = Math.floor(Math.random() * 266);

    return `rgb(${r}, ${g}, ${b})`;
};

export const generateRandomColors = (num) => {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }

    return arr;
};

export const pickColor = (colors) => {
    const randomColor = Math.floor(Math.random() * colors.length);
    return colors[randomColor];
};
