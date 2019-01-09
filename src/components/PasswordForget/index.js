import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { PASSWORD_FORGET } from '../../constants/routes';

const PassWordForgetPage = () => (
    <div>
        <h1>Password Forget</h1>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null
}

class PasswordForgetFormBaseClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleOnSubmitPasswordForget = (event) => {
        const { firebase } = this.props;

        firebase.doPasswordReset(this.state.email)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
            this.setState({ error: error.message });
        });

        event.preventDefault();
    }

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <form onSubmit={this.handleOnSubmitPasswordForget}>
                <h4>Please enter your email </h4>
                <input
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <button disabled={isInvalid} type="submit">
                    Reset My Password
                </button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBaseClass);

const PasswordForgetLink = () => (
    <p>
        <Link to={PASSWORD_FORGET}>Forgot password ?</Link>
    </p>
);

export { PasswordForgetLink, PasswordForgetForm };
export default PassWordForgetPage;