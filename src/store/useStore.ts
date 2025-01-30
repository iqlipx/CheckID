import { create } from 'zustand';
import { ChessProfile } from '../types/chess';
import { SteamProfile } from '../types/steam';

interface Store {
  chessProfile: ChessProfile | null;
  steamProfile: SteamProfile | null;
  loading: boolean;
  error: string | null;
  setChessProfile: (profile: ChessProfile | null) => void;
  setSteamProfile: (profile: SteamProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetSteam: () => void; // Adding resetSteam function
}

export const useStore = create<Store>((set) => ({
  chessProfile: null,
  steamProfile: null,
  loading: false,
  error: null,
  setChessProfile: (profile) => set({ chessProfile: profile }),
  setSteamProfile: (profile) => set({ steamProfile: profile }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetSteam: () => set({ steamProfile: null }), // Function to reset steamProfile
}));
