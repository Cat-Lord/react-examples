import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Select from '../Select';

let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

})
afterEach(() => {
  document.body.removeChild(container);
  container.remove();
});

describe('Select', () => {
  const options: string[] = [
    "option 1",
    "option 2",
    "option 3",
    "option 4",
    "option 5"
  ]

  it('its rendered with non-empty options', () => {
    act(() => {
      createRoot(container)
        .render(<Select options={options} />)
    });
    const select = container.querySelector('select');
    expect(select).not.toBeNull();
    expect(select).toBeDefined();
  });

  it('to have correct number of options when rendered', () => {
    act(() => {
      createRoot(container)
        .render(<Select options={options} />)
    });
    const select = container.querySelector('select');
    expect(select?.length).toBe(options.length);

    expect(select?.options[0].value).toBe(options[0]);
    expect(select?.options[0].text).toBe(options[0]);
  });

  it('to have correct default option selected on render', () => {
    act(() => {
      createRoot(container)
        .render(<Select options={options} />)
    });
    const select = container.querySelector('select');
    expect(select?.value).toBe(options[0]);
  });

  it('is null with empty options', () => {
    act(() => {
      createRoot(container)
        .render(<Select options={[]} />)
    });
    const select = container.querySelector('select');
    expect(select).toBeNull();
  })
});