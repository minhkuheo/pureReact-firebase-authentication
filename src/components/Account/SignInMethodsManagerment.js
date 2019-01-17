import React from 'react';
import { withFirebase } from '../Firebase';

const SIGN_IN_METHODS = [
    {
        id: 'password',
        provider: null,
    },
    {
        id: 'facebook.com',
        provider: 'facebookProvider',
    },
    {
        id: 'google.com',
        provider: 'googleProvider',
    },
    // {
    //     id: 'twitter.com',
    //     provider: 'twitterProvider',
    // },
    // {
    //     id: 'github.com',
    //     provider: 'githubProvider'
    // },
];

class SignInMethodsManagerment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSignInMethods: [],
            error: null
        };
    }

    componentDidMount() {
        this.fetchSignInMethods();
    }

    fetchSignInMethods = () => {
        const { firebase, authUser } = this.props;
        firebase.auth.fetchSignInMethodsForEmail(authUser.email)
            .then(activeSignInMethods => {
                // This returns the same array as fetchProvidersForEmail but for email
                // provider identified by 'password' string, signInMethods would contain 2
                // different strings:
                // 'emailLink' if the user previously signed in with an email/link
                // 'password' if the user has a password.
                // A user could have both.

                //Link: https://firebase.google.com/docs/auth/web/email-link-auth
                this.setState({
                    activeSignInMethods: activeSignInMethods,
                    error: null
                });
            })
            .catch(error => {
                this.setState({ error });
            })
    };

    // Linking/re-authentication with email link
    // https://firebase.google.com/docs/auth/web/email-link-auth
    // https://firebase.google.com/docs/auth/web/account-linking
    onDefaultLoginLink = (password) => {
        const { firebase, authUser } = this.props;
        // console.log('[firebase]', firebase);
        // console.log('[authUser.email]', authUser.email);
        // const credential = firebase.emailAuthProvider.credentialWithLink(authUser.email, password);
        const credential = firebase.emailAuthProvider.credential(authUser.email, password);
        // console.log('[credential]',credential);

        firebase.auth.currentUser.linkAndRetrieveDataWithCredential(credential)
        .then(this.fetchSignInMethods)
        .catch(error => this.setState({ error }));
    }

    // https://firebase.google.com/docs/auth/web/account-linking
    onClickLinkSocialAccount = provider => () => {
        const { firebase } = this.props;
        // console.log('[provider]',provider);
        // console.log('[firebase.auth.currentUser]',firebase.auth.currentUser); 
        // console.log(firebase);
        // console.log(firebase.auth);
        // console.log(firebase[provider]);
        firebase.auth.currentUser.linkWithPopup(firebase[provider])
        .then(() => this.fetchSignInMethods)
        .catch(error => this.setState({error}));
    }

    // https://firebase.google.com/docs/auth/web/account-linking
    onClickDeactivate = providerId => () => {
        const { firebase } = this.props;
        // console.log('[providerId]',providerId);
        // console.log('[firebase.auth.currentUser]',firebase.auth.currentUser); 
        firebase.auth.currentUser.unlink(providerId)
        .then(() => this.fetchSignInMethods)
        .catch(error => this.setState({error}));
    }

    render() {
        const { activeSignInMethods, error } = this.state;
        return (
            <div>
                <h4>Sign in methods</h4>
                <h5>If you use 1 email address for 3 sign in methods</h5>
                <h5>You can link them together here</h5>
                {
                    SIGN_IN_METHODS.map(thisSignInMethodObject => {
                        const isEnabled = activeSignInMethods.includes(thisSignInMethodObject.id);
                        const onlyOneLeft = activeSignInMethods.length === 1;

                        return (
                            <div key={thisSignInMethodObject.id}>
                                {
                                    thisSignInMethodObject.id === 'password'
                                        ?
                                            <DefaultLoginToggle
                                                onlyOneLeft={onlyOneLeft}
                                                isEnabled={isEnabled}
                                                thisSignInMethodObject={thisSignInMethodObject}
                                                onClickLink={this.onDefaultLoginLink}
                                                onClickDeactivate={this.onClickDeactivate}
                                            />
                                        :
                                            <SocialLoginToggle
                                                onlyOneLeft={onlyOneLeft}
                                                isEnabled={isEnabled}
                                                thisSignInMethodObject={thisSignInMethodObject}
                                                onClickLink={this.onClickLinkSocialAccount}
                                                onClickDeactivate={this.onClickDeactivate}
                                            />
                                }
                            </div>
                        );
                    })
                }

                {
                    error &&
                    <div>
                        <p>{error.message}</p>
                    </div>
                }
            </div>
        );
    }
}

class DefaultLoginToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordOne: '',
            passwordTwo: ''
        };
    }

    onChangeInputForm = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.props.onClickLink(this.state.passwordOne);
        this.setState({ passwordOne: '', passwordTwo: '' });
    }

    render() {
        const {
            onlyOneLeft,
            isEnabled,
            thisSignInMethodObject,
            onClickDeactivate,
        } = this.props;

        const { passwordOne, passwordTwo } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

        return (
            <React.Fragment>
                {
                    isEnabled
                        ?
                            (
                                <div>
                                    <button tpye="button" disabled={onlyOneLeft}
                                        onClick={onClickDeactivate(thisSignInMethodObject.id)} 
                                    >
                                        Deactivate {thisSignInMethodObject.id}
                                    </button>
                                    {' <=====< '} currently in use
                                </div>
                            )
                        :
                            (
                                <form onSubmit={this.onSubmit}>
                                    <input
                                        name="passwordOne"
                                        value={passwordOne}
                                        onChange={this.onChangeInputForm}
                                        type="password"
                                        placeholder="New Password"
                                    />
                                    <input
                                        name="passwordTwo"
                                        value={passwordTwo}
                                        onChange={this.onChangeInputForm}
                                        type="password"
                                        placeholder="Confirm New Password"
                                    />
        
                                    <button disabled={isInvalid} type="submit">
                                        Link {thisSignInMethodObject.id}
                                    </button>
                                </form>
                            )
                }
            </React.Fragment>
        );
    }
}

const SocialLoginToggle = ({ onlyOneLeft, isEnabled, thisSignInMethodObject, onClickLink, onClickDeactivate }) => 
    isEnabled
        ?
            (
                <div>
                    <button tpye="button" disabled={onlyOneLeft}
                        onClick={onClickDeactivate(thisSignInMethodObject.id)} 
                    >
                        Deactivate {thisSignInMethodObject.id}
                    </button>
                    {' <=====< '} currently in use
                </div>
            )
        :
            (
                <button tpye="button" 
                    onClick={onClickLink(thisSignInMethodObject.provider)}
                >
                    Link {thisSignInMethodObject.id}
                </button>
            );

export default withFirebase(SignInMethodsManagerment);