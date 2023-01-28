import ProfileCard from "../ProfileCard";
import { ABOUT_US_DATA } from "../../utils/constants";

export default function AboutUsPage() {
  return (
    <>
      <b id="aboutUsText">About Us:</b>
      <div>
        {ABOUT_US_DATA.map((data, index) => (
          <ProfileCard data={ABOUT_US_DATA[index]} key={index} />
        ))}
      </div>
    </>
  );
}
