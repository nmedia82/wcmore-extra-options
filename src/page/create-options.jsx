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

  const addNewField = (meta) => {
    // A Deep copy of meta object to unlink from Meta Objects
    let field = JSON.parse(JSON.stringify(meta));
    field = { ...field, _id: wcmore_get_field_id() };
    const fields = [...Fields, field];
    setFields(fields);
    // const last = fields[fields.length - 1];
    // setSelectedField(field);
    openModal(field);
  };

  const handleMetaChange = (e, setting) => {
    const input_value = wcmore_get_input_value(e);
    setting.value = input_value;
    const selected_field = { ...SelectedField };
    // console.log(selected_field);
    let found = selected_field.meta.find((m) => m.name === setting.name);
    let index = selected_field.meta.indexOf(found);
    selected_field.meta[index] = setting;

    // setting field id
    if (setting.name === "title") {
      found = selected_field.meta.find((m) => m.name === "field_id");
      index = selected_field.meta.indexOf(found);
      selected_field.meta[index].value = input_value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
    }
    console.log(selected_field);
    setSelectedField(selected_field);
  };

  // saving single meta values
  const saveSingleMeta = () => {
    const fields = [...Fields];
    let found = fields.find((f) => f._id === SelectedField._id);
    const index = fields.indexOf(found);
    fields[index] = SelectedField;
    console.log(fields);
    setFields(fields);
    closeModal();
  };

  const getFieldTitle = (field) => {
    let title = "New Field";
    const meta_title = field.meta.find((m) => m.name === "title");
    if (meta_title) {
      title = `${meta_title.value}`;
    }
    return (
      <span>
        {title} <small>{`(${field.label})`}</small>
      </span>
    );
  };

  // deleting field from list
  const handleDelete = (field) => {
    const filter = Fields.filter((f) => f._id !== field._id);
    setFields(filter);
  };

  // cloning field from list
  const handleClone = (field) => {
    const new_field = { ...field, _id: wcmore_get_field_id() };
    // changing new field title
    const field_meta = JSON.parse(JSON.stringify(new_field.meta));
    let found = field_meta.find((m) => m.name === "title");
    const index = field_meta.indexOf(found);
    field_meta[index].value = `Copy of ${field_meta[index].value}`;
    new_field.meta = [...field_meta];
    const fields = [...Fields, new_field];
    setFields(fields);
  };

  // handleMove
  // https://codesandbox.io/s/reorder-draggable-list-array-forked-xtpgch?file=/src/App.js:682-752

  return (
    <div id="wcmore-productoptions">
      <div className="wcmore-panel left">
        <ul className="wcmore-meta-fields">
          {Meta.map((meta, c) => (
            <li key={c} onClick={(e) => addNewField(meta)}>
              {meta.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="wcmore-panel right">
        <div className="wcmore-field-settings">
          {Fields.map((field, i) => (
            <div className="wcmore-field-single" key={`setting${i}`}>
              <span className="wcmore-field-setting label">
                {getFieldTitle(field)}
              </span>
              <span
                className="wcmore-field-setting edit"
                onClick={() => openModal(field)}
              >
                Edit
              </span>
              <span
                className="wcmore-field-setting delete"
                onClick={() => handleDelete(field)}
              >
                Delete
              </span>
              <span
                className="wcmore-field-setting clone"
                onClick={() => handleClone(field)}
              >
                Clone
              </span>
              <span className="wcmore-field-setting move">Move</span>
            </div>
          ))}
        </div>
      </div>
      {SelectedField.meta !== undefined && (
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
            {getFieldTitle(SelectedField)}
          </header>
          <div className="wcmore-field-meta">
            {SelectedField.meta.map((m, j) => (
              <div key={`meta${j}`}>
                <Input meta={m} onMetaChange={handleMetaChange} />
              </div>
            ))}
          </div>
          {/* <button onClick={closeModal}>Cancel</button> */}
          <button onClick={saveSingleMeta}>Save & Close</button>
        </Modal>
      )}
    </div>
  );
}

export default CreateOption;
