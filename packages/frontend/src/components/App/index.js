import { lazy, Suspense } from "react";
import Header from "../Header";
import Main from "../Main";
const Footer = lazy(() => import("../Footer"));

function App() {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="check" viewBox="0 0 16 16">
          <title>Check</title>
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </symbol>
      </svg>
      <div className="container py-3">
        <Header />
        <Main />
        <Suspense fallback="loading">
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
