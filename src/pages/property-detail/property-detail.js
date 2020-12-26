import { getPropertyById, getEquipments } from './property-detail.api';
import { history } from '../../core/router';
import { setPropertyValues } from './property-detail.helpers';
import { mapPropertyFromApiToVm } from './property-detail.mappers';

const { id } = history.getParams();

Promise.all([getPropertyById(id), getEquipments()]).then(
  ([property, equipments]) => {
    setPropertyValues(mapPropertyFromApiToVm(property, equipments));
  }
);
