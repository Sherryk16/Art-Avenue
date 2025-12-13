import type { Metadata } from "next";
import LoadingScreen from '../components/LoadingScreen';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: "Art Avenue | Your Gateway to Exquisite Art",
  description: "Welcome to our gaming art studio your one stop destination for high quality custom logos, banners, emotes, overlays, and hand-drawn illustrations. We specialize in creating unique and eye catching artwork for gamers, streamers, YouTubers, and content creators who want to build a strong, memorable online identity.",
};

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Services />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
