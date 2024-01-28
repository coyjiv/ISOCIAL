import { Formik, Field, Form, ErrorMessage } from 'formik';
import {validationSchema} from "./validation.js"

import "./Login.scss";

const LoginForm = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
        const response = await fetch('http://localhost:9000/api/auth/access', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const token = await response.json();
        console.log('Response:', token);
        localStorage.setItem('token', token)

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="login__form">
          <Field type="text" id="username" name="username" placeholder="Username"/>
          <ErrorMessage name="username" component="div" />
          <Field type="password" id="password" name="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;