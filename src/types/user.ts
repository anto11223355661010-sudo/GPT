export interface Friend {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  points: number;
  week: string;
}
