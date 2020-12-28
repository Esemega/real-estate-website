import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
  onAddFile,
  onSetValues,
} from '../../common/helpers';
import {
  getSaleTypes,
  getEquipments,
  getProvinces,
} from './upload-property.api';
import {
  setCheckboxList,
  setOptionList,
  onAddFeature,
  formatDeleteFeatureButtonId,
  onRemoveFeature,
  onAddImage,
  formatCheckboxId,
} from './upload-property.helpers';

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

      // formValidation.validateField(keyName, contact[keyName]).then((result) => {
      //   onSetError(keyName, result);
      // });
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

      // formValidation.validateField(keyName, contact[keyName]).then((result) => {
      //   onSetError(keyName, result);
      // });
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

      // formValidation.validateField(keyName, contact[keyName]).then((result) => {
      //   onSetError(keyName, result);
      // });
    });
  });

//MANAGE FEATURE
const onDelete = (featureToDelete) => {
  // console.log({featureToDelete})
  // console.log(formatDeleteFeatureButtonId(featureToDelete))
  onSubmitForm(formatDeleteFeatureButtonId(featureToDelete), () => {
    const index = newProperty.mainFeatures.indexOf(featureToDelete);
    newProperty.mainFeatures.splice(index, 1);
    onRemoveFeature(featureToDelete);
    // console.log('mainFeatures', newProperty.mainFeatures);
  });
};

onSubmitForm('insert-feature-button', () => {
  const index = newProperty.mainFeatures.push(newFeature.value) - 1;
  onAddFeature(newProperty.newFeature);
  // console.log('mainFeatures', newProperty.mainFeatures);

  onDelete(newProperty.mainFeatures[index]);
});

//ON SUBMIT FORM
onSubmitForm('save-button', () => {
  console.log(newProperty);
  // formValidation.validateForm(contact).then((result) => {
  //   onSetFormErrors(result);
  //   if (result.succeeded) {
  //     onContact().then((apiContact) => {
  //       console.log({ contact });
  //       console.log({ apiContact });
  //       window.alert(
  //         'Gracias por confiar en nosotros. Le contactaremos lo antes posible.'
  //       );
  //       resetContactData();
  //     });
  //   }
  // });
});
