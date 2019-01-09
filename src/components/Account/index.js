import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';

import { AuthUserContext } from '../Session';

class AccountPage extends React.Component {
    render() {
        console.log(this.context);
        return (
            <div>
                <h1>Account page</h1>
                <AuthUserContext.Consumer>
                    {
                        authUser => (<h3>Welcome: {(authUser || {}).email}</h3>)
                    }
                </AuthUserContext.Consumer>

                <PasswordChangeForm />
                <hr />
                <PasswordForgetForm />
            </div>
        )
    }
}

AccountPage.contextType = AuthUserContext;

export default AccountPage;