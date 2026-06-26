import type { TaskFormErrors, TaskPayload } from '@/types/task';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export const validateRequired = (value: string, fieldLabel: string): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, message: `${fieldLabel} is required` };
  }

  return { isValid: true, message: '' };
};

export const validateEmail = (email: string): ValidationResult => {
  const required = validateRequired(email, 'Email');

  if (!required.isValid) {
    return required;
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  return { isValid: true, message: '' };
};

export const validatePassword = (password: string): ValidationResult => {
  const required = validateRequired(password, 'Password');

  if (!required.isValid) {
    return required;
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    };
  }

  return { isValid: true, message: '' };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): ValidationResult => {
  const required = validateRequired(confirmPassword, 'Confirm password');

  if (!required.isValid) {
    return required;
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }

  return { isValid: true, message: '' };
};

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

export interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateLoginForm = (values: LoginFormValues): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  const emailResult = validateEmail(values.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.message;
  }

  const passwordResult = validatePassword(values.password);
  if (!passwordResult.isValid) {
    errors.password = passwordResult.message;
  }

  return errors;
};

export const validateRegisterForm = (values: RegisterFormValues): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};

  const nameResult = validateRequired(values.name, 'Name');
  if (!nameResult.isValid) {
    errors.name = nameResult.message;
  }

  const emailResult = validateEmail(values.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.message;
  }

  const passwordResult = validatePassword(values.password);
  if (!passwordResult.isValid) {
    errors.password = passwordResult.message;
  }

  const confirmResult = validateConfirmPassword(values.password, values.confirmPassword);
  if (!confirmResult.isValid) {
    errors.confirmPassword = confirmResult.message;
  }

  return errors;
};

export const validateTaskForm = (values: TaskPayload): TaskFormErrors => {
  const errors: TaskFormErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!values.description.trim()) {
    errors.description = 'Description is required';
  }

  if (!values.dueDate) {
    errors.dueDate = 'Due date is required';
  }

  return errors;
};
