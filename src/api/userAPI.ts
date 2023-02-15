const baseURL = '';

export const registration = async (login: string, pass: string) => {
  const response: Response = await fetch(`${baseURL}/users/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: login, password: pass }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }
};
