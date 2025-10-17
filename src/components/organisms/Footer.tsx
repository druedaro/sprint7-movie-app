export default function Footer() {
  return (
    <footer className="footer-glass mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">🎬 The Corner Database</h3>
            <p className="text-gray-400 text-sm">
              Your platform to explore movies and series. 
              Powered by TMDB API.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  TMDB
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">About</h4>
            <p className="text-sm text-gray-400">
              © 2025 The Corner Database
              <br />
              All rights reserved.
              <br />
              Powered by TMDB and TheCorner.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6">
          <p className="text-center text-sm text-gray-500">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
}