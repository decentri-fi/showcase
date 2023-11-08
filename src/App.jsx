import "tailwindcss/dist/base.css";

// Path: src/styles/globalStyles.css
import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

/*
 * This is the entry point component of this project. You can change the below exported default App component to any of
 * the prebuilt landing page components by uncommenting their import and export lines respectively.
 * See one of the landing page components to better understand how to import and render different components (Always
 * make sure if you are building your own page, the root component should be the AnimationRevealPage component. You can
 * disable the animation by using the disabled prop.
 *
 * The App component below is using React router to render the landing page that you see on the live demo website
 * and the component previews.
 *
 */
import CustomHeader from "./components/Header/CustomHeader";
import LandingView from "./views/LandingView/LandingView";
import FooterV2 from "./components/Footer/FooterV2";
import ReactGA from "react-ga4";
import DefiHubView from "./views/DefiHubView/DefiHubView";
import TermsOfServiceView from "./views/TermsOfServiceView/TermsOfServiceView";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import MembershipView from "./views/MembershipView";
import MentorshipView from "./views/MentorshipView/MentorshipView";

export default function App() {
    ReactGA.initialize([
        {
            trackingId: "G-WLP674G3V2"
        }
    ]);

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Router basename="/landing">
                <Switch>
                    <Route path={"/mentorship"}>
                        <MentorshipView/>
                    </Route>
                    <Route path="/membership">
                        <MembershipView/>
                    </Route>
                    <Route path="/defi-hub">
                        <CustomHeader showUserLink={false}/>
                        <DefiHubView/>
                        <FooterV2/>
                    </Route>
                    <Route path="/terms-of-service">
                        <CustomHeader showUserLink={false}/>
                        <TermsOfServiceView/>
                        <FooterV2/>
                    </Route>
                    <Route>
                        <CustomHeader expanded={true} showUserLink={false}/>
                        <LandingView/>
                        <FooterV2/>
                    </Route>
                </Switch>
            </Router>
        </QueryClientProvider>
    );
}
