const Select = ({ meta, onMetaChange }) => {
  return (
    <p>
      <select
        name={meta.name}
        id={meta.name}
        placeholder={meta.title}
        className="wcmore-input"
        onChange={(e) => onMetaChange(e, meta)}
        value={meta.value}
      >
        {meta.options.map((option) => (
          <option key={option.toString()} value={option}>
            {option}
          </option>
        ))}
      </select>
      <br />
      <small>{meta.detail}</small>
    </p>
  );
};

export default Select;
