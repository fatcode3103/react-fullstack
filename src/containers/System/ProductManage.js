import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

const ProductManage = () => {
    return (
        <div className="products-container">
            <div className="title text-center">Product manage</div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
