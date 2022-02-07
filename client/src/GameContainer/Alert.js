function Alert({ status }){

  let formattedStatus = [];

  if (typeof status === "object") {
    for (const key in status) {
      formattedStatus.push(status[key]);
    } 
  }
  else {
    formattedStatus.push(status);
  }

    return (
        <div id="alert">
            {formattedStatus.map(msg => (
              <span className="alert-message">
                {msg.toLowerCase()}
                <br/>
              </span>
            ))}
        </div>
    );
};

export default Alert;