export interface QueueInfo {
  name: string;
}

export interface PlayerInfo extends QueueInfo {
  startAt: string;
  cabinet: "left" | "right";
}
