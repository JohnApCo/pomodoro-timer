import { useEffect, useRef, useState } from "react";
import useSettings from "../hooks/useSettings";

const secondsToHHMMSS = (seconds) => {
  if (seconds < 3600)
    return new Date(seconds * 1000).toISOString().substr(14, 5);

  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const PomodoroTimer = () => {
  const { pomodoroTime, shortBreakTime, longBreakTime } = useSettings();

  const [countdown, setCountdown] = useState(pomodoroTime * 60);
  const [shots, setShots] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState("pomodoro");

  const timerRef = useRef();

  function start() {
    setIsRunning(true);
    console.log("start");
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  }

  function pause() {
    setIsRunning(false);
    console.log("pause");
    clearInterval(timerRef.current);
  }
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
    pause();
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
    pause();
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
    pause();
  };

  useEffect(() => {
    if (countdown === 0) {
      setShots((prev) => prev + 1);
      setCountdown(pomodoroTime);
      if (currentTimer === "pomodoro") shortActive();
      if (currentTimer === "short") pomodoroActive();
    }
  }, [countdown, pomodoroTime, currentTimer]);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

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
          <div className="timer">{secondsToHHMMSS(countdown)}</div>
          <div className="row">
            <button
              className="button button--big"
              onClick={isRunning ? pause : start}
            >
              {isRunning ? "PAUSE" : "START"}
            </button>
          </div>
        </div>
        <div className="time-counter">{`#${shots}`}</div>
        <div className="message">Timer for a break!</div>
      </section>
    </main>
  );
};

export default PomodoroTimer;
