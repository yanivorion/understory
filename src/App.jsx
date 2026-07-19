import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Journey from "./pages/Journey";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Studio from "./pages/Studio";
import { ConfigProvider } from "./lib/ConfigProvider";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/journeys/:slug" element={<Journey />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/studio" element={<Studio />} />
    </Routes>
  );
}

function SiteChrome({ children }) {
  const { pathname } = useLocation();
  const isStudio = pathname.startsWith("/studio");
  if (isStudio) return children;
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SiteChrome>
          <AppRoutes />
        </SiteChrome>
      </BrowserRouter>
    </ConfigProvider>
  );
}
