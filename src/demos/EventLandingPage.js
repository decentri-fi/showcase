import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.jsx";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import Features from "components/features/VerticalWithAlternateImageAndText.jsx";
import Blog from "components/blogs/ThreeColSimpleWithImage.js";
import Testimonial from "components/testimonials/TwoColumnWithImage.js";
import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/SimpleFiveColumn.jsx";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <Features />
    <Blog />
    <Testimonial />
    <ContactUsForm />
    <Footer />
  </AnimationRevealPage>
);
