/**
 * Two ways to retrieve the JWT token:
 * 1) From the request header's "cookie" field:
 *    - PREFFERED METHOD - as it's more secure than the 2nd method below (in summary)
 *    - There's still some risk of CSRF attacks, since we are using sameSite: "none" in the cookie's options (if we use sameSite: "strict" or "lax", the cookie cannot be sent from the client-side to server for cross-origin requests which is our use case as we will be hosting our FE & BE on separate domains on the cloud...)
 *    - To prevent/mitigate against CSRF attacks, we will be checking the request header's "origin" field & see if the request comes from a trusted cross-origin domain (e.g. our own domain) or the same origin as the server. If not, we reject the request.
 *    - See the application level middleware "verifyAgainstCSRFAttacks" below for more details.
 * 2) From the request header's "authorization" field
 *    - From localStorage/sessionStorage in the client, we extract out the JWT token that is stored there.
 *    - And then pass it in the request header's "authorization" field, from which we then make a request to the server
 *    - NOT PREFERRED METHOD - due to possibility of token being stolen by a malicious user from localStorage/sessionStorage via XSS
 * Reference: https://tkacz.pro/how-to-securely-store-jwt-tokens/
 */

var jwt = require("jsonwebtoken");
var config = require("../config/config");

var verificationLib = {
  verifyAgainstCSRFAttacks: function (req, res, next) {
    /**
     * Check if the request header's "origin" field comes from A) a trusted cross-origin domain (e.g. our own domain) or B) the same origin as the server (aka we are using the browser to directly hit the server endpoint - e.g. http://localhost:8081/genres)
     * If not, we reject the request. This is a small mitigation to prevent against CSRF attacks.
     * Summary of possible alternatives/solutions for CSRF prevention (ONLY implement if there's time):
     *    A) Use of CSRF tokens:
     *        - Problem: Existing libraries by Express: csurf - however this is deprecated since 2020 due to security issues...
     *        - There also isn't any suitable alternative anti-CSRF token libaries at the moment due to oudated dependencies e.g. last updated 3-5 years ago...
     *        - Possible solution here is to implement your own way of generating CSRF tokens & validating them (e.g. using crypto library - see Reference 4, but time-consuming)
     *    B) Use of SameSite='Lax' or SameSite='Strict' cookies (Better security & prevention against CSRF attacks than SameSite='None' cookies)
     *        - Problem: This will prevent the cookie from being sent from the client-side to server for cross-origin requests which is our use case as we will be hosting our FE & BE on separate domains on the cloud...
     *        - This is only a potential solution assuming your FE/BE are hosted on the same domain (e.g. localhost:5000 FE & localhost:8081 BE)
     *    C) Validate the request header's "origin" field & see if the request comes from A) a trusted cross-origin domain (e.g. our own domain) or B) the same origin as the server, and if it does, we allow the request. If not, we reject the request.
     *        - We implemented the core logic of Solution C in this middleware 'verifyAgainstCSRFAttacks' to check for potential CSRF attacks & reject those requests & log them to the console if they are suspected CSRF attacks.
     *        - Refer to Reference 5 & 6 for more additional information on SOP/CORS/CSRF.
     * For the scope of this project, and given time constraints, we will be using approach C to help mitigate against CSRF attacks.
     * To add more trusted cross-origin domains, continue to add them to the 'arrayOfTrustedCrossOriginDomains' below.
     * Reference 1: https://stackoverflow.com/questions/24680302/csrf-protection-with-cors-origin-header-vs-csrf-token
     * Reference 2: https://bit.ly/3HhVx83
     * Reference 3: https://developers.google.com/search/blog/2020/01/get-ready-for-new-samesitenone-secure
     * Reference 4: https://levelup.gitconnected.com/how-to-implement-csrf-tokens-in-express-f867c9e95af0
     * Reference 5: https://anil-pace.medium.com/cross-origin-resource-sharing-cors-f3a6ec048270
     * Reference 6: https://security.stackexchange.com/questions/97825/is-cors-helping-in-anyway-against-cross-site-forgery
     */

    // A) Check if request comes from a trusted CROSS-ORIGIN domain OR
    const arrayOfTrustedCrossOriginDomains = [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://localhost:8081",
      "http://34.231.168.234:8081",
    ];
    const requestComesFromATrustedCrossOriginDomain =
      arrayOfTrustedCrossOriginDomains.includes(req.headers.origin);
    console.log("Request header origin:", JSON.stringify(req.headers.origin));
    console.log(
      "Did request come from a trusted cross-origin domain:",
      requestComesFromATrustedCrossOriginDomain
    );

    // B) Check if request comes from the SAME ORIGIN as server (e.g. we are using the browser to directly hit the server endpoint - e.g. http://localhost:8081/genres)
    // If request comes from the same origin as server, then req.headers.origin will be undefined (based on Reference 2 & personal observation in Network tab of Chrome Dev Tools)
    const requestComesFromSameOriginAsServer = req.headers.origin === undefined;
    console.log(
      "Did request come from the same origin/domain as the server:",
      requestComesFromSameOriginAsServer
    );

    // C) If request comes from a trusted cross-origin domain OR the same origin as server, then we allow the request. If not, we reject the request.
    if (
      requestComesFromATrustedCrossOriginDomain ||
      requestComesFromSameOriginAsServer
    ) {
      console.log(
        "ALLOWED as - either a) Request header's 'origin' field comes from a trusted cross-origin domain OR b) Request comes from the same origin as server ✅✅✅!",
        req.headers.origin
      );
      next();
    } else {
      console.log(
        "Request header's 'origin' field A) DOES NOT come from a trusted cross-origin domain AND b) DOES NOT come from the same origin/domain as the server ❌❌❌!",
        req.headers.origin
      );
      console.log(
        "Therefore - Suspected CSRF attack 💥💥💥! Request rejected!"
      );
      res.status(401);
      res.send({
        forbidden: "true",
        message:
          "Suspected CSRF attack! Request rejected as the request header's 'origin' field does not come from a trusted domain!",
      });
    }
  },
  verifyIsNotLoggedIn: function (req, res, next) {
    // Method 1 is used here (See verifyIsLoggedInWithValidJWT middleware below):
    var token = req.cookies.JWT;
    console.log("What is your token: ", token);

    // Method 2 is NOT used:
    // var token = req.headers["authorization"]; //retrieve authorization header’s content

    var isLoggedIn = token && token.includes("Bearer");
    console.log("Is the user logged in: ", isLoggedIn);

    if (!isLoggedIn) {
      // If user i) does not have JWT Token OR ii) has token but not "Bearer" type --> it means user is NOT logged in...
      // Then proceed to next middleware or function to allow user to create a new account or login
      next();
    } else {
      // Else if user iii) has a JWT Token && is of "Bearer" type --> it can either mean one of two possibilities:
      //    - User is logged in with valid JWT Token OR
      //    - User is "logged in" but with an invalid/expired JWT Token in his/her browser's history/cache/cookies
      // Then we reject the request to create a new account or login & ask user to either:
      //    - Sign out to remove the valid JWT Token OR
      //    - Clear his/her browser's history/cache/cookies to remove the invalid/expired JWT Token, before creating a new account or logging back in again
      res.status(400);
      res.send({
        messageOne:
          "BAD REQUEST - Unable to create a new account OR login as you are either A) already logged in or B) have an invalid/expired JWT Token in your browser's history/cache/cookies!",
        messageTwo:
          "Please either A) Sign out OR B) Clear your browser's history/cache/cookies before trying to create a new account or trying to login again!",
      });
    }
  },
  verifyIsLoggedInWithValidJWT: function (req, res, next) {
    // Method 1 is used here:
    var token = req.cookies.JWT;
    console.log("What is your token: ", token);
    // console.log(
    //   "For Postman debugging/understanding (Need to MANUALLY set 'Cookie' = 'JWT=Bearer token...' in Request Headers of POSTMAN for future requests to be sent to server with the cookie attached)",
    //   req.headers.cookie
    // );

    // Method 2 is NOT used:
    // var token = req.headers["authorization"]; //retrieve authorization header’s content

    if (!token || !token.includes("Bearer")) {
      res.status(403);
      res.send({
        authenticated: "false",
        authorized: "false",
        message:
          "Not authenticated & authorized to access this resource as you are NOT logged in!",
      });
    } else {
      // Process & verify the token
      token = token.split("Bearer ")[1]; //obtain the token’s value (cause it's in the format: Bearer <token>... hence split by Bearer & use index 1)
      console.log("Split token:", token);
      jwt.verify(token, config.secret, function (err, decoded) {
        // Verify token
        if (err) {
          console.log(
            "JWT token verification failed - token might be expired or invalid!"
          );
          res.status(403);
          res.send({
            authenticated: "false",
            authorized: "false",
            expiredOrInvalidJWT: "true",
            messageOne:
              "Not authenticated & authorized to access this resource as JWT token verification failed!",
            messageTwo: "Your JWT token might be expired or invalid!",
          });
        } else {
          console.log("Checking decoded payload from JWT:", decoded);
          // decoded is the payload from the jwt (is an object)
          req.userID = decoded.userID; //decode the userID and store in req for use
          req.email = decoded.email; //decode the email and store in req for use
          req.name = decoded.name; //decode the name and store in req for use
          req.role = decoded.role; //decode the role and store in req for use (to verify req.role === "admin" or "user")
          req.loggedIn = decoded.loggedIn; //decode the loggedIn and store in req for use
          next();
        }
      });
    }
  },
  verifyIsAdmin: function (req, res, next) {
    const isAdmin = req.role === "admin";
    console.log("Is the logged in user an admin:", isAdmin);

    if (!isAdmin) {
      // Not an admin
      res.status(403);
      res.send({
        authenticated: "true",
        authorized: "false",
        message:
          "Not authorized to access this resource as you are NOT an admin!",
      });
    } else {
      // An admin
      console.log("An admin has logged in & is accessing this resource!");
      next();
    }
  },
  verifyIsRequestSelfInitiated: function (req, res, next) {
    const requestMakerUserID = req.userID;
    console.log(
      "What is the userID that's trying to make this PUT/DELETE request:",
      requestMakerUserID
    );
    const theUserIDToBeChanged = parseInt(req.params.userID); // convert to integer as req.params.userID is a string
    console.log(
      "What is the userID that's being changed:",
      theUserIDToBeChanged
    );
    const isRequestSelfInitiated = requestMakerUserID === theUserIDToBeChanged;
    console.log("Is the request self-initiated:", isRequestSelfInitiated);

    if (!isRequestSelfInitiated) {
      // Illegal request that is made by someone else
      res.status(403);
      res.send({
        authorized: "false",
        message:
          "Not authorized to PUT/DELETE this resource as you are NOT THE USER!",
      });
    } else {
      // Legal request that is made by the user himself/herself
      console.log("A user is trying to PUT/DELETE his/her own resource!");
      next();
    }
  },
};

module.exports = verificationLib;
