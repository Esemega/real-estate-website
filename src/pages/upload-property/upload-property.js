import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
  onAddFile,
} from '../../common/helpers';
import {
  getSaleTypes,
  getEquipments,
  getProvinces,
  uploadProperty,
} from './upload-property.api';
import {
  setCheckboxList,
  setOptionList,
  onAddFeature,
  formatDeleteFeatureButtonId,
  onRemoveFeature,
  onAddImage,
} from './upload-property.helpers';
import { formValidation } from './upload-property.validations';
import { mapPropertyFromVmToApi } from './upload-property.mappers';
import { history, routes } from '../../core/router';

Promise.all([getSaleTypes(), getEquipments(), getProvinces()]).then(
  ([saleTypesList, equipmentsList, provincesList]) => {
    setCheckboxList(saleTypesList, 'saleTypes');
    setCheckboxList(equipmentsList, 'equipments');
    setOptionList(provincesList, 'province');
  }
);

let newProperty = {
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  saleTypes: [],
  address: '',
  city: '',
  province: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  newFeature: '',
  mainFeatures: [],
  equipments: [],
  images: [],
};

const validateField = (field) => {
  formValidation.validateField(field, newProperty[field]).then((result) => {
    onSetError(field, result);
  });
};

//String Properties
Object.entries(newProperty)
  .filter(([, value]) => typeof value === 'string')
  .map(([keyName]) => {
    onUpdateField(keyName, (event) => {
      const value = event.target.value;
      newProperty = {
        ...newProperty,
        [keyName]: value,
      };

      validateField(keyName);
    });
  });

// Array checkbox properties => saleTypes && equipments
Object.entries(newProperty)
  .filter(
    ([keyName, value]) =>
      typeof value === 'object' &&
      (keyName === 'saleTypes' || keyName === 'equipments')
  )
  .map(([keyName]) => {
    onUpdateField(keyName, (event) => {
      const value = event.target.value;
      if (event.target.checked) {
        // if not checked => Add
        newProperty[keyName].push(value);
      } else {
        //if checked => delete
        const index = newProperty[keyName].indexOf(event.target.value);
        newProperty[keyName].splice(index, 1);
      }

      validateField(keyName);
    });
  });

// Array images properties => images base64
Object.entries(newProperty)
  .filter(
    ([keyName, value]) => typeof value === 'object' && keyName === 'images'
  )
  .map(([keyName]) => {
    onUpdateField('add-image', (event) => {
      const imageFile = event.target.files[0];
      if (imageFile) {
        onAddFile('add-image', (image) => {
          onAddImage(image);
          newProperty.images.push(image);
        });
      }

      validateField(keyName);
    });
  });

//MANAGE FEATURE
const onDelete = (featureToDelete) => {
  onSubmitForm(formatDeleteFeatureButtonId(featureToDelete), () => {
    const index = newProperty.mainFeatures.indexOf(featureToDelete);
    newProperty.mainFeatures.splice(index, 1);
    onRemoveFeature(featureToDelete);
  });
};

onSubmitForm('insert-feature-button', () => {
  const index = newProperty.mainFeatures.push(newFeature.value) - 1;
  onAddFeature(newProperty.newFeature);
  onDelete(newProperty.mainFeatures[index]);
});

const onSave = () => {
  const apiProperty = mapPropertyFromVmToApi(newProperty);
  return uploadProperty(apiProperty);
};

//ON SUBMIT FORM
onSubmitForm('save-button', () => {
  formValidation.validateForm(newProperty).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      onSave().then((apiProperty) => {
        history.push(routes.propertyList);
      });
    }
  });
});
