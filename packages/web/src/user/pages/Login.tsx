import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { Container, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { useApi } from "../../app";
import { login } from "../requests";
import { ActiveUserContext } from "../providers/ActiveUser";

const LoginSchema = yup.object().shape({
  password: yup.string().min(8, "Too Short!").max(24, "Too Long!").required(),
  username: yup.string().min(4, "Too Short!").max(16, "Too Long!").required(),
});

export const Login = () => {
  const { fetch, loading, response, error } = useApi(login);
  const [, load] = useContext(ActiveUserContext);

  useEffect(() => {
    if (response) {
      sessionStorage.setItem("token", response.data);
      load();
    }
  });

  const formik = useFormik({
    onSubmit: (values) => fetch(values),
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
  });

  return (
    <Container>
      <Row>
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      <Form noValidate>
        <Row>
          <Col>
            <FormGroup>
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" onChange={formik.handleChange} />
            </FormGroup>
            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                onChange={formik.handleChange}
              />
            </FormGroup>
            {error && <Form.Label>{error}</Form.Label>}
            <FormGroup>
              <Button onClick={formik.submitForm} disabled={loading}>
                Submit
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
