export const getValueFromCookie = (cookie: string, key: string) => {
  const value = cookie?.match(new RegExp(`${key}=[^;]*`))?.[0]?.split('=')[1] || '';

  return decodeURIComponent(value);
};
