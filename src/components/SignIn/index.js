import React from 'react';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import SignInEmailPassword from './SignInEmailPassword'
import SignInFacebook from './SignInFacebook';

const SignIn = () => (
    <div>
        <h1>Please Sign In</h1>
        <h3>Sign in using email and password</h3>
        <SignInEmailPassword />
        <PasswordForgetLink />
        <br />
        <h3>Sign in using Facebook</h3>
        <SignInFacebook />
        <br />
        <SignUpLink />
    </div>
);

export default SignIn;

// export { SignInForm };