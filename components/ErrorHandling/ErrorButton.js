// components/ErrorButton.js

export function ErrorButton(onClick) {
  const button = document.createElement("button");

  // style this class in CSS with a red theme later
  button.classList.add("button", "button--error");
  button.textContent =
    "⚠️ Something went wrong. Slow down for 1 minute and Click to Retry";

  // When clicked, run the reload/fetch in index.js
  button.addEventListener("click", onClick);

  return button;
}
