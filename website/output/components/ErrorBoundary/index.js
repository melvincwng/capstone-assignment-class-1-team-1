import Error from "./Error.js";
import MainDivWrapper from "../MainDivWrapper/index.js";
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("An error has occurred - ", error, errorInfo);
  }
  render() {
    // If an error is encounterd when rendering a component, we render a fallback UI. However, take note not all errors can be caught by ErrorBoundary component - https://reactjs.org/docs/error-boundaries.html
    if (this.state.hasError) {
      // For resetting the state of Error Boundary (so that the fallback UI is not rendered again if we navigate to another component/page)
      this.state = {
        hasError: false
      };

      // Render a custom fallback UI if a component fails to render due to errors
      return /*#__PURE__*/React.createElement(MainDivWrapper, null, /*#__PURE__*/React.createElement(Error, null));
    }

    // Else if no errors are encounterd when rendering a component, we render the component as normal
    return this.props.children;
  }
}