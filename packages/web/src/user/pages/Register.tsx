import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Container, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Topbar, useApi } from "../../app";
import { register } from "../requests";
import { User } from "../types";

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
    onSubmit: fetch,
    initialValues: {
      username: "",
      password: "",
      role: "buyer" as User["role"],
    },
    validationSchema: RegisterSchema,
  });

  return (
    <Container>
      <Topbar>
        <Col>
          <h1>Register</h1>
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
              <Form.Control
                name="username"
                isInvalid={!!formik.errors.username}
                onChange={formik.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup className="mt-3">
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
            <FormGroup className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Check
                type="radio"
                name="role"
                label="buyer"
                value="buyer"
                onChange={formik.handleChange}
                defaultChecked
              />
              <Form.Check
                type="radio"
                name="role"
                label="seller"
                value="seller"
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
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </Container>
  );
};
