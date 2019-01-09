import React from 'react';
import { withFirebase } from '../Firebase';
import AuthUserContext from './context';

/** This HOC checks for the session authentication
 * 
 * @param {Object} Component a React component
 */
const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null
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
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;