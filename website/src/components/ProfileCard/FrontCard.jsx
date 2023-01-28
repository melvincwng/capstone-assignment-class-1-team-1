export default function FrontCard({ data }) {
  return (
    <div className="card mb-3 card-div-front-card">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={data.imageURL}
            className="img-fluid rounded-start"
            alt="about-us-image"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{data.frontCardName}</h5>
            <p className="card-text">{data.frontCardTextOne}</p>
            <p className="card-text text-muted rotate-card-text">
              <small>{data.frontCardTextTwo}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
