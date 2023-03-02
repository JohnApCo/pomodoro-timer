import "./App.css";
import Header from "./components/Header";
import PomodoroTimer from "./components/PomodoroTimer";
import SettingsModal from "./components/SettingsModal";
import useSettings from "./hooks/useSettings";

// ----------------------------------------------------------------------

function App() {
  const { isSettingsOpen } = useSettings();
  return (
    <>
      <Header />
      <PomodoroTimer />
      <SettingsModal show={isSettingsOpen} />
    </>
  );
}

export default App;
