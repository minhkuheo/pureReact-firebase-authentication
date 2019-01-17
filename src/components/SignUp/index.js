import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const SignUp = () => (
    <div>
        <h1>Please sign up</h1>
        <SignUpForm />
    </div>
);

export default SignUp;

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this email address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;



const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    error: null,
};

class SignUpFormClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmitSigningUp = event => {
        const { username, email, passwordOne , isAdmin} = this.state;
        const { firebase } = this.props;

        const roles = [];
        if (isAdmin) {
            roles.push(ROLES.ADMIN);
        }

        firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return firebase.user(authUser.user.uid).set({ username, email, roles });
            })
            .then(() => {
                return firebase.doSendEmailVerification();
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                    error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        console.log(error);
        return (
            <form onSubmit={this.onSubmitSigningUp}>
                <ul>
                    <li>
                        <input
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Full Name"
                        />
                    </li>
                    <li>
                        <input
                            name="email"
                            value={email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address"
                        />
                    </li>
                    <li>
                        <input
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Password"
                        />
                    </li>
                    <li>
                        <input
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </li>
                    <br />
                    <li>
                        <label>
                            Admin: (Only for testing Admin assignation)
                            <input
                                name="isAdmin"
                                type="checkbox"
                                checked={isAdmin}
                                onChange={this.onChangeCheckbox}
                            />
                        </label>
                    </li>
                    <br />
                    <li>
                        <button className="button button1" disabled={isInvalid} type="submit">Sign Up</button>
                    </li>
                </ul>

                {
                    error && 
                    <div>
                        <p style={{ color: '#F2552C' }}>Ups! Something is not right...</p>
                        <p style={{ color: '#F2552C' }}>{error.message}</p>
                    </div>
                }
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

// const SignUpForm = withRouter(withFirebase(SignUpFormClass));

// Note: compose function applies the higher-order components from right to left.
const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormClass);

export {
    // SignUpForm, 
    SignUpLink,
};