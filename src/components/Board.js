import React, { useEffect } from "react"

export default function Board(props){
    function recordTime(){
        let best = -1;
        props.records.forEach(rec => {
            if (props.num === rec.dice) best = rec.time;
        })
        return (best===-1) ? "NaN" : `${best}s`
    }
    
    return (
      <div className="board">
        <div className="board__time">
          <h3>Time</h3>
          <h1>{props.track.time}s</h1>
        </div>
        <div className="board__rolls">
          <h3>Rolls</h3>
          <h1>{props.track.roll}</h1>
        </div>
        <div className="board__best">
          <p>
            Best time <i className="fa-solid fa-crown"></i> on {props.num} dice: {recordTime()}
          </p>
        </div>
      </div>
    );
}