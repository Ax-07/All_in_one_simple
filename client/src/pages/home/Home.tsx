// src/pages/Home.js
import React from 'react';
import Features from './components/features/Features';
import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import Pricing from './components/pricing/Pricing';
import Contact from './components/contact/Contact';
import Testimonials from './components/testimonials/Testimonials';

const Home: React.FC = () => {

  return (
    <>
      <Navbar/>
      <Hero/>
      <Features />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
