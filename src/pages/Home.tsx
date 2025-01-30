import { Link } from 'react-router-dom';
import { CrownIcon as ChessIcon, Gamepad2Icon as GameController } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
      <h1 className="text-4xl font-bold text-center">
       Discover Gamer Profiles Instantly!
      </h1>
      <p className="text-xl text-gray-400 text-center max-w-2xl">
       Search Chess.com & Steam users with ease.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Link
          to="/chess"
          className="flex flex-col items-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ChessIcon className="h-16 w-16 text-indigo-500 mb-4" />
          <h2 className="text-2xl font-semibold">Chess.com</h2>
          <p className="text-gray-400 mt-2 text-center">
            Look up Chess.com player profiles and statistics
          </p>
        </Link>
        <Link
          to="/steam"
          className="flex flex-col items-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <GameController className="h-16 w-16 text-indigo-500 mb-4" />
          <h2 className="text-2xl font-semibold">Steam</h2>
          <p className="text-gray-400 mt-2 text-center">
            Search for Steam player profiles and game details
          </p>
        </Link>
      </div>
    </div>
  );
}