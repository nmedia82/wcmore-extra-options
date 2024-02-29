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
import FieldsTabs from "./bootstrap/FieldsTabs";

const CustomToggle = ({ eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey);
  const isCurrentEventKey =
    useContext(AccordionContext).activeEventKey === eventKey;

  return (
    <Button variant="clear" onClick={decoratedOnClick} className="float-right">
      {isCurrentEventKey ? (
        <i className="bi bi-dash-lg"></i>
      ) : (
        <i className="bi bi-plus-lg"></i>
      )}
    </Button>
  );
};

const OptionCreator = ({ meta }) => {
  const [selectedFields, setSelectedFields] = useState([]);

  const addField = (fieldType) => {
    const newField = {
      ...fieldType,
      id: Math.random().toString(36).substr(2, 9),
    };
    setSelectedFields((prevFields) => [...prevFields, newField]);
  };

  const handleInputChange = (index, event) => {
    // Using functional form of setState to ensure we're always working with the most current state
    setSelectedFields((currentSelectedFields) => {
      console.log(currentSelectedFields);
      return currentSelectedFields.map((field, fieldIndex) => {
        if (fieldIndex === index) {
          // Find the field that needs updating
          return {
            ...field,
            meta: field.meta.map((m) => {
              if (m.name === event.target.id) {
                // Find the meta item that needs updating
                return { ...m, value: event.target.value }; // Update value
              }
              return m; // Return all other meta items unchanged
            }),
          };
        }
        return field; // Return all other fields unchanged
      });
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <ListGroup>
            {meta.map((item, index) => (
              <ListGroup.Item key={index} action onClick={() => addField(item)}>
                {item.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          <Accordion defaultActiveKey="0" className="mb-2">
            {selectedFields.map((field, index) => (
              <Card key={field.id} className="mb-3">
                {" "}
                {/* Add margin between each field */}
                <Card.Header>
                  <h5 className="mb-0 d-flex justify-content-between align-items-center">
                    {field.label}
                    <CustomToggle eventKey={String(index)} />
                  </h5>
                </Card.Header>
                <Accordion.Collapse eventKey={String(index)}>
                  <Card.Body>
                    <FieldsTabs
                      Field={field}
                      onInputChange={(e) => handleInputChange(index, e)}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))}
          </Accordion>
          <Button
            variant="primary"
            onClick={() => console.log("Save logic here")}
          >
            Save Field
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OptionCreator;
