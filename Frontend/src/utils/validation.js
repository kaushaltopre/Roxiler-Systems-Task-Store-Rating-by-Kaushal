export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,16})/;
  return regex.test(password);
};

export const validateName = (name) => {
  return name && name.length >= 20 && name.length <= 60;
};

export const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

export const validateAddress = (address) => {
  return !address || address.length <= 400;
};