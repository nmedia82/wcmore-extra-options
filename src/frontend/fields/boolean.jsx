const Boolean = ({ meta, onMetaChange }) => {
  return (
    <div className="wcforce-field-wrapper">
      <label>
        <input
          type="checkbox"
          name={meta.name}
          id={meta.name}
          onChange={(e) => onMetaChange(e, meta)}
          checked={meta.value}
        />{" "}
        {meta.title} <br />
        <small>{meta.detail}</small>
      </label>
    </div>
  );
};

export default Boolean;
