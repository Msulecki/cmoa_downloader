import { v4 as uuidv4 } from 'uuid';

const getUniqueId = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    const newToken = uuidv4();
    localStorage.setItem('token', newToken);

    return newToken;
  }

  return token;
};

export default getUniqueId;
