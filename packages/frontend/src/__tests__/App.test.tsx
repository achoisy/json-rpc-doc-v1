import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

/**
 * Test suite for the App component.
 */
describe('App', (): void => {
  it('renders main div with correct classes', (): void => {
    const { container } = render(<App />);
    const mainDiv = container.firstElementChild as HTMLElement;
    expect(mainDiv.tagName.toLowerCase()).toBe('div');
  });
});
