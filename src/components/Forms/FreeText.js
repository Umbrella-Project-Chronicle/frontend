import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TextControlsExample() {
  const [text, setText] = useState("");

  const submitEntry = async ({ text }) => {
    console.log(text);
    await fetch("https://localhost:7177/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }).then((response) => {
        console.log(response);
      }),
    });
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            name="text"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
        </Form.Group>
        <Button onClick={submitEntry(text)}>Submit</Button>
      </Form>
    </div>
  );
}

export default TextControlsExample;
