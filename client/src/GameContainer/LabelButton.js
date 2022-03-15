function LabelButton({ labelToggle, setLabelToggle }) {

  function handleToggle() {
    setLabelToggle(!labelToggle)
    console.log("labelToggle: " + labelToggle)
  }

  return (
    <button className="login-button" onClick={handleToggle}>toggle grid</button>
  );
}

export default LabelButton