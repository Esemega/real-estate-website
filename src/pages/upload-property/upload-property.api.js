import Axios from "axios";

const urlSaleTypes = `${process.env.BASE_API_URL}/saleTypes`;

export const getSaleTypes = () =>
  Axios.get(urlSaleTypes).then(({ data }) => data);

const urlEquipments = `${process.env.BASE_API_URL}/equipments`;

export const getEquipments = () =>
  Axios.get(urlEquipments).then(({ data }) => data);

const urlProvinces = `${process.env.BASE_API_URL}/provinces`;

export const getProvinces = () =>
  Axios.get(urlProvinces).then(({ data }) => data);
