import "./styles.css";

const Spinner = () => (
  <div className="page-spinner">
    <div className="spinner-border text-warning" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
