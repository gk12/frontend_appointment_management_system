import React, { useState } from "react";

const useDisableButton = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  function handleButtonDisablity() {
    setButtonDisable(!buttonDisable);
  }
  function handleResetButton() {
    setButtonDisable(false);
  }
  return { handleButtonDisablity, handleResetButton, buttonDisable };
};

export default useDisableButton;
