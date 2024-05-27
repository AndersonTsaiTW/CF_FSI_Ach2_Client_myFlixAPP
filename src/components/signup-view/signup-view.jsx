import { useState } from "react";

export const SignupView = () => {
  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
  const [ email, setEmail ] = useState();
  const [ birthday, setBirthday ] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

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
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username: 
        <input
        type = "text"
        value = {username}
        onChange = {(e) => setUsername(e.target.value)}
        minLength = "4"
        required
        ></input>
      </label>
      <label>
        Password: 
        <input
        type = "password"
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
        minLength = "4"
        required
        ></input>
      </label>
      <label>
        Email: 
        <input
        type="email"
        value = {email}
        onChange = {(e) => setEmail(e.target.value)}
        required
        ></input>
      </label>
      <label>
        Birth_date: 
        <input
        type="date"
        value = {birthday}
        onChange = {(e) => setBirthday(e.target.value)}
        required
        ></input>
      </label>
      <button type="submit">Signup</button>

    </form>
  )
}