import React from "react"
import {motion, useAnimation} from "framer-motion"

export default function Menu(props) {
  // const [isArrowUp, setIsArrowUp] = React.useState(true); 
  const rangeMax = 10;
  const rangeMin = 3;
  function startGame(){
      if (props.num >= rangeMin && props.num<=rangeMax){
        props.setIsStarted(true);
        props.setTenzies(false);
        props.rollDice();
      }
  }
  function chooseNumOfDice(isUp){
      if (isUp && props.num+1 < rangeMax+1){
          props.setNum(prev => prev+1);
      }
      else if (!isUp && props.num-1> rangeMin-1){
          props.setNum(prev => prev-1);
      }
  }
  const control = useAnimation();

  return (
    <motion.div 
      className={`starting__bg `}
      animate={{x: props.isStarted ? -window.innerWidth : 0}}
      transition={{duration: .5}}
    >
      <div className="starting">
        <h3>Choose number of dice: </h3>
        <div className="starting__container">
          {/* Arrow up Button */}
          <motion.button
            disabled={props.num === rangeMax}
            className={`starting__arrow ${props.num===rangeMax && "starting__arrow-disabled"}`}
            onClick={() => {
              chooseNumOfDice(true);
              control.start({
                y: [-100, 0],
                transition: {duration: .3}
              })
            }
            }
            whileHover={{scale: 1.2}}
            whileTap={{scale: .9}}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </motion.button>
          {/* Number box */}
          <motion.div className="starting__numberbox" animate={{scale: [0,1.2,1]}}>
            <motion.div
              // animate={{y: isArrowUp ? [100, 0] : [-100,0]}}
              // transition={{type:"spring", bounce: 0`, duration: .3}}
              // // animate={{y: [100,0]}}
              // // transition={{duration: .5}}
              animate={control}
            >{props.num}</motion.div>
          </motion.div>
          {/* Arrow down button */}
          <motion.button
            disabled={props.num === rangeMin}
            className={`starting__arrow ${props.num===rangeMin && "starting__arrow-disabled"}`}
            onClick={() => {
              chooseNumOfDice(false);
              control.start({
                y: [100, 0],
                transition: { duration: 0.3 },
              });
            }}
            whileHover={{scale: 1.2}}
            whileTap={{scale: .9}}
          >
            <i className="fa-solid fa-arrow-down"></i>
          </motion.button>
        </div>
        <button className="starting__btn" onClick={startGame}>
          Play game
        </button>
      </div>
    </motion.div>
  );
}