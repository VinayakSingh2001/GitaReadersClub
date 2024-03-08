import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Offer from "./components/Offer";
import HeroBanner from "./components/HeroBanner";
import MissionVision from "./pages/MissionVision";
import SocialMediaPages from "./pages/SocialMediaPages";
import About from "./pages/About";
import Quotes from "./pages/Quotes";
import QuoteBox from "./components/QuoteBox";
import Courses from "./pages/Courses";
import Feedback from "./pages/Feedback";
import Speakers from "./pages/Speakers";
import UpScroller from "./components/UpScroller";
import Notification from "./components/Notification";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route />
        </Routes>
      </BrowserRouter>
      <Header />
      <HeroBanner />
      {/* <Notification /> */}
      <MissionVision />
      <SocialMediaPages />
      <About />
      <Quotes />
      <Courses />
      <Speakers />

      <Feedback />
      <Footer />
    </>
  );
}

export default App;
