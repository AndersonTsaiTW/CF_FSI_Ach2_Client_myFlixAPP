// delete user in database
export function deleteUserApi(username, token, onSuccess, onError) {
  const url = `https://andersonmovie-fda719d938ac.herokuapp.com/users/${encodeURIComponent(username)}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => onError());
}
