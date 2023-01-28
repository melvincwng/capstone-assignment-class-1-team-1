export default function Footer() {
  function inputOnFocus() {
    const formLabel = document.querySelector(".form-label");
    formLabel.style.backgroundColor = "rgb(20,20,20)";
  }
  function inputOnBlur() {
    const formLabel = document.querySelector(".form-label");
    formLabel.style.backgroundColor = "transparent";
  }
  return /*#__PURE__*/React.createElement("footer", {
    className: "text-center text-white",
    id: "material-design-bootstrap-5-footer",
    style: {
      bottom: "0",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      padding: "0px 24px"
    }
  }, /*#__PURE__*/React.createElement("section", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-outline-light btn-floating m-1",
    href: "#",
    role: "button"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-facebook-f"
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-outline-light btn-floating m-1",
    href: "#",
    role: "button"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-twitter"
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-outline-light btn-floating m-1",
    href: "#",
    role: "button"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-google"
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-outline-light btn-floating m-1",
    href: "#",
    role: "button"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-instagram fa-lg"
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn btn-outline-light btn-floating m-1",
    href: "#",
    role: "button"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fab fa-github fa-lg"
  }))), /*#__PURE__*/React.createElement("section", {
    className: ""
  }, /*#__PURE__*/React.createElement("form", {
    action: ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "row d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-auto"
  }, /*#__PURE__*/React.createElement("p", {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement("strong", null, "Sign up for our newsletter"))), /*#__PURE__*/React.createElement("div", {
    className: "col-md-5 col-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-outline form-white mb-4"
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    id: "email-address-form",
    className: "form-control",
    style: {
      border: "1px solid white"
    },
    onFocus: () => {
      inputOnFocus();
    },
    onBlur: () => {
      inputOnBlur();
    }
  }), /*#__PURE__*/React.createElement("label", {
    className: "form-label",
    htmlFor: "email-address-form"
  }, "Email address"))), /*#__PURE__*/React.createElement("div", {
    className: "col-auto"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-outline-light mb-4"
  }, "Subscribe")))))), /*#__PURE__*/React.createElement("div", {
    className: "text-center",
    style: {
      padding: "0px 16px 16px"
    }
  }, "\xA9 2023", " ", /*#__PURE__*/React.createElement("a", {
    className: "text-white",
    href: "https://github.com/melvincwng"
  }, "Melvin Ng")));
}