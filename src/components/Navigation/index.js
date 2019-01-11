import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

// const NavigationMainMenu = ({authUser}) => (
//     <div>
//         {
//             authUser
//                 ? <NavigationAuth />
//                 : <NavigationNonAuth />
//         }
//     </div>
// );
const NavigationMainMenu = () => (
    <AuthUserContext.Consumer>
        {
            authUser =>
                authUser
                    ?   <NavigationAuth authUser={authUser}/>
                    :   <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({authUser}) => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}><h2>Landing</h2></Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}><h2>Home</h2></Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}><h2>Account</h2></Link>
            </li>
            {
                authUser.roles.includes(ROLES.ADMIN) &&
                <li>
                    <Link to={ROUTES.ADMIN}><h2>Admin</h2></Link>
                </li>
            }
            <li>
                <SignOutButton />
            </li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}><h2>Landing</h2></Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}><h2>Sign In</h2></Link>
            </li>
        </ul>
    </div>
);

export default NavigationMainMenu;