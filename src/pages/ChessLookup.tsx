import { useState, useEffect } from 'react';
import { format, fromUnixTime } from 'date-fns';
import { SearchInput } from '../components/SearchInput';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useStore } from '../store/useStore';
import { ExternalLink, Twitch, CrownIcon } from 'lucide-react';

export function ChessLookup() {
  const [username, setUsername] = useState('');
  const { loading, error, setLoading, setError, setChessProfile, chessProfile } = useStore();

  const handleSearch = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.chess.com/pub/player/${username}`);
      if (!response.ok) throw new Error('Player not found');
      
      const data = await response.json();
      setChessProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch player data');
      setChessProfile(null);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    return () => {
      setChessProfile(null);
      setError(null);
    };
  }, [setChessProfile, setError]);

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Chess.com Player Lookup</h1>
        <p className="text-gray-400">Enter a Chess.com username to view their profile</p>
      </div>

      <SearchInput
        value={username}
        onChange={setUsername}
        onSearch={handleSearch}
        placeholder="Enter Chess.com username..."
      />

      {loading && <LoadingSpinner />}

      {error && (
        <div className="text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {chessProfile && (
        <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              {chessProfile.avatar ? (
                <img
                  src={chessProfile.avatar}
                  alt={chessProfile.username}
                  className="w-20 h-20 rounded-full bg-gray-700"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.removeAttribute('style');
                  }}
                />
              ) : null}
              <div
                className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center"
                style={{ display: chessProfile.avatar ? 'none' : 'flex' }}
              >
                <CrownIcon className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {chessProfile.title && (
                    <span className="text-yellow-500">[{chessProfile.title}]</span>
                  )}
                  {chessProfile.username}
                </h2>
                {chessProfile.name && (
                  <p className="text-gray-400">{chessProfile.name}</p>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">Followers:</span>{' '}
                  {chessProfile.followers.toLocaleString()}
                </p>
                <p>
                  <span className="text-gray-400">Location:</span>{' '}
                  {chessProfile.location || 'Not specified'}
                </p>
                <p>
                  <span className="text-gray-400">League:</span>{' '}
                  {chessProfile.league}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-400">Joined:</span>{' '}
                  {format(fromUnixTime(chessProfile.joined), 'PPP')}
                </p>
                <p>
                  <span className="text-gray-400">Last Online:</span>{' '}
                  {format(fromUnixTime(chessProfile.last_online), 'PPP')}
                </p>
                <p>
                  <span className="text-gray-400">Status:</span>{' '}
                  <span className="capitalize">{chessProfile.status}</span>
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={chessProfile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                View Profile
              </a>
              {chessProfile.twitch_url && (
                <a
                  href={chessProfile.twitch_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Twitch className="h-4 w-4" />
                  Watch on Twitch
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
