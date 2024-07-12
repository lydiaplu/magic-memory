import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";
import './App.css';

const cardImages = [
    { src: "/img/helmet-1.png", matched: false },
    { src: "/img/potion-1.png", matched: false },
    { src: "/img/ring-1.png", matched: false },
    { src: "/img/scroll-1.png", matched: false },
    { src: "/img/shield-1.png", matched: false },
    { src: "/img/sword-1.png", matched: false },
]

function App() {
    // 12 images array inludes the 2 same images, there are matched property shows the images are matched or not
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    // shuffle the 12 images, and reset all the images
    const shuffleCards = () => {
        // get the random sort images and set images id
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index }));

        // set random images
        setCards(shuffledCards);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
        // setDisabled(false);
    }

    const handleChoice = (card) => {
        !choiceOne ? setChoiceOne(card) : setChoiceTwo(card);
    }

    // whenever choiceOne, choiceTwo change, 
    // it will compair the card is same or not
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {

                setCards(prevCards => {
                    return prevCards.map(card =>
                        card.src === choiceOne.src
                            ? { ...card, matched: true }
                            : card
                    )
                })

                resetTurn();
            }
            else {
                setTimeout(() => {
                    resetTurn()
                }, 2000);
            }
        }
    }, [choiceOne, choiceTwo])

    // every load need to get images and render them
    useEffect(() => {
        shuffleCards();
    }, [])

    //
    const resetTurn = () => {
        // turns count + 1
        setTurns(prevTurns => prevTurns + 1);
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
    }

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div className="card-grid">
                {cards.map(card => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleClick={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>

            <p>Turns: {turns}</p>
        </div>
    );
}

export default App;
