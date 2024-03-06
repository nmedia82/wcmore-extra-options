import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import RenderFields from "./RenderFields"; // Import your FieldInput component
import FieldOption from "./options/field-options";
import FieldConditions from "./Conditions";

const FieldsTabs = ({
  savedFields,
  Field,
  onInputChange,
  onFieldOptionChange,
  onSaveConditions,
}) => {
  const [key, setKey] = useState("general");
  //   console.log(Field);
  return (
    <Tabs
      id="field-tabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="general" title="General">
        {/* Map over your Field.meta here for the general settings */}
        <Container>
          <Row>
            {Field.meta.map((meta, index) => (
              <Col key={index} md={6} className="mb-3">
                <RenderFields meta={meta} onInputChange={onInputChange} />
              </Col>
            ))}
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="options" title="Options">
        <FieldOption
          options={[...Field.options]}
          input_type={Field.type}
          onFieldOptionChange={onFieldOptionChange}
        />
      </Tab>
      <Tab eventKey="conditions" title="Conditions">
        <FieldConditions
          conditions={[...Field.conditions]}
          savedFields={savedFields}
          onSaveConditions={onSaveConditions}
        />
      </Tab>
    </Tabs>
  );
};

export default FieldsTabs;
