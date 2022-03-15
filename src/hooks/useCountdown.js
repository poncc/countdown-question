import React from 'react';
import { createIf } from 'typescript';
/**
  * @param {number} endTime timestamp
  * @returns {
  *   onReset: ()=>void;
  *   onStart: ()=>void;
  *   onStop: ()=>void;
  *   value: string; // DD:hh:mm:ss ,when expired, return 'timeup';
  *   isActive: boolean;
  * }
 */

export default function useCountdown(endTime) {
  const [value, setValue] = React.useState(endTime);
  const [isActive, setActive] = React.useState(true);
  const endMsg = 'timeup';
  React.useEffect(() => {
    // console.log('useEffect = ' + value);
    if (isActive) {
      const intervalId = setInterval(() => {
        setValue((calTime) => {
          if (calTime > 0) {
            return calTime - 100;
          } else {
            setActive(false)
            return endMsg;
          }
        });
      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isActive]);

  const onReset = (startTime) => {
    setValue(startTime);
    setActive(true);
  }
  const onStart = (startTime) => {
    if (value == endMsg) {
      setValue(startTime);
    }
    setActive(!isActive);
  }
  const onStop = () => {
    setActive(!isActive);
  }

  return {
    value,
    onReset,
    onStart,
    onStop,
    isActive,
  }
}
