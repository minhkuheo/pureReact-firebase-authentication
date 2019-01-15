import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

/**
 * Firebase should only be initialized once in your application (singleton)
 */
class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();

        // https://firebase.google.com/docs/auth/web/facebook-login?authuser=1
        this.facebookProvider = new app.auth.FacebookAuthProvider();
    }

    // These 2 functions that we wish to execute at the end of the onAuthStateChanged at the source code.
    // in this case, it's withAuthentication and withAuthorization.
    onAuthUserListener = (onSuccessCallThisFunction, onFallbackCallThisFunction) => {
        console.log('the listener is being called');
        return this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                // console.log('[authUser]', authUser);
                this.user(authUser.uid).once('value').then(userSnapshot => {
                    const userData = userSnapshot.val();

                    // Determine the role - the roles property is stored in array form in the DB
                    if (!userData.roles) {
                        userData.roles = [];
                    }

                    // console.log(authUser);
                    
                    // Merge Auth and DB user data to our convenience
                    authUser = {
                        uid: authUser.uid,
                        email: authUser.email,
                        ...userData,
                    };

                    // console.log(authUser);
                    console.log('onSuccess');
                    onSuccessCallThisFunction(authUser);
                });
            } else {
                console.log('onFallback');
                onFallbackCallThisFunction();
            }
        });
    }
    
    /** **************************************************
     *                      Auth API
     * ***************************************************/
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInUsingTheFace = () =>
        this.auth.signInWithPopup(this.facebookProvider);

    doSignInWithFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) =>
        this.auth.currentUser.updatePassword(password);

    /** **************************************************
     *                      User API
     * ***************************************************/

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;