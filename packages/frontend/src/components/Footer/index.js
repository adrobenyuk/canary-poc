import "./style.css";

const Footer = () => {
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="row">
        <div className="col-12 col-md">
          <img
            className="logo mb-2"
            src="https://media.istockphoto.com/photos/searching-magnifier-glass-dollar-dollar-icon-under-magnifying-glass-picture-id1180233758"
            alt=""
            width="300"
          />
          <small className="d-block mb-3 text-muted">&copy; 2017–2021</small>
        </div>
        <div className="col-6 col-md">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Cool stuff
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Random feature
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Team feature
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Stuff for developers
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Another one
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Last time
              </span>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Resources</h5>
          <ul className="list-unstyled text-small">
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Resource
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Resource name
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Another resource
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Final resource
              </span>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">Team</span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Locations
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">
                Privacy
              </span>
            </li>
            <li className="mb-1">
              <span className="link-secondary text-decoration-none">Terms</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
