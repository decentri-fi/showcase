import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.jsx";


import Hero from "components/hero/TwoColumnWithFeaturesAndTestimonial.js";
import Features from "components/features/ThreeColWithSideImage.jsx";
import MainFeature from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.jsx";
import FeatureStats from "components/features/ThreeColCenteredStatsPrimaryBackground.jsx";
import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";
import Blog from "components/blogs/GridWithFeaturedPost.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndRating.js";
import FAQ from "components/faqs/SingleCol.jsx";
import GetStarted from "components/cta/GetStartedLight.js";
import Footer from "components/footers/FiveColumnWithInputForm.jsx";

const HighlightedText = tw.span`text-primary-500`

export default () => {
  return (
    <AnimationRevealPage>
      <Hero />
      <FeatureStats/>
      <Features 
        heading={<>Amazing <HighlightedText>Features</HighlightedText></>}
      />
      <MainFeature
        heading={<>Cloud built by and for <HighlightedText>Professionals</HighlightedText></>}
      />
      <Testimonial 
        heading={<>Our Clients <HighlightedText>Love Us</HighlightedText></>}
      />
      <Pricing 
        heading={<>Flexible <HighlightedText>Plans</HighlightedText></>}
      />
      <FAQ
        heading={<>Any <HighlightedText>Questions ?</HighlightedText></>}
      />
      <Blog
        subheading="Blog"
        heading={<>We love <HighlightedText>Writing</HighlightedText></>}
      />
      <GetStarted/>
      <Footer />
    </AnimationRevealPage>
  );
}
