import React from 'react';
import { withAuthorization } from '../Session';

class HomePage extends React.Component {
    
    render() {
        return (
            <div>
                <h2>This is the home page</h2>
                <p>Only registered user may access this page</p>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);