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
  description: "Discover and collect unique artworks from emerging and established artists. Art Avenue offers a curated selection of paintings, sculptures, and digital art to enhance your space and inspire your life.",
};

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <Portfolio />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
