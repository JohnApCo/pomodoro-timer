import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultSettings = {
  pomodoroTime: "25",
  shortBreakTime: "5",
  longBreakTime: "5",
  autoStartBreak: false,
  autoStartPomodoros: false,
  longBreakInterval: "4",
  shots: 0,
  timerPresets: "pomodoro",
  lastCount: 0,
};

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  onChangePomodoro: () => {},
  onChangeShortBreak: () => {},
  onChangeLongBreak: () => {},
  onToggleAutoStartBreaks: () => {},
  onToggleAutoStartPomodoros: () => {},
  onChangeShots: () => {},
  onResetShots: () => {},
  onChangeTimer: () => {},
  setTimer: {
    name: "pomodoro",
    time: "00",
    color: "#2065D1",
  },
  onCloseApp: () => {},
};

const SettingsContext = createContext(initialState);

function SettingsProvider({ children }) {
  const [isSettingsOpen, setIsSettingOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [settings, setSettings] = useLocalStorage("settings", {
    pomodoroTime: initialState.pomodoroTime,
    shortBreakTime: initialState.shortBreakTime,
    longBreakTime: initialState.longBreakTime,
    autoStartBreak: initialState.autoStartBreak,
    autoStartPomodoros: initialState.autoStartPomodoros,
    longBreakInterval: initialState.longBreakInterval,
    shots: initialState.shots,
    timerPresets: initialState.timerPresets,
    lastCount: initialState.lastCount,
  });

  const openSettingsModal = () => {
    setIsSettingOpen(true);
  };
  const closeSettingsModal = () => {
    setIsSettingOpen(false);
  };

  const openInfoModal = () => {
    setIsInfoOpen(true);
  };
  const closeInfoModal = () => {
    setIsInfoOpen(false);
  };

  const onChangePomodoroTime = (newValue) => {
    setSettings({
      ...settings,
      pomodoroTime: newValue,
    });
  };

  const onChangeShortBreakTime = (newValue) => {
    setSettings({
      ...settings,
      shortBreakTime: newValue,
    });
  };

  const onChangeLongBreakTime = (newValue) => {
    setSettings({
      ...settings,
      longBreakTime: newValue,
    });
  };

  const onChangeLongBreakInterval = (event) => {
    setSettings({
      ...settings,
      longBreakInterval: event.target.value,
    });
  };

  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    });
  };

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === "light" ? "dark" : "light",
    });
  };

  const onChangeShots = (newTimer, newShots) => {
    setSettings({
      ...settings,
      timerPresets: newTimer,
      shots: newShots,
    });
  };

  const onResetSetting = () => {
    setSettings({
      pomodoroTime: initialState.pomodoroTime,
      shortBreakTime: initialState.shortBreakTime,
      longBreakTime: initialState.longBreakTime,
      autoStartBreak: initialState.autoStartBreak,
      autoStartPomodoros: initialState.autoStartPomodoros,
      longBreakInterval: initialState.longBreakInterval,
      shots: initialState.shots,
      timerPresets: initialState.timerPresets,
      lastCount: initialState.lastCount,
    });
  };

  const onResetShots = () => {
    if (window.confirm("Do you want to refresh the pomodoro count?")) {
      setSettings({
        ...settings,
        shots: initialState.shots,
      });
    }
  };

  const onChangeTimer = (newValue) => {
    setSettings({
      ...settings,
      timerPresets: newValue,
    });
  };

  const timerPresets = [
    {
      name: "pomodoro",
      timeOut: settings.pomodoroTime,
      color: "rgb(57 112 151)",
      message: "Time to focus!",
    },
    {
      name: "short",
      timeOut: settings.shortBreakTime,
      color: "rgb(56 133 138)",
      message: "Time for a break!",
    },
    {
      name: "long",
      timeOut: settings.longBreakTime,
      color: "rgb(125 83 162)",
      message: "Time for a break!",
    },
  ];

  const pomodoroPreset = timerPresets[0];
  const shortPreset = timerPresets[1];
  const longPreset = timerPresets[2];

  function getColorPresets(presetsKey) {
    return {
      pomodoro: pomodoroPreset,
      short: shortPreset,
      long: longPreset,
    }[presetsKey];
  }

  const onCloseApp = (value) => {
    setSettings({
      ...settings,
      lastCount: value,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        //modals
        isSettingsOpen,
        openSettingsModal,
        closeSettingsModal,
        isInfoOpen,
        openInfoModal,
        closeInfoModal,
        //TimeSettings
        onChangePomodoroTime,
        onChangeShortBreakTime,
        onChangeLongBreakTime,
        onChangeLongBreakInterval,
        // Mode
        onChangeMode,
        onToggleMode,
        onChangeShots,
        // Reset Setting
        onResetSetting,
        onResetShots,
        setTimer: getColorPresets(settings.timerPresets),
        onChangeTimer,
        onCloseApp,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
