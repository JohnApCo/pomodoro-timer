import { useEffect, useState } from "react";
import useSettings from "../hooks/useSettings";
import InputNumber from "./InputNumber";
import Modal from "./Modal";
import { Toggle } from "./Toggle";

const SettingsModal = (props) => {
  const {
    isSettingsOpen,
    closeSettingsModal,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    longBreakInterval,
    autoStartBreak,
    autoStartPomodoros,
    onChangeLongBreakInterval,
    onChangeSetting,
  } = useSettings();

  return (
    <Modal show={isSettingsOpen} title="Settings" onClose={closeSettingsModal}>
      <section className="setting">
        <div className="row setting__title">
          <i className="fa fa-clock icon"></i>
          <h5>Time (minutes)</h5>
        </div>
        <div className="row row--settings">
          <InputNumber
            name="pomodoroTime"
            label="Pomodoro"
            id="session"
            min={1}
            max={60}
            step={1}
            value={pomodoroTime}
            onChange={onChangeSetting}
          />
          <InputNumber
            name="shortBreakTime"
            label="Short Break"
            id="break"
            min={1}
            max={60}
            step={1}
            value={shortBreakTime}
            onChange={onChangeSetting}
          />
          <InputNumber
            name="longBreakTime"
            label="Long Break"
            id="long-break"
            min={1}
            max={60}
            step={1}
            value={longBreakTime}
            onChange={onChangeSetting}
          />
        </div>
        <div className="row row--settings">
          <span className="setting__label"> Auto Start Breaks</span>
          <Toggle
            name="autoStartBreak"
            id="auto-breaks"
            toggled={autoStartBreak}
            clickHandler={onChangeSetting}
          />
        </div>
        <div className="row row--settings">
          <span className="setting__label"> Auto Start Pomodoros</span>
          <Toggle
            name="autoStartPomodoros"
            id="auto-pomodoros"
            toggled={autoStartPomodoros}
            clickHandler={onChangeSetting}
          />
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
      <div className="settings__submit">
        <button
          className="button button--secondary"
          onClick={closeSettingsModal}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;
