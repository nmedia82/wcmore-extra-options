import { useState, useEffect } from "react";
import Input from "../fields/input";
import Modal from "react-modal";
import { wcmore_get_field_id, wcmore_get_input_value } from "../common/helper";

Modal.setAppElement("#wcmore-root");

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
  },
};

function CreateOption({ Meta, SavedFields }) {
  let subtitle;
  const [SelectedField, setSelectedField] = useState({});
  const [Fields, setFields] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFields(SavedFields);
  }, [SavedFields]);

  function openModal(field) {
    setSelectedField(field);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
    // subtitle.text = SelectedField.label;
  }

  function closeModal() {
    setIsOpen(false);
  }

  const addNewField = (field) => {
    field = { ...field, _id: wcmore_get_field_id() };
    console.log(field);
    const fields = [...Fields, field];
    setFields(fields);
    // const last = fields[fields.length - 1];
    // setSelectedField(field);
    // openModal(last);
  };

  const handleMetaChange = (e, setting) => {
    setting.value = wcmore_get_input_value(e);
    const selected_field = { ...SelectedField };
    // console.log(selected_field);
    let found = selected_field.meta.find((m) => m.name === setting.name);
    const index = selected_field.meta.indexOf(found);
    selected_field.meta[index] = setting;
    console.log(selected_field);
    setSelectedField(selected_field);
  };

  // saving single meta values
  const saveSingleMeta = () => {
    console.log(SelectedField);
    const fields = [...Fields];
    let found = fields.find((f) => f._id === SelectedField._id);
    const index = fields.indexOf(found);
    fields[index] = SelectedField;
    console.log(fields);
    setFields(fields);
  };

  return (
    <div id="wcmore-productoptions">
      <div className="wcmore-panel left">
        <ul className="wcmore-meta-fields">
          {Meta.map((field, c) => (
            <li key={c} onClick={(e) => addNewField(field)}>
              {field.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="wcmore-panel right">
        <div className="wcmore-field-settings">
          {Fields.map((field, i) => (
            <div className="wcmore-field-single" key={`setting${i}`}>
              <span className="wcmore-field-setting label">{field.label}</span>
              <span
                className="wcmore-field-setting edit"
                onClick={() => openModal(field)}
              >
                Edit
              </span>
              <span className="wcmore-field-setting delete">Delete</span>
              <span className="wcmore-field-setting move">Move</span>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {JSON.stringify(SelectedField)}
        <header
          className="wcmore-header"
          ref={(_subtitle) => (subtitle = _subtitle)}
        >
          {SelectedField.label}
        </header>
        <div className="wcmore-field-meta">
          {SelectedField.meta !== undefined &&
            SelectedField.meta.map((m, j) => (
              <div key={`meta${j}`}>
                <Input meta={m} onMetaChange={handleMetaChange} />
              </div>
            ))}
        </div>
        <button onClick={closeModal}>close</button>
        <button onClick={saveSingleMeta}>Save</button>
      </Modal>
    </div>
  );
}

export default CreateOption;
