import { Draggable } from "react-beautiful-dnd";
import { wcmore_create_field_title } from "../common/helper";

function FieldItem({ field, index, onOpenModal, onDelete, onClone, onStatus }) {
  const getStatus = (field) => {
    const status = field.status ? (
      <small className="wcmore-status on">ON</small>
    ) : (
      <small className="wcmore-status off">OFF</small>
    );

    return status;
  };

  const getContainerClass = (field) => {
    let class_name = "wcmore-field-single";
    class_name += ` status-${field.status}`;
    return class_name;
  };

  return (
    <Draggable draggableId={field._id} index={index} key={field._id}>
      {(provided) => (
        <div
          className={getContainerClass(field)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span className="wcmore-field-setting label">
            {wcmore_create_field_title(field)}
          </span>
          <span
            className="wcmore-field-setting edit"
            onClick={() => onOpenModal(field)}
          >
            Edit
          </span>
          <span
            className="wcmore-field-setting delete"
            onClick={() => onDelete(field)}
          >
            Delete
          </span>
          <span
            className="wcmore-field-setting clone"
            onClick={() => onClone(field)}
          >
            Clone
          </span>
          <span
            className="wcmore-field-setting status"
            onClick={() => onStatus(field)}
          >
            {getStatus(field)}
          </span>
        </div>
      )}
    </Draggable>
  );
}

export default FieldItem;
