export const mapContactFromVmToApi = (contact, id) => {
  return {
    email: contact.email,
    message: contact.message,
    propertyId: id,
  };
};

export const mapPropertyFromApiToVm = (property, equipmentsFromServer) => {
  return {
    id: property.id,
    title: property.title,
    notes: property.notes,
    price: `${property.price.toLocaleString()} €`,
    city: property.city,
    squareMeter: `${property.squareMeter}m2`,
    rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
    bathrooms: `${property.bathrooms} ${getBathroomWord(property.bathrooms)}`,
    locationUrl: property.locationUrl,
    mainFeatures: property.mainFeatures,
    equipments: getEquipmentListNames(property.equipmentIds, equipmentsFromServer),
    mainImage: Array.isArray(property.images) ? property.images[0] : '',
    images: Array.isArray(property.images) ? property.images : '',
  };
};

const getRoomWord = (rooms) => {
  return rooms > 1 ? 'habitaciones' : 'habitación';
};

const getBathroomWord = (bathrooms) => {
  return bathrooms > 1 ? 'baños' : 'baño';
};

const getEquipmentName = (id, equipmentList) => {
  return equipmentList.find((equipment) => equipment.id === id).name;
};

const getEquipmentListNames = (equipmentsIds, equipmentsFromServer) => {
  return equipmentsIds.map((id) => getEquipmentName(id, equipmentsFromServer));
};
