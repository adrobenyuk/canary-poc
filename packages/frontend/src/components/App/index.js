import { useState, useEffect } from "react";

import Router from "../Router";
import "./styles.css";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch("/api/ping", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((user) => {
        if (user) {
          setUser(user);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app-body bg-dark text-white">
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check" viewBox="0 0 16 16">
          <title>Check</title>
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </symbol>
      </svg>
      <div className="container py-3">
        <Router user={user} onLogin={setUser} />
      </div>
    </div>
  );
}

export default App;
