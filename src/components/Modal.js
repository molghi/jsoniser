import "./Modal.css";
import { ReactComponent as CloseIcon } from "../img/xmark-solid.svg";

function Modal({ data, onClick }) {
    return (
        <div className="modal-inner">
            <div className="modal-overlay" onClick={onClick}></div>
            <div className="modal-content">
                <div className="modal-title">Preview</div>
                <div className="modal-json">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
                <div className="modal-close" onClick={onClick}>
                    <CloseIcon className="modal-close-icon" />
                </div>
            </div>
        </div>
    );
}

export default Modal;
