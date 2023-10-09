import React from "react"
import Confetti from "react-confetti";
import {motion} from "framer-motion"


export default function Game(props) {
  React.useEffect(() => {
    let timeID = '';
    if (!props.tenzies){
      timeID = setInterval(() => {
        props.setTrack((prev) => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
    }
    return () => {
      clearInterval(timeID);
      // Compare with the record, update to state and 
      // props.setTrack(prev => ({time: 0, roll: 0}))
    }
  }, [props.tenzies]);
  const headerVariants = {
    winning:{
      scale: [1,1.2,1],
      rotate: [0,30,-30,30,0],
      transition: {duration: 1.5}
    }
  }
  return (
    <div  
      // animate={{opacity: [0,1]}}
      // transition={{delay: 1}}
    >
      {props.tenzies && <Confetti className="confetti" />}
      <div className="game">
        <motion.h1 
          className="game__header"
          variants={headerVariants}
          animate={`${props.tenzies && "winning"}`}
          // animate={}
        >Tenzies</motion.h1>
        <motion.p 
          className="game__decs"
          animate={{scale:[0,1]}}
          transition={{duration: 1}}
        >
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </motion.p>
        <div className="game__dice">{props.diceRendered}</div>
        {/* Rolling Button */}
        <button 
          className="game__btn" 
          onClick={() => {
            props.rollDice();
            props.controlRolling.start({
              rotate: [0,360],
              transition:{duration: .15}
            })
          }}
        >
          {props.tenzies ? "New game" : "Roll"}
        </button>
      </div>
    </div>
  );
}