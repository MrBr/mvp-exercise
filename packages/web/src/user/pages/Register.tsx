import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Container, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../app";
import { register } from "../requests";

const RegisterSchema = yup.object().shape({
  password: yup.string().min(8, "Too Short!").max(24, "Too Long!").required(),
  username: yup.string().min(4, "Too Short!").max(16, "Too Long!").required(),
  role: yup.string().oneOf(["buyer", "seller"]).required(),
});

export const Register = () => {
  const { fetch, loading, response, error } = useApi(register);
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      navigate("/login");
    }
  });

  const formik = useFormik({
    onSubmit: (values) => fetch(values),
    initialValues: {
      username: "",
      password: "",
      role: "buyer",
    },
    validationSchema: RegisterSchema,
  });

  return (
    <Container>
      <Row>
        <Col>
          <h1>Register</h1>
        </Col>
      </Row>
      <Form noValidate>
        <Row>
          <Col>
            <FormGroup>
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                isInvalid={!!formik.errors.username}
                onChange={formik.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                isInvalid={!!formik.errors.password}
                onChange={formik.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <Form.Label>Role</Form.Label>
              <Form.Check
                type="radio"
                name="role"
                label="buyer"
                onChange={formik.handleChange}
                defaultChecked
              />
              <Form.Check
                type="radio"
                name="role"
                label="seller"
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