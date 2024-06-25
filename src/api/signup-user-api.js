// signup new user
export function signupUserApi(username, password, email, birthday, onSuccess, onError) {
  const data = {
    Username: username,
    Password: password,
    Email: email,
    Birth_date: birthday
  };

  fetch("https://andersonmovie-fda719d938ac.herokuapp.com/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    });
}