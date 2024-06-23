// update user's information
export function updateUserApi(oriUsername, token, username, password, email, birthday, onSuccess, onError) {
  const url = `https://andersonmovie-fda719d938ac.herokuapp.com/users/${encodeURIComponent(oriUsername)}`;
  const data = {
    Username: username,
    Password: password,
    Email: email,
    Birth_date: birthday
  };

  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Profile update failed');
      }
      return response.json();
    })
    .then(data => {
      if (onSuccess) onSuccess(data);  // if no onSuccess, just end the process without shotdown
    })
    .catch(error => {
      if (onError) onError(error);
    });
}
