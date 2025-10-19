// types/auth.ts

/**
 * User registration form data
 */
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

/**
 * User login form data
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Password reset request data
 */
export interface ForgotPasswordData {
  email: string;
}

/**
 * New password data for reset
 */
export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  token?: string;
}

/**
 * OAuth provider types
 */
export type OAuthProvider = "google" | "github" | "facebook" | "apple";

/**
 * Authentication response from API
 */
export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
  refreshToken?: string;
}

/**
 * User data structure
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * User roles in the system
 */
export type UserRole = "customer" | "vendor" | "admin";

/**
 * Email verification status
 */
export type VerificationStatus = "verifying" | "success" | "error" | "resend";

/**
 * Password strength levels
 */
export type PasswordStrength = 0 | 1 | 2 | 3 | 4;

/**
 * Form validation errors
 */
export type FormErrors = Record<string, string>;

/**
 * Auth session data
 */
export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

/**
 * OAuth callback data
 */
export interface OAuthCallbackData {
  provider: OAuthProvider;
  code: string;
  state?: string;
  error?: string;
}

/**
 * Password requirements configuration
 */
export interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
}

/**
 * Default password requirements
 */
export const DEFAULT_PASSWORD_REQUIREMENTS: PasswordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Calculate password strength
 */
export const calculatePasswordStrength = (
  password: string
): PasswordStrength => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  return strength as PasswordStrength;
};

/**
 * Check if password meets requirements
 */
export const meetsPasswordRequirements = (
  password: string,
  requirements: PasswordRequirements = DEFAULT_PASSWORD_REQUIREMENTS
): boolean => {
  if (password.length < requirements.minLength) return false;
  if (requirements.requireUppercase && !/[A-Z]/.test(password)) return false;
  if (requirements.requireLowercase && !/[a-z]/.test(password)) return false;
  if (requirements.requireNumber && !/\d/.test(password)) return false;
  if (requirements.requireSpecialChar && !/[^a-zA-Z0-9]/.test(password))
    return false;
  return true;
};

/**
 * Validate registration form
 */
export const validateRegistrationForm = (
  data: RegisterFormData
): FormErrors => {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }
  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!data.password) {
    errors.password = "Password is required";
  } else if (!meetsPasswordRequirements(data.password)) {
    errors.password = "Password does not meet requirements";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

/**
 * Validate login form
 */
export const validateLoginForm = (data: LoginFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};

/**
 * Validate forgot password form
 */
export const validateForgotPasswordForm = (
  data: ForgotPasswordData
): FormErrors => {
  const errors: FormErrors = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }

  return errors;
};

/**
 * Validate reset password form
 */
export const validateResetPasswordForm = (
  data: ResetPasswordData
): FormErrors => {
  const errors: FormErrors = {};

  if (!data.password) {
    errors.password = "Password is required";
  } else if (!meetsPasswordRequirements(data.password)) {
    errors.password = "Password does not meet requirements";
  }
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};