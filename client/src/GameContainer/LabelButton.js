function LabelButton({ labelToggle, setLabelToggle }) {

  function handleToggle() {
    setLabelToggle(!labelToggle)
    console.log("labelToggle: " + labelToggle)
  }

  return (
    <button className="label-toggle" onClick={handleToggle}>toggle labels</button>
  );
}

export default LabelButton