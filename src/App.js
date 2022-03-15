import "./styles.css";
import useCountdown from "./hooks/useCountdown";

const DAY = 1 * 24 * 60 * 60 * 1000;

//DD:HH:MM:SS
const millisecondsToDDHHMMSS = (duration: number) => {
  if (isNaN(duration)) {
    return duration;
  } else {
    const sec = Math.round(duration / 1000);
    const day = Math.floor(sec / 3600 / 24);
    const hours = Math.floor(sec / 3600); // get hours
    const minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    const seconds = sec - hours * 3600 - minutes * 60; //  get seconds

    let sDays = `${day}:`;
    let sHours = `${hours}:`;
    let sMinutes = `${minutes}`;
    let sSeconds = `${seconds}`;

    if (hours >= 24) {//24小時制
      var t = hours - Math.floor(hours / 24) * 24;
      sHours = (t < 10 ? '0' + t : t) + ':';
    }

    sDays = zeroFix(day, sDays);
    sHours = zeroFix(hours, sHours);
    sMinutes = zeroFix(minutes, sMinutes);
    sSeconds = zeroFix(seconds, sSeconds)

    return sDays + sHours + sMinutes + ':' + sSeconds;
    // Return is DD:HH:MM:SS
  }
};

//add zero
const zeroFix = (times, timeStr) => {
  return times < 10 ? '0' + timeStr : timeStr;
}
export default function App() {


  const { value, onReset, onStart, onStop, isActive } = useCountdown(
    DAY
    // Date.now() + DAY
  );

  return (
    <div className="App">
      <div className="example">
        <img src="/img/example.gif" alt="" />
      </div>
      <h1>{millisecondsToDDHHMMSS(value)}</h1>
      <button onClick={() => onReset(DAY)} >
        reset
      </button>
      <button onClick={() => onStart(DAY)} disabled={isActive}>
        start
      </button>
      <button onClick={onStop} disabled={!isActive}>
        stop
      </button>
    </div>
  );
}
