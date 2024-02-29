import React, { useState } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import RenderFields from "./RenderFields"; // Import your FieldInput component
import FieldOption from "../options/field-options";

const FieldsTabs = ({ Field, onInputChange }) => {
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
        <FieldOption options={[]} input_type={Field.type} />
      </Tab>
      <Tab eventKey="conditions" title="Conditions">
        {/* Conditions logic here */}
      </Tab>
    </Tabs>
  );
};

export default FieldsTabs;
