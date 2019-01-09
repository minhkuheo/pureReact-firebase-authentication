import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

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
                    ?   <NavigationAuth />
                    :   <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
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
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
        </ul>
    </div>
);

export default NavigationMainMenu;