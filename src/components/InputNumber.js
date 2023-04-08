const InputNumber = ({ id, name, label, min, max, step, value, onChange }) => {
  let NumberValue = Number(value);
  const decrement = () => {
    if (NumberValue <= min) {
      return;
    }
    onChange(name, NumberValue - step);
  };

  const increment = () => {
    if (NumberValue >= max) {
      return;
    }
    onChange(name, NumberValue + step);
  };
  return (
    <div id={`${id}-label`} style={{ flexBasis: "100%", textAlign: "center" }}>
      <div>{label}</div>
      <div className="input-number">
        <button
          id={`${id}-decrement`}
          className="input-number__button"
          onClick={decrement}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <span id={`${id}-length`} className="input-number__input">
          {NumberValue}
        </span>
        <button
          id={`${id}-increment`}
          className="input-number__button"
          onClick={increment}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default InputNumber;
