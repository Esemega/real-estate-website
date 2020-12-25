import Axios from 'axios';

const urlProperties = `${process.env.BASE_API_URL}/properties`;

export const getPropertyList = (queryParams) =>
  Axios.get(`${urlProperties}?${queryParams}`).then(({ data }) => data);

const urlSalesTypes = `${process.env.BASE_API_URL}/saleTypes`;

export const getSaleTypeList = () =>
  Axios.get(urlSalesTypes).then(({ data }) => data);

const urlProvinces = `${process.env.BASE_API_URL}/provinces`;

export const getProvinceList = () =>
  Axios.get(urlProvinces).then(({ data }) => data);
