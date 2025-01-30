import { useState, useEffect } from "react";
import { format, fromUnixTime } from "date-fns";
import { SearchInput } from "../components/SearchInput";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useStore } from "../store/useStore";
import { ExternalLink, Gamepad2Icon } from "lucide-react";

export function SteamLookup() {
  const [steamId, setSteamId] = useState("");
  const {
    loading,
    error,
    setLoading,
    setError,
    setSteamProfile,
    steamProfile,
    resetSteam,
  } = useStore();

  useEffect(() => {
    return () => {
      resetSteam();
      setSteamId("");
    };
  }, [resetSteam]);

  const handleSearch = async () => {
    if (!steamId.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://playerdb.co/api/player/steam/${steamId}`
      );
      if (!response.ok) throw new Error("Player not found");

      const data = await response.json();
      setSteamProfile(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch player data"
      );
      setSteamProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp) return "Not available";
    try {
      return format(fromUnixTime(timestamp), "PPP");
    } catch (err) {
      return "Invalid date";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Steam Player Lookup</h1>
        <p className="text-gray-400">
          Enter a Steam ID or Username to View Their Profile
        </p>
      </div>

      <SearchInput
        value={steamId}
        onChange={setSteamId}
        onSearch={handleSearch}
        placeholder="Enter Steam ID..."
      />

      {loading && <LoadingSpinner />}

      {error && (
        <div className="text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {steamProfile && (
        <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-4">
              {steamProfile.data.player.avatar ? (
                <img
                  src={steamProfile.data.player.avatar}
                  alt={steamProfile.data.player.username}
                  className="w-20 h-20 rounded-full bg-gray-700"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.removeAttribute(
                      "style"
                    );
                  }}
                />
              ) : null}
              <div
                className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center"
                style={{
                  display: steamProfile.data.player.avatar ? "none" : "flex",
                }}
              >
                <Gamepad2Icon className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {steamProfile.data.player.meta.personaname}
                </h2>
                <p className="text-gray-400">
                  Steam ID: {steamProfile.data.player.id}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p>
                <span className="text-gray-400">Account Created:</span>{" "}
                {formatDate(steamProfile.data.player.meta.timecreated)}
              </p>
            </div>

            <div className="mt-6">
              <a
                href={steamProfile.data.player.meta.profileurl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors w-fit"
              >
                <ExternalLink className="h-4 w-4" />
                View Steam Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
