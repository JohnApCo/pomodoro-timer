import { useEffect, useState } from "react";
import useSettings from "../hooks/useSettings";

const secondsToHHMMSS = (seconds) => {
  if (seconds < 3600)
    return new Date(seconds * 1000).toISOString().substr(14, 5);

  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const PomodoroTimer = () => {
  const {
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    longBreakInterval,
    shots,
    onResetShots,
    onChangeShots,
  } = useSettings();

  const [countdown, setCountdown] = useState(pomodoroTime * 60);
  /*  const [shots, setShots] = useState(0); */
  const [isRunning, setIsRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState("pomodoro");

  const pomodoroActive = () => {
    if (
      isRunning &&
      !window.confirm(
        "The timer is still running, are you sure you want to switch?"
      )
    ) {
      return;
    }
    setCurrentTimer("pomodoro");
    setCountdown(pomodoroTime * 60);
    setIsRunning(false);
  };

  const shortActive = () => {
    if (
      isRunning &&
      !window.confirm(
        "The timer is still running, are you sure you want to switch?"
      )
    ) {
      return;
    }
    setCurrentTimer("short");
    setCountdown(shortBreakTime * 60);
    setIsRunning(false);
  };

  const longActive = () => {
    if (
      isRunning &&
      !window.confirm(
        "The timer is still running, are you sure you want to switch?"
      )
    ) {
      return;
    }
    setCurrentTimer("long");
    setCountdown(longBreakTime * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const handleChangeTimer = () => {
    if (currentTimer === "pomodoro") {
      onChangeShots();
      if ((shots + 1) % longBreakInterval === 0) {
        setCurrentTimer("long");
        setCountdown(longBreakTime * 60);
      } else {
        setCurrentTimer("short");
        setCountdown(shortBreakTime * 60);
      }
    }
    if (currentTimer === "short") {
      setCurrentTimer("pomodoro");
      setCountdown(pomodoroTime * 60);
    }
    if (currentTimer === "long") {
      setCurrentTimer("pomodoro");
      setCountdown(pomodoroTime * 60);
    }
  };

  return (
    <main className="section">
      <section className="container-sm container--timer">
        <div className="card">
          <div className="button-group">
            <button
              className={`button ${
                currentTimer === "pomodoro" && "button--active"
              }`}
              onClick={pomodoroActive}
            >
              <span className="button__text--timer">Pomodoro</span>
            </button>
            <button
              className={`button ${
                currentTimer === "short" && "button--active"
              }`}
              onClick={shortActive}
            >
              <span className="button__text--timer">Short Break</span>
            </button>
            <button
              className={`button ${
                currentTimer === "long" && "button--active"
              }`}
              onClick={longActive}
            >
              <span className="button__text--timer">Long Break</span>
            </button>
          </div>
          {countdown >= 0 ? (
            <div className="timer">{secondsToHHMMSS(countdown)}</div>
          ) : (
            handleChangeTimer()
          )}

          <div className="row">
            <button
              className="button button--big"
              onClick={
                isRunning ? () => setIsRunning(false) : () => setIsRunning(true)
              }
            >
              {isRunning ? "PAUSE" : "START"}
            </button>
          </div>
        </div>
        <div onClick={onResetShots} className="time-counter">{`#${shots}`}</div>
        <div className="message">Timer for a break!</div>
      </section>
    </main>
  );
};

export default PomodoroTimer;
