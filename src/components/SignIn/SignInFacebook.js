import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { HOME } from '../../constants/routes';

class SignInFacebook extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null }
    }

    doSignInUsingTheFace = (event) => {
        const { firebase } = this.props;

        firebase.doSignInUsingTheFace()
        .then(facebookAuthUser => {
            // console.log('[facebookAuthUser]', facebookAuthUser);
            // alert('stop lige');
            if (facebookAuthUser.additionalUserInfo.isNewUser) {
                // Create a user in your Firebase Realtime Database too
                return firebase.user(facebookAuthUser.user.uid).set({
                    username: facebookAuthUser.additionalUserInfo.profile.name,
                    email: facebookAuthUser.additionalUserInfo.profile.email,
                    roles: [],
                });
            } else {
                return null;
            }
        })
        .then(() => {
            this.setState({ error: null })
            this.props.history.push(HOME)
        })
        .catch(error => {
            this.setState({ error });
        })

        event.preventDefault();
    }

    render() {
        const { error } = this.state;
        return (
            <form onSubmit={this.doSignInUsingTheFace}>
                <button className="loginBtn loginBtn--facebook" type="submit">Facebook sign in</button>
                { error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default compose(
    withRouter,
    withFirebase
)(SignInFacebook);