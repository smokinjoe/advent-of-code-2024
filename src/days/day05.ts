import { assertIsDefined } from "../util/assertions";
import { log } from "../util/log";
import { readFile, getFilename } from "../util/readFile";

const Day = "05";

const parseData = (data: string[]): [string[], string[]] => {
  const rules: string[] = [];
  const updates: string[] = [];

  let endOfRules = false;

  data.forEach((line) => {
    if (line === "") {
      endOfRules = true;
      return;
    }

    if (!endOfRules) {
      rules.push(line);
    } else {
      updates.push(line);
    }
  });

  return [rules, updates];
};

const parseRuleOrder = (rules: string[]): Record<number, number[]> => {
  const ruleOrdering: Record<number, number[]> = {};

  rules.forEach((rule) => {
    const [firstPage, secondPage] = rule.split("|").map((x) => parseInt(x));

    if (!ruleOrdering[firstPage]) {
      ruleOrdering[firstPage] = [];
    }

    ruleOrdering[firstPage].push(secondPage);
  });

  return ruleOrdering;
};

class UpdateValidator {
  private ruleOrdering: Record<number, number[]>;
  private updates: number[][];
  private validUpdates: number[][] = [];
  private invalidUpdates: number[][] = [];
  private repairedUpdates: number[][] = [];

  constructor(ruleOrdering: Record<number, number[]>, updates: number[][]) {
    this.ruleOrdering = ruleOrdering;
    this.updates = updates;
  }

  private isValidUpdate = (update: number[]): boolean => {
    const [firstPage, secondPage] = update;

    if (!this.ruleOrdering[firstPage]) {
      return false;
    }

    return this.ruleOrdering[firstPage].includes(secondPage);
  };

  public validateUpdates = () => {
    let valid = true;

    this.updates.forEach((updates) => {
      updates.forEach((update, index) => {
        if (index > 0) {
          const prevUpdate = updates[index - 1];
          const currentUpdate = update;

          if (!this.isValidUpdate([prevUpdate, currentUpdate])) {
            valid = false;
          }
        }
      });

      if (valid) {
        this.validUpdates.push(updates);
      } else {
        this.invalidUpdates.push(updates);
      }

      valid = true;
    });
  };

  public getValidUpdates = () => {
    return this.validUpdates;
  };

  public getValidityScore = () => {
    return this.validUpdates.reduce((acc, curr) => {
      const middleElement = curr[(curr.length - 1) / 2];
      return acc + middleElement;
    }, 0);
  };

  public repairInvalidUpdates = () => {
    const updatesToRepair = [...this.invalidUpdates];

    let swapping = false;

    do {
      swapping = false;
      for (let i = 0; i < updatesToRepair.length; i++) {
        const updates = updatesToRepair[i];
        for (let j = 0; j < updates.length - 1; j++) {
          const currentUpdate = updates[j];
          const nextUpdate = updates[j + 1];

          if (!this.isValidUpdate([currentUpdate, nextUpdate])) {
            updates[j] = nextUpdate;
            updates[j + 1] = currentUpdate;
            swapping = true;
          }
        }
      }
    } while (swapping);

    this.repairedUpdates = updatesToRepair;
  };

  public getRepairedUpdates = () => {
    return this.repairedUpdates;
  };

  public getRepairedValidityScore = () => {
    return this.repairedUpdates.reduce((acc, curr) => {
      const middleElement = curr[(curr.length - 1) / 2];
      return acc + middleElement;
    }, 0);
  };
}

export const partOne = () => {
  const filename = getFilename(Day);
  const data = readFile(filename).split("\n");

  const [rulesData, updateData] = parseData(data);

  const ruleOrdering = parseRuleOrder(rulesData);
  const updates = updateData.map((updateString) =>
    updateString.split(",").map((x) => parseInt(x))
  );

  const validator = new UpdateValidator(ruleOrdering, updates);
  validator.validateUpdates();
  const validityScore = validator.getValidityScore();

  log("Part One: ", validityScore);
};

export const partTwo = () => {
  const filename = getFilename(Day);
  const data = readFile(filename).split("\n");

  const [rulesData, updateData] = parseData(data);

  const ruleOrdering = parseRuleOrder(rulesData);
  const updates = updateData.map((updateString) =>
    updateString.split(",").map((x) => parseInt(x))
  );

  const validator = new UpdateValidator(ruleOrdering, updates);
  validator.validateUpdates();
  validator.repairInvalidUpdates();
  const validityScore = validator.getRepairedValidityScore();
  log("Part Two: ", validityScore);
};
