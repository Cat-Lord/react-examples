import { fireEvent, render, waitFor } from "@testing-library/react"
import { act, create } from "react-test-renderer";
import CatBanner from "../catSelection/CatBanner"
import CatSelector, { Cat } from "../catSelection/CatSelector";
import cats from "../catSelection/catsList"


let container: HTMLDivElement;
beforeEach(() => {
  container = document.createElement('div');
})
afterEach(() => {
  container.remove();
});


describe('CatBanner', () => {
  test('should render with supplied cat', () => {
    for (const catToRender of cats) {
      const banner = render(<CatBanner cat={catToRender} onChange={() => { }} />, { container: container });

      expect(banner.queryByText(catToRender.name)).not.toBeNull();
      expect(banner.queryByText(/(born)/i)).not.toBeNull();
      if (!!catToRender.dateOfDeath)
        expect(banner.queryByText(/(passed)/i)).not.toBeNull();
    }
  })

  // using react testing library
  test('should render with supplied cat', () => {
    const catToRender = cats[0];
    const mockFunction = jest.fn();
    const banner = render(<CatBanner cat={catToRender} onChange={mockFunction} />, { container: container });

    const catBannerElement = banner.getByTestId(/cat-banner-\w+/);
    fireEvent.click(catBannerElement);
    expect(mockFunction.mock.invocationCallOrder.length).toEqual(1);
  });

  // Using test renderer
  test('that for each cat there is a CatBanner element rendered', () => {
    const { root } = create(<CatSelector cats={cats} />);
    const catBanners = root.findAllByType(CatBanner);
    expect(catBanners.length).toEqual(cats.length);
  });

  // Using test renderer
  test("clicking a catBanner should reverse cats 'selected' value", () => {
    const catToRender = { ...cats[0], selected: false };
    const fn = jest.fn((catToRender: Cat) => {
      catToRender.selected = !catToRender.selected
      return catToRender.selected;
    });

    const { root } = create(<CatBanner cat={catToRender} onChange={fn} />);

    act(() => {
      root.props.onChange(catToRender);
      root.props.onChange(catToRender);
      root.props.onChange(catToRender);
    });

    expect(fn.mock.calls.length).toBe(3);
    expect(fn.mock.results).toEqual([
      {
        type: 'return',
        value: true
      }, {
        type: 'return',
        value: false
      }, {
        type: 'return',
        value: true
      },
    ])
  });
})