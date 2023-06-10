import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

const UserRedux = () => {
    return (
        <div className="user-redux-container">
            <div className="title">User Redux</div>
            <div className="user-redux-content">add new user</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
