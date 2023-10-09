import React from "react";
import {motion} from "framer-motion"

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <motion.div 
      className="game__dice-die" 
      style={styles} 
      onClick={props.holdDice}
      whileTap={{scale:[1,0.9,1], transition: {duration: .3}}}
      animate={!props.isHeld && props.controlRolling}
    >
      {props.value}
    </motion.div>
  );
}
