import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const styles = {
  pageTitle: {
    fontSize: '30px',
    fontFamily: 'Staatliches',
  },
  sprite: {
    height: '100%',
    // background: 'white',
    // borderRadius: '50%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0px',
    border: 'none',
  },
  input: {
    fontFamily: 'Staatliches',
  },
  submitButton: {
    width: '100%',
    fontFamily: 'Staatliches',
  },
  td: {
    padding: '0',
    fontFamily: 'Staatliches',
  },
  tableTitle: {
    fontSize: '25px',
    padding: '0em 0em 0.5em 0em',
    fontFamily: 'Staatliches',
  },
  checkbox: {
    // webkitTransform: 'scale(2)',
    margin: '0',
  },
};

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [invalidCreds, setInvalidCreds] = useState(false);

  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // TODO: Add error messages
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      setInvalidCreds(false);
      Auth.login(data.login.token);

      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    } catch (e) {
      console.error(e);
      setInvalidCreds(true);
    }
  };

  return (
    <>
      <div className="row mt-3">
        <div className="col-6 mx-auto">
          <div style={styles.pageTitle} className="mt-2">
            <strong>Log In</strong> With Existing Account
          </div>
          <form onSubmit={handleFormSubmit}>
            <div style={styles.card} className="card p-3">
              <table className="table">
                <thead className="thead">
                  <th scope="col"></th>
                  <th scope="col"></th>
                </thead>
                <tbody>
                  {/* Email */}
                  <tr>
                    <td style={styles.td}>Email:</td>
                    <td style={styles.td}>
                      <input
                        className="form-control mb-2"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formState.email}
                      />
                    </td>
                  </tr>

                  {/* Password */}
                  <tr>
                    <td style={styles.td}>Password:</td>
                    <td style={styles.td}>
                      <input
                        className="form-control mb-2"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={formState.password}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Invalid Credentials Warning */}
              {invalidCreds ? (
                <div className="alert alert-danger" role="alert">
                  Email or password incorrect
                </div>
              ) : null}
              
              <button
                style={styles.submitButton}
                className="btn btn-primary"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
