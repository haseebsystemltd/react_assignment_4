import React from 'react';
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Auth from '../Auth';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock the navigate function
const mockNavigate = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  useNavigate.mockReturnValue(mockNavigate);
});

test('redirects to /login when authUser is "allowed" and authenticatedUser is null', () => {
  render(
    <Auth authenticatedUser={null} authUser="allowed">
      <div>Children component</div>
    </Auth>
  );

  expect(mockNavigate).toHaveBeenCalledWith('/login');
});

test('redirects to /dashboard when authUser is "not-allowed" and authenticatedUser is not null', () => {
  render(
    <Auth authenticatedUser={{ name: 'John' }} authUser="not-allowed">
      <div>Children component</div>
    </Auth>
  );

  expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
});

test('renders children when authUser and authenticatedUser conditions are not met', () => {
  const { getByText } = render(
    <Auth authenticatedUser={null} authUser="not-allowed">
      <div>Children component</div>
    </Auth>
  );

  const childrenComponent = getByText('Children component');
  expect(childrenComponent).toBeInTheDocument();
});