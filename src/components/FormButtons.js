function FormButtons({ onPreviewClick }) {
    return (
        <div className="form__buttons-box">
            <button className="form__button form__button--preview" type="button" onClick={onPreviewClick}>
                Preview
            </button>
            <button className="form__button form__button--export" type="submit">
                Export
            </button>
        </div>
    );
}

export default FormButtons;
