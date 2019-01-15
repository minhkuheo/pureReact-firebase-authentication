import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization } from '../Session';

class AccountPage extends React.Component {
    render() {
        return (
            <AuthUserContext.Consumer>
                {
                    authUser => (
                        <div>
                            <h1>Account page</h1>
                            <h1>Account: { authUser.email }</h1>

                            <h3>Note: The authorization for now is set on broad-grained !!!</h3>
                            <div style={{ textAlign: 'center' }}>
                                <PasswordChangeForm />
                                <br />
                                <PasswordForgetForm />
                            </div>
                        </div>            
                    )
                }
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);