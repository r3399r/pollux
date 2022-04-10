import { v4 as uuidv4 } from 'uuid';

export const getUserId = () => {
  const savedId = localStorage.getItem('id');
  if (savedId === null) {
    const newId = uuidv4();
    localStorage.setItem('id', newId);

    return newId;
  }

  return savedId;
};
