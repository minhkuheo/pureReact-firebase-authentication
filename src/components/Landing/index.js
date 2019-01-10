import React from 'react';

const LandingPage = () => (
    <div>
        <div className="row">
            <div className="column">
                <img src="https://avatars3.githubusercontent.com/u/13274342?s=400&u=6d35ccd344a054c2242942761fd8972026c273ce&v=4" width="200px" alt="MyPic" />
            </div>
            <div className="column">
                <h1>Hello and Welcome</h1>
            </div>
        </div>

        <div className="row">
            <ul>
                <li>
                    <p>This boilerplate is bootstrapped by using <b>create-react-app</b> and implemented using pure React and Firebase</p>
                </li>
                <li>
                    <p>The authentication and authorization is implemented using HOC and reactContext</p>
                </li>
                <li>
                    <p>Link to the github repo: </p>
                    <ul>
                        <li>
                            <a href="https://github.com/minhkuheo/pureReact-firebase-authentication.git">https://github.com/minhkuheo/pureReact-firebase-authentication.git</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <h4>Note:</h4>
                    <ul>
                        <li><p>No UI framework is installed in this project yet</p></li>
                        <li>
                            <p>There are 2 UI frameworks that I personally like:</p>
                            <ul>
                                <li><a href="https://reactstrap.github.io/">Reactstrap (Bootstrap v4)</a> and <a href="https://react.semantic-ui.com/">Semantic UI</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <h4>OBS:</h4>
                    <ul>
                        <li>
                            <p>This boilerplate has been made from a tutorial of Robin Rwieruch with my own tweaks</p>
                            <p>This tutorial helps me to:</p>
                            <ul>
                                <li><p>Get update with the newest React tech such as HOC and contextAPI</p></li>
                                <li><p>Learn more about the construction</p></li>
                                <li><p>Think in a Reactive manner</p></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
);

export default LandingPage;