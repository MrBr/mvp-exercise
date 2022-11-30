import React from "react";
import { useFormik } from "formik";
import { Container, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { useUserAuth } from "../hooks";
import { Link } from "react-router-dom";
import { Topbar } from "../../app";

const LoginSchema = yup.object().shape({
  password: yup.string().min(8, "Too Short!").max(24, "Too Long!").required(),
  username: yup.string().min(4, "Too Short!").max(16, "Too Long!").required(),
});

export const Login = () => {
  const { login, error, loading } = useUserAuth();

  const formik = useFormik({
    onSubmit: login,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
  });

  return (
    <Container>
      <Topbar>
        <Col>
          <h1>Login</h1>
        </Col>
        <Col className="col-auto">
          <Link to="/">Dashboard</Link>
        </Col>
      </Topbar>
      <Form noValidate>
        <Row>
          <Col>
            <FormGroup className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" onChange={formik.handleChange} />
            </FormGroup>
            <FormGroup className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                onChange={formik.handleChange}
              />
            </FormGroup>
            {error && <Form.Label>{error}</Form.Label>}
            <FormGroup className="mt-3">
              <Button onClick={formik.submitForm} disabled={loading}>
                Submit
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </Container>
  );
};
