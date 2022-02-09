function LabelButton({ labelToggle, setLabelToggle }) {

  function handleToggle() {
    setLabelToggle(!labelToggle)
    console.log("labelToggle: " + labelToggle)
  }

  return (
    <button className="login-button" onClick={handleToggle}>toggle labels</button>
  );
}

export default LabelButton