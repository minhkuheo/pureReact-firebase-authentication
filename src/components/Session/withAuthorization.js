import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { SIGN_IN } from '../../constants/routes';
import AuthUserContext from './context';

/** This HOC will be used by every protected route 
 *      Each protected component will pass it's own condition of authorization to this HOC
 * 
 *  Examples:
 *      broad-grained authorization:
 *          const condition = authUser => !!authUser; (Check if authUser is null or not)
 * 
 *      role-based authorization
 *          const condition = authUser => authUser.role === 'ADMIN';
 * 
 *      // permission-based authorization
 *          const condition = authUser => authUser.permissions.canEditAccount;
 * 
 * @param {Function} conditionalFunction : A function that is passed individually from each page that need to be protected according to the role-base
 */
const withAuthorization = (conditionalFunction) => Component => {
    class WithAuthorization extends React.Component {

        componentDidMount() {
            const { firebase } = this.props;
            this.listener = firebase.auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    firebase.user(authUser.uid).once('value')
                    .then(snapShot => {
                        const loggedInUser = snapShot.val();
                        
                        // guess.roles is null
                        if (!loggedInUser.roles) {
                            loggedInUser.roles = [];
                        }

                        authUser = {}

                        if (!conditionalFunction(authUser)) {
                            this.props.history.push(SIGN_IN);
                        }
                    }).catch(err => {
                        console.log(err);
                    })

                } else {
                    this.props.history.push(SIGN_IN);
                }
            });
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {
                        authUser =>
                            !authUser || conditionalFunction(authUser)
                                ?   <Component {...this.props} />
                                :   null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return compose(
        withRouter,
        withFirebase
    )(WithAuthorization);
};

export default withAuthorization;