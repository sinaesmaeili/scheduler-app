import { useState, useRef } from 'react';

export default function useHistory() {
  const [history, setHistory] = useState([]);
  // currentState helps keep track of which point in history to retrieve from
  const currentState = useRef(0);

  const updateHistory = (schedule) => {
    if (history.length != 0)
      currentState.current += 1;
    
    const sliceStart = 0;
    // limiting size of history
    if (history.length > 5)
      sliceStart = 1;

    setHistory([...history.slice(sliceStart, currentState.current), {...structuredClone(schedule)}]);
  }

  const undo = () => {
    if (history.length > 1) {
      currentState.current -= 1;
      const previousSchedule = history[currentState.current];
      return previousSchedule;
    }
  };
  
  const redo = () => {
    if (history.length > 1) {
      currentState.current += 1;
      const currentSchedule = history[currentState.current];
      return currentSchedule;
    }
  };

  return {
    updateHistory,
    undo,
    redo
  }
}