import jwt_decode from "jwt-decode";
import { API_HOST } from "../../utils/constants.js";
export default function LoginPage({
  setLogin,
  setLoading
}) {
  const [checked, setChecked] = React.useState(true);
  let inputTouched = {
    emailOrPhone: false,
    password: false
  };
  function inputOnBlur() {
    const inputEmailOrPhone = document.getElementById("inputEmailOrPhone");
    const inputPassword = document.getElementById("inputPassword");
    const warningEmailOrPhone = document.getElementById("warningEmailOrPhone");
    const warningPassword = document.getElementById("warningPassword");
    const emailOrPhoneValidationSuccess = validateEmailAddress(inputEmailOrPhone.value) || validatePhoneNumber(inputEmailOrPhone.value);
    const passwordValidationSuccess = inputPassword.value.length >= 8 && inputPassword.value.length <= 50;
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
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  }
  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^[689]\d{7}$/;
    return phoneRegex.test(phoneNumber);
  }
  async function loginUser(event) {
    try {
      event.preventDefault();
      const userEmailOrPhoneNumber = document.getElementById("inputEmailOrPhone").value;
      const userPassword = document.getElementById("inputPassword").value;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userEmailOrPhoneNumber,
          password: userPassword
        }),
        credentials: "include"
      };
      const loginResponse = await fetch(`${API_HOST}/login`, requestOptions);
      const loginResponseData = await loginResponse.json();
      const jwtToken = loginResponseData.jwt?.substring(7); // Remove "Bearer " from JWT token string
      const decodedJWTPayload = jwt_decode(jwtToken);
      console.log("loginResponseData: ", loginResponseData);
      console.log("JWT token:", jwtToken);
      console.log("Decoded JWT payload:", decodedJWTPayload);
      const name = decodedJWTPayload.name;
      const role = decodedJWTPayload.role;
      const welcomeMessage = `Welcome back, ${decodedJWTPayload.name} 😊\nLogging in as ${decodedJWTPayload.role} ✔️...`;
      alert(welcomeMessage);
      setLoading(true);
      setTimeout(() => {
        setLogin(true);
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("role", role);
      }, 1500);
    } catch (error) {
      alert("Login failed 😞!\n\nPossible reasons:\n1. Please enter a valid email / phone number & password!\n2. Please ensure you only have 1 login session! Multiple login sessions are not allowed!\n3. If all fails, please clear your browsing data (i.e. Browsing history/Cookes/Cache) & try to login again!");
      console.log(error);
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "login-page-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement("img", {
    src: "src/img/favicon.png",
    className: "company-logo"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "login-div"
  }, /*#__PURE__*/React.createElement("form", {
    action: "",
    method: "GET",
    className: "loginForm"
  }, /*#__PURE__*/React.createElement("h1", null, "Sign In"), /*#__PURE__*/React.createElement("div", {
    className: "input-text"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "inputEmailOrPhone",
    name: "emailOrPhone",
    placeholder: "Email or phone number",
    onFocus: () => {
      emailPhoneInputOnFocus();
    },
    onBlur: () => {
      inputOnBlur();
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "warning-input",
    id: "warningEmailOrPhone"
  }, "Please enter a valid email or phone number.")), /*#__PURE__*/React.createElement("div", {
    className: "input-text"
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    id: "inputPassword",
    name: "password",
    placeholder: "Password",
    onFocus: () => {
      passwordInputOnFocus();
    },
    onBlur: () => {
      inputOnBlur();
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "warning-input",
    id: "warningPassword"
  }, "Your password must contain between 8 to 50 characters.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "sign-in-button",
    onClick: async event => await loginUser(event)
  }, "Sign In")), /*#__PURE__*/React.createElement("div", {
    className: "remember-me-flexbox"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "remember-me-checkbox",
    defaultChecked: checked,
    onChange: () => setChecked(!checked)
  }), "\xA0", /*#__PURE__*/React.createElement("label", {
    className: "coloured_text"
  }, "Remember me")), /*#__PURE__*/React.createElement("div", {
    className: "help"
  }, /*#__PURE__*/React.createElement("a", {
    className: "coloured_text need-help-link",
    href: "#"
  }, "Need help?"))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "new-to-sp-movies"
  }, "New to SP Movies?", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "signup-link"
  }, "Sign up now.")), /*#__PURE__*/React.createElement("div", {
    className: "captcha coloured_link help"
  }, "This page is protected by Google reCAPTCHA to ensure you're not a bot. ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Learn more.")))))), /*#__PURE__*/React.createElement("div", {
    className: "bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bottom-width"
  }, "Questions? Call", " ", /*#__PURE__*/React.createElement("a", {
    href: "tel:800 123 456",
    className: "telephone-link"
  }, "800 123 456"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
    className: "bottom-flex"
  }, /*#__PURE__*/React.createElement("li", {
    className: "bottom-list-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "bottom-link"
  }, "FAQ")), /*#__PURE__*/React.createElement("li", {
    className: "bottom-list-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "bottom-link"
  }, "Help Centre")), /*#__PURE__*/React.createElement("li", {
    className: "bottom-list-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "bottom-link"
  }, "Terms of Use")), /*#__PURE__*/React.createElement("li", {
    className: "bottom-list-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "bottom-link"
  }, "Privacy")), /*#__PURE__*/React.createElement("li", {
    className: "bottom-list-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "bottom-link"
  }, "Cookie Preferences")), /*#__PURE__*/React.createElement("li", {
    className: "bottom-list-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "bottom-link"
  }, "Corporate Information")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("select", {
    className: "select-language-dropdown"
  }, /*#__PURE__*/React.createElement("option", null, " \uF57E \xA0\xA0\xA0English"), /*#__PURE__*/React.createElement("option", null, " \uF57E \xA0\xA0\xA0\u4E2D\u6587"))))));
}