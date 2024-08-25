import './FormGroup.css';

const FormGroup = (props) => {
    const {label, placeholder, name, set, value} = props;
    return (
        <div className="form-group">
            <label htmlFor="name">{label}</label>
            <div className="border form-border">
            <div className="inside">
                <input 
                placeholder={placeholder} 
                type="text" 
                name={name}
                onChange={(event) => set(event.target.value)}
                value={value}
                />
            </div>
            </div>
        </div>
    )
}

export default FormGroup;