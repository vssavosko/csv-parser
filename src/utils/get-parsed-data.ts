import { getValueFromCookie } from './get-value-from-cookie';

interface GetParsedDataProps {
  cookie: string;
}

export const getParsedData = ({ cookie }: GetParsedDataProps) => {
  const firstName = getValueFromCookie(cookie, 'impress_firstname');
  const lastName = getValueFromCookie(cookie, 'impress_lastname');
  const email = getValueFromCookie(cookie, 'impress_email');
  const phone = getValueFromCookie(cookie, 'impress_phone');

  return {
    'First Name': firstName,
    'Last Name': lastName,
    Email: email,
    'Phone Number': phone,
  };
};
