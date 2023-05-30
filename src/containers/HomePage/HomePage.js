import { connect } from 'react-redux';

import HomePageHeader from './HomePageHeader';

const HomePage = () => {
    return (
        <div>
            <HomePageHeader />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
