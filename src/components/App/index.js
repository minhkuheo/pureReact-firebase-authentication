import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../Navigation';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        const { firebase } = this.props;
        this.listener = firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ?   this.setState({ authUser })
                :   this.setState({ authUser: null });
        });
    }
    
    componentWillUnmount() {
        /**
         * avoid memory leaks that lead to performance issues ==> remove the listener if the component unmounts.
         */
        this.listener();
    }

    render() {
        console.log('this.state.authUser = ', this.state.authUser);
        return (
            <div>
                <header>
                    <Navigation authUser={this.state.authUser} />
                </header>
                <main>
                    <Switch>
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default withFirebase(App);