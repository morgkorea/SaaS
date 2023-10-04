import React from 'react';
import Routes from './routes/Routes';
import { firebaseInit } from './firebase/firebase.js';
import ChannelService from './ChannelService';
// setup fake backend
import { configureFakeBackend } from './helpers';

// Themes

// For Saas import Saas.scss
import './assets/scss/Saas.scss';

// For Modern demo import Modern.scss
// import './assets/scss/Modern.scss';

// For Creative demo import Creative.scss
// import './assets/scss/Creative.scss';

// configure fake backend
configureFakeBackend();
firebaseInit();

type AppProps = {};

/**
 * Main app component
 */

const pluginKey = process.env.REACT_APP_CHANNELIO_PLUGIN_KEY;

const App = (props: AppProps): React$Element<any> => {
    ChannelService.loadScript();

    ChannelService.boot({
        "pluginKey": pluginKey,
        // "memberId": "USER_MEMBER_ID", 
        // "profile": {
        //     "name": "USER_NAME", 
        //     "mobileNumber": "USER_MOBILE_NUMBER",
        //     "landlineNumber": "USER_LANDLINE_NUMBER", 
        //     "CUSTOM_VALUE_1": "VALUE_1",
        // }
    });

    return <Routes></Routes>;
};

export default App;
