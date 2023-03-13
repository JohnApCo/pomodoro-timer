import useSettings from "../hooks/useSettings";

const Header = () => {
  const { openSettingsModal, onResetSetting } = useSettings();
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
          <button
            id="reset"
            className="button button--header"
            onClick={onResetSetting}
          >
            <i className="fa fa-refresh icon" />
            <span>Reset</span>
          </button>
        </span>
      </div>
    </header>
  );
};

export default Header;
