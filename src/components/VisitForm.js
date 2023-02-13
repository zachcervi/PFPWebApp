import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import signUpForVisit from "../api/visit";
import PawsForPatientsLogo from "../assets/PFPLogo.png";
import Image from "react-bootstrap/Image";

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
  logo: {
    width: "350px",
    height: "350px",
  },
  input: {
    minHeight: "30px",
    minWidth: "300px",
    borderRadius: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    border: "none",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  submit: {
    backgroundColor: "#14a647",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "20px",
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    textTransform: "uppercase",
  },
};

class VisitForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      message: "",
      error: false,
    };
  }
  validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string().required("First Name is required."),
      roomNumber: Yup.number().required("Room Number is required."),
    });
  }
  handleSubmit(data, { resetForm }) {
    try {
      signUpForVisit(data).then((resp) => {
        if (resp && resp.status === 200) {
          const { data } = resp;
          this.setState({ message: `${data}`, error: false });
        } else {
          const { response } = resp;
          this.setState({ message: `${response.data}`, error: true });
        }
      });
      resetForm();
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const initialValues = {
      firstName: "",
      roomNumber: "",
    };
    return (
      <div style={styles.container}>
        <Image fluid={true} style={styles.logo} src={PawsForPatientsLogo} />

        <Row>
          <p>
            Please fill the form out below if you would like a visit from a
            therapy dog. The list of patients that would like a visit resets
            daily.
          </p>
        </Row>
        <Row>
          <p>
            Please be advised that if you are in an isolation room, the therapy
            dog teams will not be able to visit.
          </p>
        </Row>
        {!this.state.error && <p>{this.state.message}</p>}
        {this.state.error && (
          <p style={styles.errorMessage}>{this.state.message}</p>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group mb-3">
                <Row>
                  <Col>
                    <Field
                      name="firstName"
                      type="text"
                      style={styles.input}
                      placeholder="First Name"
                      className={
                        "form-control-lg" +
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
                    <Field
                      style={styles.input}
                      placeholder="Room Number"
                      name="roomNumber"
                      type="number"
                      className={
                        "form-control-lg" +
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
                <button
                  type="submit"
                  style={styles.submit}
                  className="btn btn-primary"
                >
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
