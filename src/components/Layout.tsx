import { Link, Outlet } from 'react-router-dom';
import { Gamepad2Icon as GameController, CrownIcon as ChessKnight, Fingerprint } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Fingerprint className="h-8 w-8 text-indigo-500" />
                <span className="text-xl font-bold">CheckID</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/chess"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                <ChessKnight className="h-5 w-5 mr-2" />
                Chess.com
              </Link>
              <Link
                to="/steam"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                <GameController className="h-5 w-5 mr-2" />
                Steam
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}