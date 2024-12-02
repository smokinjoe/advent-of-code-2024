import fs from "fs";

export const getFilename = (day: string): string => {
  const filename =
    process.env.RUN_EXAMPLE === "true"
      ? `day-${day}-example.txt`
      : `day-${day}.txt`;
  // const data = readFile(filename);
  return filename;
};

export const readFile = (filename: string): string => {
  return fs.readFileSync(`./src/data/${filename}`, "utf8");
};
