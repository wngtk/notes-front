import Toggleable from './Toggleable'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Toggleable />', () => {
  let container

  beforeEach(() => {
    container = render(<Toggleable buttonLabel="Show">
      <div className="testDiv">
        toggleable content
      </div>
    </Toggleable>).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('toggleable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const div = container.querySelector('.toggleableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  })

})