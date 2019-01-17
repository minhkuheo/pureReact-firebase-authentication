import React from 'react';
import { compose } from 'recompose';
import PasswordChangeForm from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import SignInMethodsManagerment from './SignInMethodsManagerment';

class AccountPage extends React.Component {
    render() {
        return (
            <AuthUserContext.Consumer>
                {
                    authUser => (
                        <div>
                            <h1>Account page</h1>
                            <h1>Account: {authUser.email}</h1>

                            <h3>Note: The authorization for now is set on broad-grained !!!</h3>
                            <div style={{ textAlign: 'center' }}>
                                <PasswordChangeForm />
                                <br />
                                <PasswordForgetForm />
                                <br />
                                <SignInMethodsManagerment authUser={authUser}/>
                            </div>
                        </div>
                    )
                }
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(AccountPage);