type SortOrder = "asc" | "desc";
type SortParam<T> = [keyof T, SortOrder?];

export function sortingSpecification<T>(
  ...params: SortParam<T>[]
) {
  return (x: T, y: T) => {
    return params.reduce((acc, [key, order = "asc"]) => {
      const modifier = order === "asc" ? 1 : -1;
      return acc || modifier * compare(x[key], y[key]);
    }, 0);
  };
}

export function compare<T>(str1: T, str2: T) {
  if (str1 < str2) {
    return -1;
  }
  if (str1 > str2) {
    return 1;
  }
  return 0;
}
