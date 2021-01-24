import { render, screen, fireEvent } from '@testing-library/angular'
import { LoginComponent } from './login.component'

describe('Counter', () => {
  test('should render login', async () => {
    await render(LoginComponent, {
      componentProperties: {  },
    })

    expect(screen.getByText('login works!'))
  })

 
})