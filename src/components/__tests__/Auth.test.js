import React from 'react';
import { render, screen, cleanup } from "@testing-library/react";
import { useNavigate } from 'react-router-dom';
import Auth from "../Auth";
import Banner from '../banner';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));


const mockNavigate = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

// test('renders children when authenticatedUser is null and authUser is "allowed"', async () => {
//     render(
//         <Auth authenticatedUser={null} authUser="allowed">
//           <div data-testid="authChildTest-1">
//             <div>Children component</div>
//           </div>
//         </Auth>
//     );
//       const childrenComponent = await screen.getByTestId('authChildTest-1');
//         expect(childrenComponent).toBeInTheDocument();
// });


test('navigates to "/login" when authenticatedUser is null and authUser is "allowed"', () => {
    render(
        <Auth authenticatedUser={null} authUser="allowed">
            <div>Children component</div>
        </Auth>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/login');
});

test('navigates to "/dashboard" when authenticatedUser is not null and authUser is "not-allowed"', () => {
    render(
        <Auth authenticatedUser={{ name: 'John' }} authUser="not-allowed">
            <div>Children component</div>
        </Auth>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
});
