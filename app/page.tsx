import LoadingScreen from '../components/LoadingScreen';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

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
