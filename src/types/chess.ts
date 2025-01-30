export interface ChessProfile {
  avatar: string;
  player_id: number;
  '@id': string;
  url: string;
  name: string;
  username: string;
  title?: string;
  followers: number;
  country: string;
  location?: string;
  last_online: number;
  joined: number;
  status: string;
  is_streamer: boolean;
  twitch_url?: string;
  verified: boolean;
  league: string;
  streaming_platforms?: {
    type: string;
    channel_url: string;
  }[];
}