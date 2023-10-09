import logo from './logo.svg';
import './App.css';
import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Menu from "./components/Menu";
import Game from "./components/Game"
import Board from "./components/Board"
import {motion, useAnimation} from "framer-motion"

function App() {
  const [num, setNum] = React.useState(5);
  const [isStarted, setIsStarted] = React.useState(false);
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [records, setRecords] = React.useState(
    () => JSON.parse(localStorage.getItem("records")) || []
  );
  const [track, setTrack] = React.useState({ time: 0, roll: 0 });
  // For the rolling effect (that an external button trigger animation for the dices)
  const controlRolling = useAnimation();

  // const [arrow, setArrow] = React.useState('up');
  React.useEffect(() => {
    if (isStarted) setDice(allNewDice());
  }, [isStarted]);
  React.useEffect(() => {
    const diceBtns = document.querySelectorAll(".game__dice-die");
    if (
      dice.every((die) => die.isHeld === true && die.value === dice[0].value)
    ) {
      setTenzies(true);
      if (diceBtns)
        diceBtns.forEach((die) => {
          die.classList.add("die-disabled");
        });
    }
    return () => {
      if (diceBtns)
        diceBtns.forEach((die) => {
          die.classList.remove("die-disabled");
        });
    };
  }, [dice]);

  // Updating records if win
  React.useEffect(() => {
    if (tenzies) {
      // Track the points, compare and then update the record
      // [{dice: 4, time: 2}, {dice: 3, time : 5}]
      let isFound = false;
      const newRecs = records;
      newRecs.forEach((rec) => {
        if (rec.dice === num) {
          isFound = true;
          rec.time = Math.min(track.time, rec.time);
        }
      });
      if (!isFound) newRecs.push({ dice: num, time: track.time });
      setRecords(newRecs);
      localStorage.setItem("records", JSON.stringify(records));
      console.log(records);
    }
  }, [tenzies]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < num; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }
  function rollDice() {
    // New Game
    if (tenzies) {
      // game is done
      setTenzies(false); // reset game conditional var
      setDice(allNewDice()); // faking the setting new Dice to prevent the bug
      // holdDice(dice[0]); // remove the winning codition bug in useEffect
      setIsStarted(false); // return to the menu
      setTrack({ time: 0, roll: 0 });
    }
    // Roll Dice Normallly
    else {
      setDice((prev) =>
        prev.map((die) => {
          return die.isHeld
            ? die
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
              };
        })
      );
      setTrack((prev) => ({ ...prev, roll: prev.roll + 1 }));
    }
  }
  function holdDice(id) {
    setDice((prev) =>
      prev.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceRendered = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      controlRolling={controlRolling}
    />
  ));
  return (
    <main>
      {/* Background */}
      <Menu
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        num={num}
        setNum={setNum}
        rollDice={rollDice}
        setTenzies={setTenzies}
        // arrow={arrow}
        // setArrow={setArrow}
      />
      {isStarted && (
        <motion.div
          className={`game__bg`}
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Game
            diceRendered={diceRendered}
            tenzies={tenzies}
            rollDice={rollDice}
            isStarted={isStarted}
            track={track}
            setTrack={setTrack}
            controlRolling={controlRolling}
          />
          <Board
            records={records}
            num={num}
            track={track}
            setTrack={setTrack}
          />
        </motion.div>
      )}
    </main>
  );
}

export default App;
