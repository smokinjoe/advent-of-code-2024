import fs from "fs";

export const getFilename = (day: string, part: string = ""): string => {
  const partString = part ? `-${part}` : "";

  const filename =
    process.env.RUN_EXAMPLE === "true"
      ? `day-${day}${partString}-example.txt`
      : `day-${day}${partString}.txt`;
  return filename;
};

export const readFile = (filename: string): string => {
  return fs.readFileSync(`./src/data/${filename}`, "utf8");
};
