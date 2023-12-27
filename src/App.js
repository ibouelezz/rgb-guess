import './App.css';

function App() {
    return (
        <>
            <h1>
                The Great
                <br /> <span id="colorDisplay">RGB</span> <br />
                Color Game
            </h1>

            <div id="curtain">
                <button>New Colors</button>
                <span id="message"></span>
                <button class="mode">Easy</button>
                <button class="mode selected">Hard</button>
            </div>

            <div id="container">
                <div class="square"></div>
                <div class="square"></div>
                <div class="square"></div>
                <div class="square"></div>
                <div class="square"></div>
                <div class="square"></div>
            </div>
        </>
    );
}

export default App;
