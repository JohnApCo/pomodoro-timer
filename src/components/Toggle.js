import { useEffect, useState } from "react";

export const Toggle = ({ name, id, toggled, clickHandler }) => {
  const [isToggled, setIsToggle] = useState(toggled);

  const callback = () => {
    setIsToggle(!isToggled);
  };

  useEffect(() => {
    clickHandler(name, isToggled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToggled]);

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
