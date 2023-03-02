import useSettings from "../hooks/useSettings";

const Header = () => {
  const { openSettingsModal } = useSettings();
  return (
    <header className="header">
      <div className="container-sm container--header">
        <h1 className="logo">
          <i className="fa fa-code icon"></i>
          JohnApCo
        </h1>
        <span className="row">
          <button className="button button--header" onClick={openSettingsModal}>
            <i className="fa fa-gear icon" />
            <span>Setting</span>
          </button>
          <button className="button button--header">
            <i className="fa fa-circle-info icon" />
            <span>Info</span>
          </button>
        </span>
      </div>
      <div className="container-sm container--clock-bar">
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;
