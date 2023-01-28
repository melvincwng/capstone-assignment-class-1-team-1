import { clearSessionStorage } from "./../../utils/functions";

export default function UnauthorizedInvalidPage() {
  function goBack() {
    clearSessionStorage();
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Error 401: Unauthorized</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "345px",
        }}
      >
        <div>Something went wrong!</div>
        <div>You have entered an invalid URL/route!</div>
        <div>
          <a href="#" onClick={goBack}>
            ⬅️ Click here to go back!
          </a>
        </div>
      </div>
    </>
  );
}
