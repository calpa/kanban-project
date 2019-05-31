import React from "react";
import { Form, Field } from "react-final-form";

const MyForm = ({
  onSubmit = () => {},
  validate = () => {},
  InterestPicker
}) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit} className="container">
        <div className="row">
          <div className="col">
            <h4>Add New Card</h4>

            {/* <p>Card Text</p> */}
            <Field name="text" component="input" placeholder="Card Text" />
          </div>
        </div>

        <div
          className="row"
          style={{
            marginTop: 10
          }}
        >
          <div className="col">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </form>
    )}
  />
);

export default MyForm;
