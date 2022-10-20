const Boolean = ({ meta }) => {
  return (
    <label>
      <input type="checkbox" name={meta.name} id={meta.name} /> {meta.title}
    </label>
  );
};

export default Boolean;
