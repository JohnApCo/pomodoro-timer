import PropTypes from "prop-types";
import { useEffect } from "react";

const Modal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.keyCode || e.charCode) === 27) {
      props.onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", closeOnEscapeKeyDown);
    return () => {
      document.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`modal ${props.show ? "show" : ""}`}
      onClick={props.onClose}
    >
      <div
        className="modal__content container-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h4 className="modal__title">{props.title}</h4>
        </div>
        <div className="modal__body">{props.children}</div>
        <div className="modal__footer">
          <button className="button button--secondary" onClick={props.onClose}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
