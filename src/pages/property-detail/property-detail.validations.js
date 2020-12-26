import {Validators, createFormValidation} from '@lemoncode/fonk';

const validationSchema = {
    field: {
        email: [
            {
                validator: Validators.required,
                message: 'Por favor, rellene este campo obligatorio.'
            },
             {
                 validator: Validators.email,
                 message: 'Por favor, introduzca un email válido.'
             }
        ],
        message: [
            {
            validator: Validators.required,
            message: 'Por favor, rellene este campo obligatorio.'
            }
        ]
    },
};

export const formValidation = createFormValidation(validationSchema);