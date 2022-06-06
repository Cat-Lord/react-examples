import TestRenderer from 'react-test-renderer';
import cats from "../catSelection/catsList";
import CatSelector from "../catSelection/CatSelector";

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

})