import * as yup from 'yup';

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .matches(emailReg, 'Email is Invalid')
    .email('Email is Invalid')
    .required('Email is Required'),
  password: yup.string().required('Password is Required'),
});

export const registerValidation = yup.object().shape({
  email: yup
    .string()
    .matches(emailReg, 'Email is Invalid')
    .email('Email is Invalid')
    .required('Email is Required'),
  password: yup
    .string()
    .required('Password is Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  name: yup.string().required('Name is Required'),
  surName: yup.string().required('Surname is Required'),
  insta: yup.string(),
  confirmPass: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const emailValidation = yup.object().shape({
  email: yup
    .string()
    .matches(emailReg, 'Email is Invalid')
    .email('Email is Invalid')
    .required('Email is Required'),
});

export const resetPassValidation = yup.object().shape({
  code: yup.string().required('Enter Code'),
  password: yup
    .string()
    .required('Password is Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  repeatPass: yup.string().oneOf([yup.ref('password')], 'Password must match'),
});

export const verifyEmailValidation = yup.object().shape({
  code: yup.string().required('Enter Code'),
});

export const priceValidation = yup.object().shape({
  price: yup.string().required('Enter Price'),
});
export const profileValidation = yup.object().shape({
  name: yup.string().required('Enter name'),
  surName: yup.string().required('Enter surname'),
  insta: yup.string(),
  program: yup.string(),
});

export const changeCredentialsValidation = yup.object().shape({
  code: yup.string().required('Enter code'),
  newEmail: yup.string().required('Enter email'),
  newPassword: yup
    .string()
    .required('Password is Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  repeatPass: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Password must match'),
});

export const degreeValidation = yup.object().shape({
  degree: yup.string().required('Enter your degree program'),
});

//Initial values
export const loginInitialValues = {
  email: '',
  password: '',
};
export const registerInitialValues = {
  email: '',
  password: '',
  name: '',
  surName: '',
  confirmPass: '',
  insta: '@ ',
};

export const emailSelectionInitialValues = {
  email: '',
};

export const resetPassInitialValues = {
  code: '',
  password: '',
  repeatPass: '',
};
export const verifyEmailInitialValue = {
  code: '',
};

export const priceInitialValue = {
  price: '',
};
export const degreeInitialValue = {
  degree: '',
};
