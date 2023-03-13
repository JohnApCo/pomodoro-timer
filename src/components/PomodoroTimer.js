import { useEffect, useState } from "react";
import useSettings from "../hooks/useSettings";

const alarmSound = new Audio(
  "https://orangefreesounds.com/wp-content/uploads/2022/05/Clock-sound-effect.mp3"
);

const buttonSound = new Audio(
  "https://www.orangefreesounds.com/wp-content/uploads/2021/04/Button-press-sound-effect.mp3"
);

const PomodoroTimer = () => {
  const {
    /*     pomodoroTime,
    shortBreakTime,
    longBreakTime, */
    longBreakInterval,
    shots,
    onResetShots,
    onChangeShots,
    timerPresets,
    setTimer,
    onChangeTimer,
    lastCount,
    onCloseApp,
  } = useSettings();

  const [countUp, setCountUp] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleClick = (event) => {
    if (
      isRunning &&
      !window.confirm(
        "The timer is still running, are you sure you want to switch?"
      )
    ) {
      return;
    }
    onChangeTimer(event.target.value);
    setCountUp(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCountUp((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const handleChangeTimer = () => {
    setIsRunning(false);

    if (timerPresets === "pomodoro") {
      if ((shots + 1) % longBreakInterval === 0) {
        onChangeShots("long", shots + 1);
      } else {
        onChangeShots("short", shots + 1);
      }
    }
    if (timerPresets === "short") {
      onChangeTimer("pomodoro");
    }
    if (timerPresets === "long") {
      onChangeTimer("pomodoro");
    }
    setTimeout(() => {
      setIsRunning(true);
    }, 1000);
  };

  const handleNext = () => {
    setCountUp(0);
    handleChangeTimer();
  };

  useEffect(() => {
    if (countUp === 0 && isRunning) {
      alarmSound.play();
      handleChangeTimer();
      setTimeout(() => {
        alarmSound.pause();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countUp]);

  const secondsToHHMMSS = (seconds) => {
    if (seconds === 0) {
      setCountUp(0);
    }
    if (seconds < 3600)
      return new Date(seconds * 1000).toISOString().substr(14, 5);

    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  useEffect(() => {
    const handleClose = (event) => {
      event.preventDefault();
      event.returnValue = "";
      if (countUp > 0) {
        onCloseApp(countUp);
      } else {
        onCloseApp(0);
      }
    };
    if (countUp > 0) window.addEventListener("beforeunload", handleClose);
    else window.removeEventListener("beforeunload", handleClose);
    return () => {
      window.removeEventListener("beforeunload", handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countUp]);

  useEffect(() => {
    const setNewCountUp = () => {
      setCountUp(lastCount);
    };
    if (lastCount > 0) {
      setNewCountUp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickTimer = () => {
    setIsRunning((prev) => !prev);
    buttonSound.currentTime = 0;
    buttonSound.play();
  };

  return (
    <main className="section">
      <div className="container-sm container--clock-bar">
        <div
          className="bar"
          style={{ width: `${(100 * countUp) / (setTimer.timeOut * 60)}%` }}
        ></div>
      </div>
      <section className="container-sm container--timer">
        <div className="card">
          <div className="button-group">
            <button
              className={`button button--timer ${
                timerPresets === "pomodoro" && "button--active"
              }`}
              onClick={handleClick}
              value="pomodoro"
            >
              Pomodoro
            </button>
            <button
              className={`button button--timer ${
                timerPresets === "short" && "button--active"
              }`}
              onClick={handleClick}
              value="short"
            >
              Short Break
            </button>
            <button
              className={`button button--timer ${
                timerPresets === "long" && "button--active"
              }`}
              onClick={handleClick}
              value="long"
            >
              Long Break
            </button>
          </div>
          <div id="time-left" className="timer">
            {setTimer.timeOut * 60 - countUp}
          </div>
          <div className="row--buttons">
            <button
              id="start_stop"
              className={`button button--big ${
                isRunning && "button--big--active"
              }`}
              style={{ color: setTimer.color }}
              onClick={handleClickTimer}
            >
              {isRunning ? "PAUSE" : "START"}
            </button>
            {isRunning && (
              <div className="next">
                <button className="next__button" onClick={handleNext}>
                  <i className="fa fa-forward-step"></i>
                </button>
              </div>
            )}
          </div>
        </div>
        <div onClick={onResetShots} className="time-counter">{`#${shots}`}</div>
        <div id="timer-label" className="message">
          {setTimer.message}
        </div>
      </section>
    </main>
  );
};

export default PomodoroTimer;
