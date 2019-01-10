import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const SignUp = () => (
    <div>
        <h1>Please sign up</h1>
        <SignUpForm />
    </div>
);

export default SignUp;





const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmitSigningUp = event => {
        const {username, email, passwordOne } = this.state;
        const { firebase } = this.props;

        firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            return firebase.user(authUser.user.uid).set({username, email});
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          this.setState({ error });
        });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        console.log(this.props);
        return (
            <form onSubmit={this.onSubmitSigningUp}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sign Up</button>

                {error && <p>{error.message}</p>}
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
    SignUpLink 
};