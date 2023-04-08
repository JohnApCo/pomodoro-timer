import { useCallback, useEffect, useRef, useState } from "react";
import useSettings from "../hooks/useSettings";

const buttonSound = new Audio(
  "https://www.orangefreesounds.com/wp-content/uploads/2021/04/Button-press-sound-effect.mp3"
);

const PomodoroTimer = () => {
  const {
    longBreakInterval,
    shots,
    onResetShots,
    onChangeShots,
    timerPresets,
    setTimer,
    onChangeTimer,
    lastCount,
    onCloseApp,
    onResetSetting,
  } = useSettings();

  /*   const [countUp, setCountUp] = useState(0); */
  /* const [isRunning, setIsRunning] = useState(false); */
  const {
    count: [countUp, setCountUp],
    isRunning: [isRunning, setIsRunning],
  } = useSettings();

  const audioRef = useRef(null);
  const [clock, setClock] = useState("00:00");

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
  };

  const handleNext = () => {
    setCountUp(0);
    handleChangeTimer();
  };

  const handleReset = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
    onResetSetting();
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

  useEffect(() => {
    if (countUp === 0 && isRunning) {
      handleChangeTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countUp]);

  const getTime = useCallback(() => {
    if (setTimer.timeOut * 60 < countUp && isRunning) {
      console.log("count => ", countUp);
      setCountUp(0);
      /* alarmSound.play(); */
      audioRef.current.play();
      /* handleChangeTimer(); */
      setTimeout(() => {
        /* alarmSound.pause(); */
        audioRef.current.pause();
      }, 3000);
      setClock(`00:00`);
      return;
    }
    let minutes, seconds;
    minutes = Math.floor((setTimer.timeOut * 60 - countUp) / 60);
    seconds = (setTimer.timeOut * 60 - countUp) % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    setClock(`${minutes}:${seconds}`);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countUp, isRunning, setTimer.timeOut]);

  useEffect(() => {
    getTime();
  }, [getTime]);

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
            {clock}
          </div>
          <div className="row--buttons">
            <div className="timer_button">
              <button
                id="reset"
                className="timer_button__button"
                onClick={handleReset}
              >
                <i className="fa fa-refresh"></i>
              </button>
            </div>
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
            {/* {isRunning && ( */}
            <div className="timer_button">
              <button className="timer_button__button" onClick={handleNext}>
                <i className="fa fa-forward-step"></i>
              </button>
            </div>
            {/* )} */}
          </div>
        </div>
        <div onClick={onResetShots} className="time-counter">{`#${shots}`}</div>
        <div id="timer-label" className="message">
          {setTimer.message}
        </div>
        <audio
          id="beep"
          ref={audioRef}
          src="https://orangefreesounds.com/wp-content/uploads/2022/05/Clock-sound-effect.mp3"
        ></audio>
      </section>
    </main>
  );
};

export default PomodoroTimer;
