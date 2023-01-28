export default function AdditionalNotes() {
  return (
    <div id="additionalNotes">
      <b>*</b>For 'Delete Multiple Movies' (2nd component in this screen), you
      can select multiple movies/options to delete. This would differ based on
      your OS & browser. To select multiple options, you can do the following:
      <ul>
        <li>
          For Windows: Hold down the control (Ctrl) button to select / click
          multiple options. If selecting only 1 option, make sure to click on it
          first (should see a blue highlighted option), before clicking the
          'Delete' button.
        </li>
        <li>
          For Mac: Hold down the command button to select / click multiple
          options. Likewise, if only selecting 1 option, please make sure to
          click on it first prior to clicking the 'Delete' button.
        </li>
        <li>
          Reference:{" "}
          <a
            href="https://www.w3schools.com/tags/att_select_multiple.asp"
            target="_blank"
            rel="noopener noreferrer"
            className="additionalNotesLink"
          >
            W3Schools
          </a>
        </li>
      </ul>
    </div>
  );
}
