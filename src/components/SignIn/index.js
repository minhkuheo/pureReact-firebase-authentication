import React from 'react';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import SignInEmailPassword from './SignInEmailPassword'
import SignInFacebook from './SignInFacebook';
import SignInGoogle from './SignInGoogle';

const SignIn = () => (
    <div>
        <h1>Please Sign In</h1>
        <h3>Sign in using email and password</h3>
        <SignInEmailPassword />
        <PasswordForgetLink />
        <br />
        <SignInFacebook />
        <SignInGoogle />
        <br />
        <SignUpLink />
    </div>
);

export default SignIn;

// export { SignInForm };