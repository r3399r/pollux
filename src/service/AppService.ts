const version = 'v5';

export const init = () => {
  const ver = localStorage.getItem('ver');
  if (ver === version) return false;
  localStorage.clear();
  localStorage.setItem('ver', version);

  return true;
};
