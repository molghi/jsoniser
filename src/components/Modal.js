import "./Modal.css";

function Modal({ data }) {
    console.log(data);
    return (
        <div className="modal-inner">
            <div className="modal-overlay"></div>
            <div className="modal-content">
                <div className="modal-title">Preview</div>
                <div className="modal-json">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
                <div className="modal-close">𝖷</div>
            </div>
        </div>
    );
}

export default Modal;
