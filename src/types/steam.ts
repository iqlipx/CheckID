export interface SteamProfile {
  code: string;
  message: string;
  data: {
    player: {
      meta: {
        steamid: string;
        personaname: string;
        profileurl: string;
        avatar: string;
        timecreated: number;
      };
      id: string;
      avatar: string;
      username: string;
    };
  };
}