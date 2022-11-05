import { useState, useEffect } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  wcmore_create_field_title,
  wcmore_get_field_id,
  wcmore_get_input_value,
} from "../common/helper";
import FieldItem from "./field-item";
import FieldModal from "./modal";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

// const QuoteList = React.memo(function QuoteList({ quotes }) {
//   return quotes.map((quote: QuoteType, index: number) => (
//     <Quote quote={quote} index={index} key={quote.id} />
//   ));
// });

function CreateOption({ Meta, SavedFields, onSaveFields, onMediaSelect }) {
  const [SelectedField, setSelectedField] = useState({});
  const [Fields, setFields] = useState([]);
  const [modalMetaOpen, setMetaOpen] = useState(false);

  useEffect(() => {
    setFields(SavedFields);
  }, [SavedFields]);

  function openModal(field) {
    setSelectedField(field);
    setMetaOpen(true);
  }

  function closeModal() {
    setMetaOpen(false);
  }

  const addNewField = (meta) => {
    // A Deep copy of meta object to unlink from Meta Objects
    let field = JSON.parse(JSON.stringify(meta));
    field = { ...field, _id: wcmore_get_field_id(), status: true };
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
    // console.log(selected_field);
    setSelectedField(selected_field);
  };

  // saving single meta values
  const handleFieldMetaSave = () => {
    const fields = [...Fields];
    let found = fields.find((f) => f._id === SelectedField._id);
    const index = fields.indexOf(found);
    fields[index] = SelectedField;
    console.log(fields);
    setFields(fields);
    closeModal();
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

  const handleStatus = (field) => {
    const fields = [...Fields];
    let found = fields.find((f) => f._id === field._id);
    const index = fields.indexOf(found);
    fields[index].status = !field.status;
    setFields(fields);
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const fields = reorder(
      Fields,
      result.source.index,
      result.destination.index
    );

    setFields(fields);
  }
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
        <button onClick={() => onSaveFields(Fields)}>Save Settings</button>
        <button onClick={() => onMediaSelect()}>Call Out</button>
      </div>
      <div className="wcmore-panel right">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="wcmore-field-list">
            {(provided) => (
              <div
                className="wcmore-field-settings"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {Fields.map((field, i) => (
                  <FieldItem
                    key={field._id}
                    field={field}
                    index={i}
                    onOpenModal={openModal}
                    onDelete={handleDelete}
                    onClone={handleClone}
                    onStatus={handleStatus}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {SelectedField.meta !== undefined && (
        <FieldModal
          SelectedField={SelectedField}
          modalMetaOpen={modalMetaOpen}
          onMetaChange={handleMetaChange}
          onFieldMetaSave={handleFieldMetaSave}
          onCloseModal={closeModal}
        />
      )}
    </div>
  );
}

export default CreateOption;
