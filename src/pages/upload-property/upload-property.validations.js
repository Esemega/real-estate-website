import { Validators, createFormValidation } from '@lemoncode/fonk';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';
import { isUrl } from '@lemoncode/fonk-is-url-validator';
import { isNumber } from '@lemoncode/fonk-is-number-validator';

const requiredMessage = 'Por favor, rellene este campo obligatorio.';
const numberMessage = 'Por favor, introduzca un número.';
const arrayRequiredMessage = 'Por favor, introduzca al menos una.';
const validEmailMessage = 'Por favor, introduzca un email válido.';
const validPhoneMessage = 'Por favor, introduzca un telefono válido.';
const validUrlMessage = 'Por favor, introduzca una url válida.';

const validationSchema = {
  field: {
    title: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
    ],
    notes: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
    ],
    email: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
      {
        validator: Validators.email,
        message: validEmailMessage,
      },
    ],
    phone: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
      {
        validator: Validators.pattern,
        customArgs: { pattern: '^(7|8|9|6)\\d{8}$' },
        message: validPhoneMessage,
      },
    ],
    price: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
      {
        validator: isNumber.validator,
        message: numberMessage,
      },
    ],
    saleTypes: [
      {
        validator: arrayRequired.validator,
        message: arrayRequiredMessage,
      },
    ],
    address: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
    ],
    city: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
    ],
    province: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
    ],
    squareMeter: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
      {
        validator: isNumber.validator,
        message: numberMessage,
      },
    ],
    rooms: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
      {
        validator: isNumber.validator,
        message: numberMessage,
      },
    ],
    bathrooms: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
      {
        validator: isNumber.validator,
        message: numberMessage,
      },
    ],
    locationUrl: [
      {
        validator: Validators.required,
        message: requiredMessage,
      },
      {
        validator: isUrl.validator,
        message: validUrlMessage,
      },
    ],
    mainFeatures: [
      {
        validator: arrayRequired.validator,
        message: arrayRequiredMessage,
      },
    ],
    // equipments: [
    //     {
    //     validator: arrayRequired.validator,
    //     message: arrayRequiredMessage
    //     }
    // ],
    // images: [
    //     {
    //     validator: arrayRequired.validator,
    //     message: arrayRequiredMessage
    //     }
    // ],
  },
};

export const formValidation = createFormValidation(validationSchema);
