import React, { useState } from "react";
import { Alert, Button, Form, Modal, ModalTitle } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cambioFantoccio } from "../slice/favouritesSlice";

export default function SideBarComp() {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const [forceRender, setForceRender] = useState(false);

  const searchHandler = (e) => {
    setQuery(e.target.value);

    // console.log(e.target.value)
  };

  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  const handleInputFocus = () => {
    setShowPopup(true);
  };

  const handleInputBlur = () => {
    // Delay hiding the popup to allow clicking on the popup itself
    setTimeout(() => {
      setShowPopup(false);
    }, 200);
  };

  // MODALE
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forceLogoutRender, setForceLogoutRender] = useState(false);
  const fantoccio = useSelector((state) => state.favourites.fantoccio);

  const actualPwd = useSelector((state) => state.favourites.pwd);
  const actualEmail = useSelector((state) => state.favourites.email);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogIn = () => {
    console.log("cliccato su login");
    if (email.trim() === actualEmail && password.trim() === actualPwd) {
      console.log("sono uguali");
      setShow(false);
      localStorage.setItem("loggato", true);
      dispatch(cambioFantoccio());
    } else {
      console.log("email e password sbagliate");
      setError("Email or password is incorrect");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("loggato");
    console.log("rimosso");
    setForceLogoutRender(!forceLogoutRender);
    dispatch(cambioFantoccio());
    navigate("/");
    window.location.reload();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="col-2">
        <nav
          className="navbar navbar-expand-md navbar-white bg-navbar fixed-left justify-content-between"
          id="sidebar"
        >
          <div className="nav-container">
            <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
              <img
                src="/logo/Spotify_Logo.png"
                alt="Spotify_Logo"
                width="131"
                height="40"
                className="mb-4 logograndespotify"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-4">
                <ul>
                  <li>
                    <a
                      className="nav-item nav-link"
                      href="#"
                      onClick={() => navigate("/")}
                    >
                      <i className="bi bi-house-door-fill"></i>&nbsp; Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="nav-item nav-link"
                      href="#"
                      onClick={() => navigate("/library_page")}
                    >
                      <i className="bi bi-book-fill"></i>&nbsp; Your Library
                    </a>
                  </li>
                  <li className="me-4">
                    <div className="input-group mt-3">
                      <input
                        type="text"
                        className="form-control mb-2"
                        id="searchField"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        onChange={(e) => searchHandler(e)}
                        onKeyDown={(e) =>
                          e.key === "Enter" &&
                          (navigate("/search_result/" + query),
                          setQuery(""),
                          setForceRender((prevState) => !prevState),
                          setTimeout(() => {
                            setShowPopup(false);
                          }, 200))
                        }
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        key={forceRender}
                      />
                      {showPopup && (
                        <div className="popup">
                          <Alert
                            key="success"
                            variant="success"
                            className="popupRicerca"
                          >
                            Hit <strong>Enter</strong> to search.
                          </Alert>
                        </div>
                      )}
                    </div>
                  </li>
                  {/* <li className='w-75'>
                  <div className="input-group-append" style={{ marginBottom: '4%' }}>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                      id="button-addon1"
                      // onChange={() => searchHandler()}
                      onClick={() => navigate('/search_result/'+ query)}
                    >
                      Search
                    </button>
                  
                </div>
              </li> */}
                </ul>
              </div>
            </div>
          </div>

          <div className="nav-btn">
            {localStorage.getItem("loggato") ? (
              <>
                <a href="#">
                  <strong>Ravikant</strong>
                </a>
                <Button
                  variant="danger"
                  className="logout-btn"
                  type="button"
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="signup-btn"
                  type="button"
                  onClick={() => alert("Currently not accepting new sign-ups.")}
                >
                  Sign Up
                </Button>
                <Button
                  variant="success"
                  className="login-btn"
                  type="button"
                  onClick={handleShow}
                >
                  Log in
                </Button>
              </>
            )}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Log in to Spotify</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  email: <strong>ravikant@example.com</strong>{" "}
                </p>
                <p>
                  pwd: <strong>Ravikant@123</strong>
                </p>
                <Form>
                  <Form.Group className="mb-3" controlId="emailForm1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="pwdForm1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleLogIn}>
                  Log-in
                </Button>
              </Modal.Footer>
            </Modal>
            <br />
            <a href="#">Cookie Policy</a> |<a href="#"> Privacy</a>
            <br />
            <a href="https://github.com/ravikant-diwakar" target="_blank">
              <span className="copyleft"></span> Ravikant
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
