const { log, table, group, groupEnd } = console;

const logTable = (message: string, data: unknown, label?: string) => {
  group(label ?? message);
  log(message);
  table(data);
  groupEnd();
};

export { log, logTable, group, groupEnd };
