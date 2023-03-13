import "./App.css";
import Header from "./components/Header";
import PomodoroTimer from "./components/PomodoroTimer";
import SettingsModal from "./components/SettingsModal";
import useSettings from "./hooks/useSettings";

// ----------------------------------------------------------------------

function App() {
  const { isSettingsOpen, setTimer } = useSettings();

  return (
    <div className="body" style={{ backgroundColor: setTimer.color }}>
      <Header />
      <PomodoroTimer />
      <SettingsModal show={isSettingsOpen} />
    </div>
  );
}

export default App;
