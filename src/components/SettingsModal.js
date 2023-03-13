import useSettings from "../hooks/useSettings";
import InputNumber from "./InputNumber";
import Modal from "./Modal";
import { Toggle } from "./Toggle";

const SettingsModal = (props) => {
  const {
    isSettingsOpen,
    closeSettingsModal,
    pomodoroTime,
    onChangePomodoroTime,
    shortBreakTime,
    onChangeShortBreakTime,
    longBreakTime,
    onChangeLongBreakTime,
    longBreakInterval,
    onChangeLongBreakInterval,
  } = useSettings();
  const logState = (state) => {
    console.log("Toggled:", state);
  };
  return (
    <Modal show={isSettingsOpen} title="Settings" onClose={closeSettingsModal}>
      <section className="setting">
        <div className="row setting__title">
          <i className="fa fa-clock icon"></i>
          <h5>Time (minutes)</h5>
        </div>
        {/*         <div className="row row--settings">
          <div className="timer-item">
            <label
              id="session-label"
              className="timer-item__label"
              htmlFor="pomodoro"
            >
              Pomodoro
            </label>
            <input
              className="setting__input"
              type="number"
              name="pomodoro"
              id="pomodoro"
              min={0}
              step={1}
              value={pomodoroTime}
              onChange={onChangePomodoroTime}
            />
          </div>
          <div className="timer-item">
            <label
              id="break-label"
              className="timer-item__label"
              htmlFor="short-break"
            >
              Short Break
            </label>
            <input
              className="setting__input"
              type="number"
              name="short-break"
              id="short-break"
              min={0}
              step={1}
              value={shortBreakTime}
              onChange={onChangeShortBreakTime}
            />
          </div>
          <div className="timer-item">
            <label className="timer-item__label" htmlFor="long-break">
              Long Break
            </label>
            <input
              className="setting__input"
              type="number"
              name="long-break"
              id="long-break"
              min={0}
              step={1}
              value={longBreakTime}
              onChange={onChangeLongBreakTime}
            />
          </div>
        </div> */}
        <div className="row row--settings">
          <InputNumber
            label="Pomodoro"
            id="session"
            min={0}
            step={1}
            value={pomodoroTime}
            onChange={onChangePomodoroTime}
          />
          <InputNumber
            label="Short Break"
            id="break"
            min={0}
            step={1}
            value={shortBreakTime}
            onChange={onChangeShortBreakTime}
          />
          <InputNumber
            label="Long Break"
            id="long-break"
            min={0}
            step={1}
            value={longBreakTime}
            onChange={onChangeLongBreakTime}
          />
        </div>
        <div className="row row--settings">
          <span className="setting__label"> Auto Start Breaks</span>
          <Toggle id="auto-breaks" toggled={true} clickHandler={logState} />
        </div>
        <div className="row row--settings">
          <span className="setting__label"> Auto Start Pomodoros</span>
          <Toggle id="auto-pomodoros" toggled={true} clickHandler={logState} />
        </div>
        <div className="row row--settings">
          <span className="setting__label"> Long Break Interval</span>
          <input
            className="setting__input setting__input--sm"
            name="long-interval"
            id="long-interval"
            type="number"
            min={1}
            step={1}
            value={longBreakInterval}
            onChange={onChangeLongBreakInterval}
          />
        </div>
      </section>
    </Modal>
  );
};

export default SettingsModal;
