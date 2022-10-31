const Boolean = ({ meta, onMetaChange }) => {
  return (
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
  );
};

export default Boolean;
