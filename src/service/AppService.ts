const version = 'v2';

export const init = () => {
  const ver = localStorage.getItem('ver');
  if (ver === version) return;
  localStorage.clear();
  localStorage.setItem('ver', version);
};
