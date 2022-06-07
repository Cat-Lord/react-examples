import TestRenderer from 'react-test-renderer';
import CatSelector from "../catSelection/CatSelector";
import cats from '../catSelection/catsList';
import { render, fireEvent, waitFor } from '@testing-library/react';

describe('CatSelection', () => {

  describe('initially selected values', () => {
    test('should select all of the cats', () => {
      const allActiveCats = [
        { ...cats[0], selected: true },
        { ...cats[1], selected: true },
        { ...cats[2], selected: true },
        { ...cats[3], selected: true },
        { ...cats[4], selected: true },
      ];

      const testRendered = TestRenderer.create(
        <CatSelector cats={allActiveCats} />
      );

      const activeCheckboxes = testRendered.root.findAllByProps({
        "data-testid": 'checkbox-test-id'
      });

      expect(activeCheckboxes).toBeDefined();
      expect(activeCheckboxes.length).toBe(allActiveCats.length);
      activeCheckboxes.forEach((checkbox) => {
        expect(checkbox.props.checked).toBe(true);
      })
    })

    test('should select no cats', () => {
      const allActiveCats = [
        { ...cats[0], selected: false },
        { ...cats[1], selected: false },
        { ...cats[2], selected: false },
        { ...cats[3], selected: false },
        { ...cats[4], selected: false },
      ];

      const testRendered = TestRenderer.create(
        <CatSelector cats={allActiveCats} />
      );

      const activeCheckboxes = testRendered.root.findAllByProps({
        "data-testid": 'checkbox-test-id'
      });

      expect(activeCheckboxes).toBeDefined();
      expect(activeCheckboxes.length).toBe(allActiveCats.length);
      activeCheckboxes.forEach((checkbox) => {
        expect(checkbox.props.checked).toBe(false);
      })
    })
  })


  describe('selecting a cat should mark the cat as selected', () => {

    test("cat shouldn't be initially selected", () => {
      const singleCatArray = [cats[0]];
      const catSelection = render(<CatSelector cats={singleCatArray} />);
      const inputElement = catSelection.getByTestId('checkbox-test-id') as HTMLInputElement;
      expect(inputElement).not.toBeNull();
      expect(inputElement.checked).toBe(false);
    });

    // ensure that not only checkbox click works
    test("cat should be selected after clicking on cat banner", async () => {
      const allInactiveCats = [
        { ...cats[0], selected: false },
        { ...cats[1], selected: false },
        { ...cats[2], selected: false },
        { ...cats[3], selected: false },
        { ...cats[4], selected: false },
      ]
      const catBannerRegex = /cat-banner-(\w+)/;
      const catSelection = render(<CatSelector cats={allInactiveCats} />);
      const catBannerElements = catSelection.queryAllByTestId(catBannerRegex);

      catBannerElements.forEach(async (element) => {
        const catName = element.getAttribute('data-testid')?.match(catBannerRegex)?.at(1);
        fireEvent.click(element);
        const inputElement = catSelection.getByTestId('selected-cat-' + catName) as HTMLInputElement;

        await waitFor(() => expect(inputElement.checked).toBe(true));
      });

      const selectedCatsArray = catSelection.queryAllByTestId(/selected-cat-\w+/);
      expect(selectedCatsArray.length).toBe(cats.length);
    });

  })

})