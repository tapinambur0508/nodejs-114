function parseYear(value) {
  if (typeof value === 'undefined') {
    return undefined;
  }

  const parsedYear = parseInt(value);

  if (Number.isNaN(parseYear) === true) {
    return undefined;
  }

  return parsedYear;
}

export function parseFilterParams(query) {
  const { minYear, maxYear } = query;

  const parsedMinYear = parseYear(minYear);
  const parsedMaxYear = parseYear(maxYear);

  return {
    minYear: parsedMinYear,
    maxYear: parsedMaxYear,
  };
}
