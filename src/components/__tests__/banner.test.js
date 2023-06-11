import { render, screen, cleanup } from "@testing-library/react";
import Banner from "../banner";

test('renders with the correct page title', () => {
    const pageTitle = 'pageTitle';
    render(<Banner pageTitle={pageTitle} />);

    const bannerElement = screen.getByTestId('bannerTest-1');
    expect(bannerElement).toBeInTheDocument();
    expect(bannerElement).toHaveTextContent('pageTitle');
});


test('renders with the correct CSS class', () => {
    const pageTitle = 'Welcome to My Website';
    const { getByTestId } = render(<Banner pageTitle={pageTitle} />);

    const bannerElement = getByTestId('bannerTest-1');
    expect(bannerElement).toHaveClass('banner');
});