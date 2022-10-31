const Text = ({ meta, onMetaChange }) => {
  return (
    <p>
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
    </p>
  );
};

export default Text;
