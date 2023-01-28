export default function Footer() {
  function inputOnFocus() {
    const formLabel = document.querySelector(".form-label");
    formLabel.style.backgroundColor = "rgb(20,20,20)";
  }

  function inputOnBlur() {
    const formLabel = document.querySelector(".form-label");
    formLabel.style.backgroundColor = "transparent";
  }

  return (
    <footer
      className="text-center text-white"
      id="material-design-bootstrap-5-footer"
      style={{ bottom: "0", width: "100%" }}
    >
      <div className="container" style={{ padding: "0px 24px" }}>
        <section className="mb-4">
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#"
            role="button"
          >
            <i className="fab fa-instagram fa-lg"></i>
          </a>

          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#"
            role="button"
          >
            <i className="fab fa-github fa-lg"></i>
          </a>
        </section>

        <section className="">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>

              <div className="col-md-5 col-12">
                <div className="form-outline form-white mb-4">
                  <input
                    type="email"
                    id="email-address-form"
                    className="form-control"
                    style={{ border: "1px solid white" }}
                    onFocus={() => {
                      inputOnFocus();
                    }}
                    onBlur={() => {
                      inputOnBlur();
                    }}
                  />
                  <label className="form-label" htmlFor="email-address-form">
                    Email address
                  </label>
                </div>
              </div>

              <div className="col-auto">
                <a href="#" className="btn btn-outline-light mb-4">
                  Subscribe
                </a>
              </div>
            </div>
          </form>
        </section>
      </div>
      <div className="text-center" style={{ padding: "0px 16px 16px" }}>
        © 2023{" "}
        <a className="text-white" href="https://github.com/melvincwng">
          Melvin Ng
        </a>
      </div>
    </footer>
  );
}
