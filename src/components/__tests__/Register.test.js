import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Register from '../Registration';


// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock the useDispatch functions
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));


const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  useNavigate.mockReturnValue(mockNavigate);
  useDispatch.mockReturnValue(mockDispatch);
});

test('fills in all fields correctly and submits the form', () => {
  render(<Register />);

  // Fill in the fields
  fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText(/Home Address/i), { target: { value: '123 Main St' } });

  // Submit the form
  fireEvent.click(screen.getByText(/Signup/i));

  // Verify if the registerUser action is dispatched with the correct user data
  expect(mockDispatch).toHaveBeenCalledWith(
    Register({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
      address: '123 Main St',
      status: 'active',
      loginAttempts: 0,
      coins: '', // Add the expected value for coins here
    })
  );

  // Verify if the user is redirected to the login page
  expect(mockNavigate).toHaveBeenCalledWith('/login');
});

test('leaves a required field empty and checks for validation errors', () => {
  render(<Register />);

  // Leave the Full Name field empty
  fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText(/Home Address/i), { target: { value: '123 Main St' } });

  // Submit the form
  fireEvent.click(screen.getByText(/Signup/i));

  // Verify if the validation error is displayed for the Full Name field
  expect(screen.getByText(/Fullname required/i)).toBeInTheDocument();

  // Verify if the registerUser action is not dispatched
  expect(mockDispatch).not.toHaveBeenCalled();

  // Verify if the user is not redirected
  expect(mockNavigate).not.toHaveBeenCalled();
});
