export default function BackCard({ data }) {
  return (
    <div className="card mb-3 card-div-back-card">
      <div className="card-body">
        <h6 className="card-title">{data.backCardTextOne}</h6>
        <div className="card-text back-card-ul">
          <ul>
            {data.backCardTextTwoArray.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
            <li>
              {data.githubText}{" "}
              <a
                href={data.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                {data.clickHereText}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
