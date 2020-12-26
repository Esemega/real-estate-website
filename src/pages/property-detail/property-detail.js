import {
  getPropertyById,
  getEquipments,
  sendContact,
} from './property-detail.api';
import { history } from '../../core/router';
import { setPropertyValues } from './property-detail.helpers';
import {
  mapPropertyFromApiToVm,
  mapContactFromVmToApi,
} from './property-detail.mappers';
import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
  onSetValues,
} from '../../common/helpers';
import { formValidation } from './property-detail.validations';

const { id } = history.getParams();

Promise.all([getPropertyById(id), getEquipments()]).then(
  ([property, equipments]) => {
    setPropertyValues(mapPropertyFromApiToVm(property, equipments));
  }
);

let contact = {
  email: '',
  message: '',
};

const onUpdateAllFileds = () => {
  Object.keys(contact).map((keyName) => {
    onUpdateField(keyName, (event) => {
      const value = event.target.value;
      contact = {
        ...contact,
        [keyName]: value,
      };

      formValidation.validateField(keyName, contact[keyName]).then((result) => {
        onSetError(keyName, result);
      });
    });
  });
};

onUpdateAllFileds();

const onContact = () => {
  const apiContact = mapContactFromVmToApi(contact, id);
  return sendContact(apiContact);
};

const resetContactData = () => {
  contact = {
    email: '',
    message: '',
  };
  onSetValues(contact);
};

onSubmitForm('contact-button', () => {
  formValidation.validateForm(contact).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      onContact().then((apiContact) => {
        console.log({ contact });
        console.log({ apiContact });
        window.alert(
          'Gracias por confiar en nosotros. Le contactaremos lo antes posible.'
        );
        resetContactData();
      });
    }
  });
});
