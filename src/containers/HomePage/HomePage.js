import { connect } from 'react-redux';

import HomePageHeader from './HomePageHeader';
import DoctorSection from './DoctorSection/DoctorSection';
import Section from './Section/Section';
import HandlBook from './HandlBook/HandlBook';
import About from './About/About';
import HomeFooter from './HomeFooter/HomeFooter';
import {
    specialityData,
    telemedicineData,
    healthFacilities,
    outstandingDoctor,
    handlBook,
} from './Section/SectionData';

const HomePage = () => {
    return (
        <div>
            <HomePageHeader />
            <Section data={specialityData} />
            <Section data={telemedicineData} backgroundStyle="#f5f5f5" />
            <Section data={healthFacilities} />
            <DoctorSection data={outstandingDoctor} backgroundStyle="#f5f5f5" />
            <HandlBook data={handlBook} sliderNumber={2} />
            <About backgroundStyle="#f5f5f5" />
            <HomeFooter />
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
