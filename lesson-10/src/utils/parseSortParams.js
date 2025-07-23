function parseSortBy(value) {
  if (typeof value === 'undefined') {
    return '_id';
  }

  const keys = ['_id', 'name', 'year', 'createdAt'];

  if (keys.includes(value) !== true) {
    return '_id';
  }

  return value;
}

function parseSortOrder(value) {
  if (typeof value === 'undefined') {
    return 'asc'; // ascending
  }

  if (value !== 'asc' && value !== 'desc') {
    return 'asc'; // ascending;
  }

  return value;
}

export function parseSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
}
