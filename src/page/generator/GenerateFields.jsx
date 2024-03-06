import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Accordion,
  Card,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FieldsTabs from "./FieldsTabs";
import {
  wcforce_generate_field_id,
  wcforce_get_field_header,
  wcmore_get_field_id,
} from "../../common/helper";
import "./style.css";

const CustomToggle = ({ eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey);
  const isCurrentEventKey =
    useContext(AccordionContext).activeEventKey === eventKey;

  return (
    <Button
      variant="outline-secondary"
      onClick={decoratedOnClick}
      size="sm"
      className="float-right"
    >
      {isCurrentEventKey ? (
        <i className="bi bi-dash-lg"></i>
      ) : (
        <i className="bi bi-plus-lg"></i>
      )}
    </Button>
  );
};

const FieldGenerator = ({ meta, SavedFields, onSaveMeta }) => {
  const [savedFields, setSavedFields] = useState([...SavedFields]);

  // Function to reorder the list after drag ends
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(savedFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSavedFields(items);
  };

  const addField = (fieldType) => {
    const newField = {
      ...fieldType,
      id: wcmore_get_field_id(),
      options: [],
      conditions: {},
    };
    setSavedFields((prevFields) => [...prevFields, newField]);
  };

  const cloneField = (index) => {
    setSavedFields((currentFields) => {
      const fieldToClone = { ...currentFields[index] };
      // Generate a new ID for the cloned field to ensure uniqueness
      fieldToClone.id = wcmore_get_field_id();
      // Optionally modify the field's title or other properties here
      const newFields = [...currentFields, fieldToClone];
      return newFields;
    });
  };

  const deleteField = (index) => {
    setSavedFields((currentFields) => {
      // Filter out the field at the specified index
      const newFields = currentFields.filter((_, i) => i !== index);
      return newFields;
    });
  };

  const handleInputChange = (index, event) => {
    // Using functional form of setState to ensure we're always working with the most current state
    setSavedFields((currentSavedFields) => {
      return currentSavedFields.map((field, fieldIndex) => {
        if (fieldIndex === index) {
          // Find the field that needs updating
          const updatedMeta = field.meta.map((m) => {
            if (m.name === event.target.name) {
              let newValue =
                m.type === "boolean"
                  ? event.target.checked
                  : event.target.value;

              // If the title is being updated, also update the field_id based on the new title
              if (m.name === "title") {
                const newFieldId = wcforce_generate_field_id(newValue);
                // Find the meta item for 'field_id' and update it
                let fieldIdMeta = field.meta.find(
                  (meta) => meta.name === "field_id"
                );
                if (fieldIdMeta) {
                  fieldIdMeta.value = newFieldId; // Update the field_id value
                } else {
                  // If for some reason the 'field_id' meta does not exist, add it
                  field.meta.push({
                    name: "field_id",
                    value: newFieldId,
                    type: "text",
                  });
                }
                console.log(`New field_id generated: ${newFieldId}`);
              }

              // Update the current meta item's value
              return { ...m, value: newValue };
            }
            return m; // Return all other meta items unchanged
          });

          return { ...field, meta: updatedMeta };
        }
        return field; // Return all other fields unchanged
      });
    });
  };

  const handleOptionsChange = (index, options) => {
    // console.log(index, options);
    setSavedFields((currentsavedFields) => {
      // console.log(currentsavedFields);
      return currentsavedFields.map((field, fieldIndex) => {
        if (fieldIndex === index) {
          return {
            ...field,
            options,
          };
        }
        return field; // Return all other fields unchanged
      });
    });
  };

  const handleSaveConditions = (index, conditions) => {
    setSavedFields((currentsavedFields) => {
      console.log(conditions);
      return currentsavedFields.map((field, fieldIndex) => {
        if (fieldIndex === index) {
          // Find the field that needs updating
          return {
            ...field,
            conditions,
          };
        }
        return field; // Return all other fields unchanged
      });
    });
  };

  return (
    <Container fluid>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          <Col md={4}>
            <ListGroup>
              {meta.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => addField(item)}
                >
                  {item.label}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={8}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Accordion defaultActiveKey="0" className="mb-2">
                    {savedFields.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <Card className="mb-3">
                              <Card.Header {...provided.dragHandleProps}>
                                <h5 className="mb-0 d-flex justify-content-between align-items-center">
                                  {wcforce_get_field_header(field.meta)}
                                  <div>
                                    <Button
                                      variant="outline-primary"
                                      size="sm"
                                      onClick={() => cloneField(index)}
                                      className="me-2"
                                    >
                                      <i className="bi bi-files"></i>
                                    </Button>
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      className="me-2"
                                      onClick={() => deleteField(index)}
                                    >
                                      <i className="bi bi-trash"></i>
                                    </Button>
                                    <CustomToggle eventKey={String(index)} />
                                  </div>
                                </h5>
                              </Card.Header>

                              <Accordion.Collapse eventKey={String(index)}>
                                <Card.Body>
                                  <FieldsTabs
                                    savedFields={savedFields}
                                    Field={field}
                                    onInputChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                    onFieldOptionChange={(options) =>
                                      handleOptionsChange(index, options)
                                    }
                                    onSaveConditions={(conditions) =>
                                      handleSaveConditions(index, conditions)
                                    }
                                  />
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Accordion>
                </div>
              )}
            </Droppable>
            <Button variant="primary" onClick={() => onSaveMeta(savedFields)}>
              Save Field
            </Button>
          </Col>
        </Row>
      </DragDropContext>
    </Container>
  );
};
export default FieldGenerator;
