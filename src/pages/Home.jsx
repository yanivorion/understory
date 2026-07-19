import Hero from "../components/Hero";
import JourneyWidget from "../components/JourneyWidget";
import Philosophy from "../components/Philosophy";
import Recognition from "../components/Recognition";
import HomeContact from "../components/HomeContact";
import Gutter from "../components/Gutter";

export default function Home() {
  return (
    <>
      <Hero />
      <Gutter size="lg" />
      <JourneyWidget />
      <Gutter size="lg" tone="dark" />
      <Philosophy />
      <Recognition />
      <Gutter size="md" />
      <HomeContact />
    </>
  );
}
