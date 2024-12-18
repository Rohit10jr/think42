const FormInput = ({ label, type, id, value, onChange, required = false }) => (
    <div className="input-container">
      <label className="input-label" htmlFor={id}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        id={id}
        className="input-field"
        value={value}
        onChange={onChange}
      />
    </div>
  );
  