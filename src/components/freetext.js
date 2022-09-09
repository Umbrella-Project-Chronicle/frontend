import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TextControlsExample() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button>Submit</Button>
    </Form>
  );
}

export default TextControlsExample;
