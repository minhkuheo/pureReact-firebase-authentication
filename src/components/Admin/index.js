import React from 'react';
import { withAuthorization } from '../Session';

class AdminPage extends React.Component {
    
    render() {
        return (
            <div>
                <h2>This is Admin Homepage</h2>
                <p>Only admin alone can access this page.</p>
            </div>
        )
    }
}

const condition = (authUser) => authUser.role === 'ADMIN'; 

export default withAuthorization(condition)(AdminPage);