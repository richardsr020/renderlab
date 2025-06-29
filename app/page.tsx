import Head from 'next/head';

import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import Pricing from '@/components/home/Pricing';
import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>MonSaaS - Boost your productivity</title>
      </Head>

      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}

