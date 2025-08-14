export default function Homepage({ onNavigate }) {

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      {/* Header section with navigation */}
      <header className="py-4 bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl text-yellow-400">
              <img src={require("../assets/OnlyFacts.png")} alt="Only Facts" className="h-8" />
            </span>
            <h1 className="text-2xl font-bold">Only Facts</h1>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            Explore Threads
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Cut through the noise.<br />Get just the facts.
            </h2>
            <p className="lg:text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Only Facts delivers concise, unbiased news summaries so you can stay informed in minutes, not hours.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => onNavigate('search')}
                className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-xl hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105"
              >
                Try It Free
              </button>
              <button className="px-8 py-4 bg-gray-800 text-gray-200 font-bold rounded-full shadow-xl hover:bg-gray-700 transition-transform duration-300 transform hover:scale-105">
                How It Works
              </button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-12">Why Only Facts?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">⏱️</div>
                <h4 className="text-xl font-semibold mb-2">Save Time</h4>
                <p className="text-gray-400">Get the essence of news stories in 60 seconds or less.</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🧠</div>
                <h4 className="text-xl font-semibold mb-2">AI-Powered</h4>
                <p className="text-gray-400">Our algorithms extract key facts without editorial bias.</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-xl font-semibold mb-2">Multi-Source</h4>
                <p className="text-gray-400">Summaries compiled from multiple reputable sources.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-8">What Our Users Say</h3>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-700">
              <p className="text-lg italic text-gray-300 mb-6">"Only Facts has changed how I consume news. I'm informed without feeling overwhelmed."</p>
              <div className="flex items-center justify-center">
                <div className="text-4xl mr-4">👩‍💼</div>
                <div className="text-left">
                  <strong className="block text-xl">Sarah K.</strong>
                  <span className="text-gray-400">Busy Professional</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-950 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-3xl text-yellow-400">⚡</span>
            <h2 className="text-2xl font-bold">Only Facts</h2>
          </div>
          <p className="text-gray-500 mb-4">Just the facts. Nothing else.</p>
          <div className="flex justify-center space-x-6 text-gray-400 text-sm mb-4">
            <a href="/" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="/" className="hover:text-yellow-400 transition-colors">Privacy</a>
            <a href="/" className="hover:text-yellow-400 transition-colors">Terms</a>
            <a href="/" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
          <p className="text-gray-600 text-sm">© 2023 Only Facts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};