import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Container, Row, Col, FormGroup, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useApi } from "../../app";
import { deleteUser, updateUser } from "../requests";
import { useActiveUser, useUserAuth } from "../hooks";
import { User } from "../types";

const UserUpdateSchema = yup.object().shape({
  username: yup.string().min(4, "Too Short!").max(16, "Too Long!").required(),
});

export const Profile = () => {
  const { fetch, loading, response, error, reset } = useApi(updateUser);
  const deleteUserApi = useApi(deleteUser);
  const [user, setUser] = useActiveUser() as [
    User,
    (user: User) => void,
    unknown
  ];
  const { logout } = useUserAuth();

  const formik = useFormik({
    onSubmit: (values) => fetch(user.id, values),
    initialValues: {
      username: user.username,
    },
    validationSchema: UserUpdateSchema,
  });

  useEffect(() => {
    if (response) {
      setUser({ ...user, ...formik.values });
      reset();
    }
  }, [response, user, setUser, formik.values, reset]);

  useEffect(() => {
    if (deleteUserApi.response) {
      logout();
      window.location.reload();
    }
  }, [deleteUserApi, logout]);

  const onDelete = () => {
    // eslint-disable-next-line
    if (confirm("Are you sure you want to delete account?")) {
      deleteUserApi.fetch(user.id);
    }
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          <h1>Edit profile</h1>
        </Col>
        <Col className="col-auto">
          <Link to="/">Dashboard</Link>
        </Col>
      </Row>
      <Form noValidate>
        <Row>
          <Col>
            <FormGroup className="mt-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                defaultValue={user.username}
                isInvalid={!!formik.errors.username}
                onChange={formik.handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </FormGroup>
            {user.role === "buyer" && (
              <FormGroup className="mt-3">
                <Form.Label>Deposit</Form.Label>
                <Form.Control defaultValue={user.deposit} disabled />
              </FormGroup>
            )}
            <FormGroup className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Check
                type="radio"
                disabled
                label={user.role}
                defaultChecked
              />
            </FormGroup>
            {error && <Form.Label>{error}</Form.Label>}
            <FormGroup className="mt-3">
              <Button onClick={formik.submitForm} disabled={loading}>
                Submit
              </Button>
              <Button
                onClick={onDelete}
                disabled={loading}
                variant="danger"
                className="ms-2"
              >
                Delete
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
