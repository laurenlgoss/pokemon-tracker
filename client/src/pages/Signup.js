import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

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

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="row mt-3">
        <div className="col-6 mx-auto">
          <div style={styles.pageTitle} className="mt-2">
            <strong>Sign Up</strong> With A New Account
          </div>
          <form onSubmit={handleFormSubmit}>
            <div style={styles.card} className="card p-3">
              <table className="table">
                <thead className="thead">
                  <th scope="col"></th>
                  <th scope="col"></th>
                </thead>
                <tbody>
                  {/* Username */}
                  <tr>
                    <td style={styles.td}>Username:</td>
                    <td style={styles.td}>
                      <input
                        className="form-control mb-2"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formState.username}
                      />
                    </td>
                  </tr>

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
              <button
                style={styles.submitButton}
                className="btn btn-success"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
