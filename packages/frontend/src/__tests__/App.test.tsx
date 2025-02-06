import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '../App'

/**
 * Test suite for the App component.
 */
describe('App', (): void => {
  it('renders heading and initial count', (): void => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /count is 0/i })).toBeDefined()
  })

  it('increments count when button is clicked', async (): Promise<void> => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is 0/i })
    await userEvent.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeDefined()
  })
}) 