import {
  difference,
  differenceBy,
  intersection,
  intersectionBy,
  intersectionByAndDifference,
} from './setTheory';

describe('setTheory', () => {
  const numberSet1 = [1, 2, 3, 4, 5];
  const numberSet2 = [4, 5, 6, 7, 8];
  const stringSet1 = ['1', '2', '3', '4', '5'];
  const stringSet2 = ['4', '5', '6', '7', '8'];
  const objectSet1 = [
    { sk: 1, b: 1 },
    { sk: 4, b: 4 },
    { sk: 2, b: 2 },
    { sk: 3, b: 3 },
  ];
  const objectSet2 = [
    { sk: 3, b: 33 },
    { sk: 4, b: 4 },
    { sk: 5, b: 5 },
  ];

  it('intersection should work', () => {
    expect(intersection(numberSet1, numberSet2)).toStrictEqual([4, 5]);
    expect(intersection(stringSet1, stringSet2)).toStrictEqual(['4', '5']);
    expect(intersection(objectSet1, objectSet2)).toEqual([{ sk: 4, b: 4 }]);
  });

  it('intersectionBy should work', () => {
    expect(intersectionBy(objectSet1, objectSet2, 'sk')).toEqual([
      { sk: 4, b: 4 },
      { sk: 3, b: 3 },
    ]);
    expect(intersectionBy(objectSet2, objectSet1, 'sk')).toEqual([
      { sk: 3, b: 33 },
      { sk: 4, b: 4 },
    ]);
  });

  it('difference should work', () => {
    expect(difference(numberSet1, numberSet2)).toStrictEqual([1, 2, 3]);
    expect(difference(numberSet2, numberSet1)).toStrictEqual([6, 7, 8]);
    expect(difference(stringSet1, stringSet2)).toStrictEqual(['1', '2', '3']);
    expect(difference(stringSet2, stringSet1)).toStrictEqual(['6', '7', '8']);
    expect(difference(objectSet1, objectSet2)).toEqual([
      { sk: 1, b: 1 },
      { sk: 2, b: 2 },
      { sk: 3, b: 3 },
    ]);
    expect(difference(objectSet2, objectSet1)).toEqual([
      { sk: 3, b: 33 },
      { sk: 5, b: 5 },
    ]);
  });

  it('differenceBy should work', () => {
    expect(differenceBy(objectSet1, objectSet2, 'sk')).toEqual([
      { sk: 1, b: 1 },
      { sk: 2, b: 2 },
    ]);
    expect(differenceBy(objectSet2, objectSet1, 'sk')).toEqual([
      { sk: 5, b: 5 },
    ]);
  });

  it('intersectionByAndDifferenct', () => {
    expect(intersectionByAndDifference(objectSet1, objectSet2, 'sk')).toEqual([
      { sk: 3, b: 3 },
    ]);
    expect(intersectionByAndDifference(objectSet2, objectSet1, 'sk')).toEqual([
      { sk: 3, b: 33 },
    ]);
  });
});
