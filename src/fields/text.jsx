const Text = ({ meta, onMetaChange }) => {
  return (
    <div className="wcforce-field-wrapper">
      <input
        type="text"
        name={meta.name}
        id={meta.name}
        placeholder={meta.title}
        className="wcmore-input"
        onChange={(e) => onMetaChange(e, meta)}
        value={meta.value}
      />
      <br />
      <small>{meta.detail}</small>
    </div>
  );
};

export default Text;
