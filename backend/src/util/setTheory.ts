import _ from 'lodash';

export const intersection = <T>(arr1: T[], arr2: T[]) =>
  _.intersectionWith(arr1, arr2, _.isEqual);

export const intersectionBy = <T>(arr1: T[], arr2: T[], key: keyof T) =>
  _.intersectionBy(arr1, arr2, key);

export const difference = <T>(arr1: T[], arr2: T[]) =>
  _.differenceWith(arr1, arr2, _.isEqual);

export const differenceBy = <T>(arr1: T[], arr2: T[], key: keyof T) =>
  _.differenceBy(arr1, arr2, key);

export const intersectionByAndDifference = <T>(
  arr1: T[],
  arr2: T[],
  key: keyof T
) => {
  const a = intersectionBy(arr1, arr2, key);
  const b = intersectionBy(arr2, arr1, key);

  return difference(a, b);
};
