import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const defaultSettings = {
  pomodoroTime: "25",
  shortBreakTime: "5",
  longBreakTime: "5",
  autoStartBreak: false,
  autoStartPomodoros: false,
  longBreakInterval: "4",
};

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  onChangePomodoro: () => {},
  onChangeShortBreak: () => {},
  onChangeLongBreak: () => {},
  onToggleAutoStartBreaks: () => {},
  onToggleAutoStartPomodoros: () => {},
  onChangeLongBreakInterval: () => {},
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

  const onChangePomodoroTime = (event) => {
    setSettings({
      ...settings,
      pomodoroTime: event.target.value,
    });
  };

  const onChangeShortBreakTime = (event) => {
    setSettings({
      ...settings,
      shortBreakTime: event.target.value,
    });
  };

  const onChangeLongBreakTime = (event) => {
    setSettings({
      ...settings,
      longBreakTime: event.target.value,
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

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      themeStretch: initialState.themeStretch,
      themeDirection: initialState.themeDirection,
      themeColorPresets: initialState.themeColorPresets,
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
        // Reset Setting
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
