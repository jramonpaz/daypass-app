export const createQueryParams = (params: any) => {
  return new URLSearchParams(params).toString();
};
