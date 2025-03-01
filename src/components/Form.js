import "./Form.css";

function Form() {
    return (
        <div className="form">
            <form className="form__itself">
                <div className="form__input-box">
                    <input className="form__input" id="input-text" type="text" />
                    <label className="form__label" htmlFor="input-text">
                        Enter key names, separated by pipes (<code>|</code>). Example: <code>name | sex | age | city</code>
                    </label>
                </div>
                <div className="form__input-box">
                    <textarea className="form__input form__textarea" id="input-textarea" name="textarea"></textarea>
                    <label className="form__label" htmlFor="input-textarea">
                        Enter values, one per line. No empty lines. Separate categories within a line using <code>|</code>.
                        <span>
                            &nbsp;Example: <code>Mary | female | 25 | Brighton</code>
                        </span>
                    </label>
                </div>
                <div className="form__buttons-box">
                    <button className="form__button form__button--preview" type="button">
                        Preview
                    </button>
                    <button className="form__button form__button--export" type="button">
                        Export
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
