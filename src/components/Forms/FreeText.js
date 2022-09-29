import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TextControlsExample() {
  const [text, setText] = useState("");

  const submitEntry = async () => {
    console.log(text);
    await fetch("https://localhost:7177/api/journal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        journalType: 3,
        userID: "630d00bf12acfe4c84188a2a",
        ratings: {
          overall: 10,
          happiness: 0,
          depression: 0,
          anxiety: 0,
          sadness: 0,
          loneliness: 0,
        },
        response: "hello what is up im testing this for fun",
      }),
    }).then((response) => {
      console.log(response);
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
        <Button onClick={() => submitEntry()}>Submit</Button>
      </Form>
    </div>
  );
}

export default TextControlsExample;
