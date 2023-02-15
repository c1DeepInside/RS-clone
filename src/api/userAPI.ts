const baseURL = '';

export const registration = async (username: string, password: string) => {
  const response: Response = await fetch(`${baseURL}/users/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }
};

export const login = async (username: string, password: string) => {
  const response: Response = await fetch(`${baseURL}/users/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data: { token: string } = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};
