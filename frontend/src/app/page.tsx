import About from "../components/about";
import Spaces from "../components/spaces";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative flex flex-col min-h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/coworking-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black/20" />
        <main className="flex-1 flex flex-col items-center justify-center text-center text-white pt-24 px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Work, Connect & Grow at <span className="text-blue-500">IJURU HUB</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow">
            Kigali’s modern co-working hub for freelancers, entrepreneurs, and
            professionals.
          </p>
           {/* Action Buttons */}
  <div className="flex space-x-6">
    <a
      href="#about"
      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
    >
      Explore
    </a>
    <a
      href="#pricing"
      className="px-6 py-3 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition"
    >
      Pricing
    </a></div>
        </main>
      </section>

      {/* About Section */}
      <About />
      {/* Spaces Section */}
      <Spaces />
      
    </div>
  );
}
