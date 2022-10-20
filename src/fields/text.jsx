const Text = ({ meta }) => {
  return (
    <p>
      <input
        type="text"
        name={meta.name}
        id={meta.name}
        placeholder={meta.title}
      />
      <br />
      <small>{meta.detail}</small>
    </p>
  );
};

export default Text;
