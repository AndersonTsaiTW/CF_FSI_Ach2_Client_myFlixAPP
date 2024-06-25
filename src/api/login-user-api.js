// Login user
export function loginUserApi(username, password, onSuccess, onNoUser, onError) {
  const data = {
    Username: username,
    Password: password
  };

  return fetch("https://andersonmovie-fda719d938ac.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) {
        if (onSuccess) onSuccess(data);
      } else {
        onNoUser();
      }
    })
    .catch((e) => {
      onError();
    });
}