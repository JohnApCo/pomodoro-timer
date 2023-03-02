import { useState } from "react";

export const Toggle = ({ id, toggled, clickHandler }) => {
  const [isToggled, toggle] = useState(toggled);

  const callback = () => {
    toggle(!isToggled);
    clickHandler(!isToggled);
  };

  return (
    <>
      <input
        className="toggle__checkbox"
        id={id}
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
      />
      <label
        style={{ background: isToggled && "rgba(132, 199, 51, 0.8)" }}
        className="toggle__label"
        htmlFor={id}
      >
        <span className={`toggle__button`} />
      </label>
    </>
  );
};
