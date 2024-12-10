export const Day = "06";

export const wait = (timeInMS: number = 25) =>
  new Promise((resolve) => setTimeout(resolve, timeInMS));

export const directionOrder = ["north", "east", "south", "west"];
export const Direction = {
  north: 0,
  east: 1,
  south: 2,
  west: 3,
};

export const direction: Record<number, string> = {
  0: "^",
  1: ">",
  2: "v",
  3: "<",
};
