const { log, table, group, groupEnd } = console;

type LogTable<T> = {
  message?: string;
  data: T;
  label?: string;
};

const logTable = <T>({ message, data, label }: LogTable<T>) => {
  if (label) group(label);
  if (message) log(message);
  table(data);
  if (label) groupEnd();
};

export { log, logTable, group, groupEnd };
