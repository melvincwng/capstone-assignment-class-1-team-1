import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

export default function ProfileCard({ data }) {
  return (
    <>
      <div className="card-flip-parent-container">
        <div className="card-flip-child-container">
          <div className="card-flip-front-card">
            <FrontCard data={data} />
          </div>
          <div className="card-flip-back-card">
            <BackCard data={data} />
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
