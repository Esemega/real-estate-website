import {
  getPropertyList,
  getSaleTypeList,
  getProvinceList,
} from './property-list.api';
import {
  addPropertyRows,
  setOptions,
  clearPropertyRows,
} from './property-list.helpers';
import {
  mapPropertyListFromApiToVm,
  mapFilterToQueryParams,
} from './property-list.mappers';
import {
  roomOptions,
  bathRoomOptions,
  minPriceOptions,
  maxPriceOptions,
} from './property-list.constants';
import { onUpdateField, onSubmitForm } from '../../common/helpers';

Promise.all([getPropertyList(), getSaleTypeList(), getProvinceList()]).then(
  ([propertyList, saleTypeList, provinceList]) => {
    loadPropertyList(propertyList);
    setAllOptions([saleTypeList, provinceList]);
  }
);


const loadPropertyList = (propertyList) =>
  addPropertyRows(mapPropertyListFromApiToVm(propertyList));

const filterConstantOptions = [
  {
    nameInFilterObject: 'minRooms',
    listName: roomOptions,
    id: 'select-room',
    defaultValue: '¿Habitaciones?',
  },
  {
    nameInFilterObject: 'minBathrooms',
    listName: bathRoomOptions,
    id: 'select-bathroom',
    defaultValue: '¿Cuartos de baño?',
  },
  {
    nameInFilterObject: 'minPrice',
    listName: minPriceOptions,
    id: 'select-min-price',
    defaultValue: 'Min (EUR)',
  },
  {
    nameInFilterObject: 'maxPrice',
    listName: maxPriceOptions,
    id: 'select-max-price',
    defaultValue: 'Max (EUR)',
  },
];

const filterServerOptions = [
  {
    nameInFilterObject: 'salesTypeId',
    listFromServer: [],
    id: 'select-sale-type',
    defaultValue: '¿Qué venta?',
  },
  {
    nameInFilterObject: 'provinceId',
    listFromServer: [],
    id: 'select-province',
    defaultValue: '¿Dónde?',
  },
];

const setAllOptions = ([saleTypeList, provinceList]) => {
  filterServerOptions[0].listFromServer = saleTypeList;
  filterServerOptions[1].listFromServer = provinceList;

  filterServerOptions.map((option) => {
    setOptions(option.listFromServer, option.id, option.defaultValue);
  });

  filterConstantOptions.map((option) => {
    setOptions(option.listName, option.id, option.defaultValue);
  });
};

let filter = {
  salesTypeId: '',
  provinceId: '',
  minRooms: '',
  minBathrooms: '',
  minPrice: '',
  maxPrice: '',
};

const onUpdateAllField = () => {
  const filterOptions = [...filterServerOptions, ...filterConstantOptions];

  filterOptions.map((option) => {
      onUpdateField(option.id, (event) => {
        const value = event.target.value;
        filter = {
          ...filter,
          [option.nameInFilterObject]: value,
        };
      });
    });

};

onUpdateAllField();

onSubmitForm('search-button', () => {
  const queryParams = mapFilterToQueryParams(filter);
  clearPropertyRows();
  getPropertyList(queryParams).then((propertyList) => {
    loadPropertyList(propertyList);
  });
});
