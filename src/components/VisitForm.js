import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const styles = {
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  label: {
    fontSize: "1px",
  },
};

class VisitForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required("First Name is required."),
      roomNumber: Yup.number().required("Room Number is required."),
    });
  }
  handleSubmit(data) {
    console.log(JSON.stringify(data));
  }
  render() {
    const initialValues = {
      firstName: "",
      roomNumber: "",
    };
    return (
      <div style={styles.container}>
        <Row>
          <p>
            Please fill the form out below if you would like a visit from a
            therapy dog. The list of patients that would like a visit resets
            daily.
          </p>
        </Row>

        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <label>First Name</label>
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <Field
                      name="firstName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.firstName && touched.firstName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                      style={styles.error}
                    />
                  </Col>
                </Row>
              </div>
              <div className="form-group">
                <Row>
                  <Col>
                    {" "}
                    <label> Room Number </label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {" "}
                    <Field
                      name="roomNumber"
                      type="number"
                      className={
                        "form-control" +
                        (errors.roomNumber && touched.roomNumber
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="roomNumber"
                      component="div"
                      className="invalid-feedback"
                      style={styles.error}
                    />
                  </Col>
                </Row>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default VisitForm;
