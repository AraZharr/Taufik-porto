import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';
import Loading from '../components/common/Loading';

const Home = () => {
  const [heroData, setHeroData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, aboutRes, contactRes] = await Promise.all([
          api.get('/hero'),
          api.get('/about'),
          api.get('/contact')
        ]);
        setHeroData(heroRes.data.data);
        setAboutData(aboutRes.data.data);
        setContactData(contactRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero data={heroData} />
      <About data={aboutData} />
      <Contact data={contactData} />
      <Footer />
    </div>
  );
};

export default Home;
