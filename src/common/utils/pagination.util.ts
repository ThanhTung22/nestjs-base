const calculateSkipPagination = (page = 1, limit = 10) => {
  return (page - 1) * limit;
};

export { calculateSkipPagination };
