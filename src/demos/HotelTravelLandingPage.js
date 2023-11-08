import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.jsx";
import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/ThreeColSimple.jsx";
import MainFeature from "components/features/TwoColSingleFeatureWithStats.jsx";
import SliderCard from "components/cards/ThreeColSlider.js";
import TrendingCard from "components/cards/TwoTrendingPreviewCardsWithImage.js";
import Blog from "components/blogs/PopularAndRecentBlogPosts.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "components/faqs/SimpleWithSideImage.jsx";
import SubscribeNewsLetterForm from "components/forms/SimpleSubscribeNewsletter.js";
import Footer from "components/footers/MiniCenteredFooter.jsx";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <Features />
    <SliderCard />
    <TrendingCard />
    <MainFeature />
    <Blog />
    <Testimonial textOnLeft={true}/>
    <FAQ />
    <SubscribeNewsLetterForm />
    <Footer />
  </AnimationRevealPage>
);
