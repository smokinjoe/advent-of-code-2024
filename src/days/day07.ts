import { getFilename, readFile } from "../util/readFile";
import { log } from "../util/log";
import { assertIsDefined } from "../util/assertions";

const Day = "07";

type Operation = {
  target: number;
  operands: number[];
};

const parseData = (operationRows: string[]) => {
  const operations: Operation[] = operationRows.map((row) => {
    const [targetString, operandsString] = row.split(":");

    const target = parseInt(targetString);
    const operands = operandsString
      .split(" ")
      .map((operand) => parseInt(operand));

    operands.shift();

    return {
      target,
      operands,
    };
  });

  return operations;
};

const evaluate = (
  index: number,
  target: number,
  operand: number,
  remainingOperands: number[]
): boolean => {
  const nextOperand = remainingOperands[index];

  const add = operand + nextOperand;
  const multiply = operand * nextOperand;
  const concat = parseInt(`${operand}${nextOperand}`);

  if (index === remainingOperands.length - 1) {
    if (add === target || multiply === target || concat === target) {
      return true;
    }

    return false;
  }

  return (
    evaluate(index + 1, target, add, remainingOperands) ||
    evaluate(index + 1, target, multiply, remainingOperands) ||
    evaluate(index + 1, target, concat, remainingOperands)
  );
};

export const partOne = () => {
  const filename = getFilename(Day);
  const data = readFile(filename);
  const operationRows = data.split("\n");

  const operations = parseData(operationRows);

  const result = operations.filter((operation) => {
    const { target, operands } = operation;
    const operand = operands[0];
    assertIsDefined(operand);
    return evaluate(1, target, operand, operands);
  });

  const sum = result.reduce((acc, operation) => {
    return acc + operation.target;
  }, 0);

  log("Part one sum: ", sum);
};
export const partTwo = () => log("Not implemented");
