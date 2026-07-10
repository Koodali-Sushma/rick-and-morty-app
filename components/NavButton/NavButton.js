export function NavButton(text, className, onClickCallback) {
  const button = document.createElement("button");
  button.classList.add("button", className);
  button.textContent = text;

  //callback parameter passed from index.js
  button.addEventListener("click", onClickCallback);
  return button;
}
