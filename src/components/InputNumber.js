import PropTypes from "prop-types";

const InputNumber = ({ id, label, min, max, step, value, onChange }) => {
  /* const [val, setVal] = useState(value); */
  let NumberValue = Number(value);
  const decrement = () => {
    if (NumberValue <= 1) {
      return;
    }
    onChange(NumberValue - 1);
  };

  const increment = () => {
    if (NumberValue >= 60) {
      return;
    }
    onChange(NumberValue + 1);
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

InputNumber.propTypes = {
  /*   value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired, */
};
export default InputNumber;
