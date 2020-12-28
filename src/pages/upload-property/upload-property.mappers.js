export const mapPropertyFromVmToApi = (vmProperty) => {
  let {
    saleTypes,
    province,
    equipments,
    newFeature,
    ...apiProperty
  } = vmProperty;

  apiProperty = {
    ...apiProperty,
    price: Number(vmProperty.price),
    saleTypeIds: vmProperty.saleTypes,
    provinceId: vmProperty.province,
    squareMeter: Number(vmProperty.squareMeter),
    rooms: Number(vmProperty.rooms),
    bathrooms: Number(vmProperty.bathrooms),
    equipmentIds: vmProperty.equipments,
  };
  return apiProperty;
};
