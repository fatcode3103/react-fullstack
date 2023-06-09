import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';

import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils';
import './App.scss';

import Home from '../routes/Home';
import Login from '../containers/Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';
import HomePage from './HomePage/HomePage';
import DetailDoctor from './Patient/DetailDoctor/DetailDoctor';
import Doctor from '../routes/Doctor';
import VerifyEmail from './Patient/VerifyEmail';

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={Home} />
                                <Route
                                    path={path.LOGIN}
                                    component={userIsNotAuthenticated(Login)}
                                />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={path.DOCTOR} component={userIsAuthenticated(Doctor)} />
                                <Route path={path.HOMEPAGE} component={HomePage} />
                                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                <Route path={path.VERIFY_EMAIL} component={VerifyEmail} />
                            </Switch>
                        </div>

                        {/* <ToastContainer
                            className="toast-container"
                            toastClassName="toast-item"
                            bodyClassName="toast-item-body"
                            autoClose={false}
                            hideProgressBar={true}
                            pauseOnHover={false}
                            pauseOnFocusLoss={true}
                            closeOnClick={false}
                            draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
