import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

import { SignUpLink } from '../SignUp';

import * as ROUTES from '../../constants/routes';

const SignIn = () => (
    <div>
        <h1>Please Sign In</h1>
        <SignInForm />
        <SignUpLink />
    </div>
);

export default SignIn;




const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;
        const { firebase } = this.props;

        firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormClass);

// export { SignInForm };