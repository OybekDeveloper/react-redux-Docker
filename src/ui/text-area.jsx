const TextArea = ({ label, state, setState, height = "100px" }) => {
    return (
        <div className="form-floating mt-2">
            <div className="form-floating">
                <textarea
                    value={state}
                    className="form-control"
                    placeholder={label}
                    id="floatingTextarea"
                    style={{height:height}}
                    onChange={(e) => setState(e.target.value)}
                ></textarea>
                <label htmlFor="floatingTextarea">{label}</label>
            </div>
        </div>
    );
};

export default TextArea;
