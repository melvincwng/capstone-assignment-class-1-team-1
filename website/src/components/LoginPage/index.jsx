export default function LoginPage({ setLogin, setLoading }) {
  const [checked, setChecked] = React.useState(true);

  let inputTouched = {
    emailOrPhone: false,
    password: false,
  };

  function inputOnBlur() {
    const inputEmailOrPhone = document.getElementById("inputEmailOrPhone");
    const inputPassword = document.getElementById("inputPassword");
    const warningEmailOrPhone = document.getElementById("warningEmailOrPhone");
    const warningPassword = document.getElementById("warningPassword");
    const emailOrPhoneValidationSuccess =
      validateEmailAddress(inputEmailOrPhone.value) ||
      validatePhoneNumber(inputEmailOrPhone.value);
    const passwordValidationSuccess =
      inputPassword.value.length >= 8 && inputPassword.value.length <= 50;

    if (inputTouched.emailOrPhone) {
      if (emailOrPhoneValidationSuccess) {
        warningEmailOrPhone.style.display = "none";
        inputEmailOrPhone.style.borderBottom = "none";
      } else {
        warningEmailOrPhone.style.display = "block";
        inputEmailOrPhone.style.borderBottom = "2px solid #E87C03";
      }
    }
    if (inputTouched.password) {
      if (passwordValidationSuccess) {
        warningPassword.style.display = "none";
        inputPassword.style.borderBottom = "none";
      } else {
        warningPassword.style.display = "block";
        inputPassword.style.borderBottom = "2px solid #E87C03";
      }
    }
  }

  function emailPhoneInputOnFocus() {
    const inputEmailOrPhone = document.getElementById("inputEmailOrPhone");
    inputTouched[inputEmailOrPhone.name] = true;
  }

  function passwordInputOnFocus() {
    const inputPassword = document.getElementById("inputPassword");
    inputTouched[inputPassword.name] = true;
  }

  function validateEmailAddress(email) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  }

  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^[689]\d{7}$/;
    return phoneRegex.test(phoneNumber);
  }

  async function loginUser(event) {
    // KIV - to add axios call in future for /login route (Just a mock login function for now)
    event.preventDefault();
    const userEmailOrPhoneNumber =
      document.getElementById("inputEmailOrPhone").value;
    const userPassword = document.getElementById("inputPassword").value;
    if (
      userEmailOrPhoneNumber === "admin@gmail.com" &&
      userPassword === "password123"
    ) {
      alert("Logging in as Admin ✔️...");
      setLoading(true);
      await setTimeout(() => {
        setLogin(true);
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("role", "admin");
      }, 1500);
    } else if (
      userEmailOrPhoneNumber === "user@gmail.com" &&
      userPassword === "password123"
    ) {
      alert("Logging in as Normal User ✔️...");
      setLoading(true);
      await setTimeout(() => {
        setLogin(true);
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("role", "user");
      }, 1500);
    } else {
      alert(
        "Logged in failed! \nPlease enter a valid email / phone number & password 😞"
      );
    }
  }

  return (
    <div className="login-page-wrapper">
      <div className="top">
        <div className="logo">
          <a href="#">
            <img src="src/img/favicon.png" className="company-logo" />
          </a>
        </div>
        <div className="login-div">
          <form action="" method="GET" className="loginForm">
            <h1>Sign In</h1>
            <div className="input-text">
              <input
                type="text"
                id="inputEmailOrPhone"
                name="emailOrPhone"
                placeholder="Email or phone number"
                onFocus={() => {
                  emailPhoneInputOnFocus();
                }}
                onBlur={() => {
                  inputOnBlur();
                }}
              />
              <div className="warning-input" id="warningEmailOrPhone">
                Please enter a valid email or phone number.
              </div>
            </div>

            <div className="input-text">
              <input
                type="password"
                id="inputPassword"
                name="password"
                placeholder="Password"
                onFocus={() => {
                  passwordInputOnFocus();
                }}
                onBlur={() => {
                  inputOnBlur();
                }}
              />
              <div className="warning-input" id="warningPassword">
                Your password must contain between 8 to 50 characters.
              </div>
            </div>

            <div>
              <button
                className="sign-in-button"
                onClick={(event) => loginUser(event)}
              >
                Sign In
              </button>
            </div>
            <div className="remember-me-flexbox">
              <div>
                <input
                  type="checkbox"
                  id="remember-me-checkbox"
                  defaultChecked={checked}
                  onChange={() => setChecked(!checked)}
                />
                &nbsp;
                <label className="coloured_text">Remember me</label>
              </div>
              <div className="help">
                <a className="coloured_text need-help-link" href="#">
                  Need help?
                </a>
              </div>
            </div>
            <br />
            <div>
              <div className="new-to-netflix">
                New to SP Movies?{" "}
                <a href="#" className="signup-link">
                  Sign up now.
                </a>
              </div>
              <div className="captcha coloured_link help">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot. <a href="#">Learn more.</a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="bottom">
        <div className="bottom-width">
          Questions? Call{" "}
          <a href="tel:800 123 456" className="telephone-link">
            800 123 456
          </a>
          <div>
            <ul className="bottom-flex">
              <li className="bottom-list-item">
                <a href="#" className="bottom-link">
                  FAQ
                </a>
              </li>
              <li className="bottom-list-item">
                <a href="#" className="bottom-link">
                  Help Centre
                </a>
              </li>
              <li className="bottom-list-item">
                <a href="#" className="bottom-link">
                  Terms of Use
                </a>
              </li>
              <li className="bottom-list-item">
                <a href="#" className="bottom-link">
                  Privacy
                </a>
              </li>
              <li className="bottom-list-item">
                <a href="#" className="bottom-link">
                  Cookie Preferences
                </a>
              </li>
              <li className="bottom-list-item">
                <a href="#" className="bottom-link">
                  Corporate Information
                </a>
              </li>
            </ul>
          </div>
          <div>
            <select className="select-language-dropdown">
              <option> &#xf57e; &nbsp;&nbsp;&nbsp;English</option>
              <option> &#xf57e; &nbsp;&nbsp;&nbsp;中文</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
