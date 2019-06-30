const inputs = document.querySelectorAll(".controls input");
const span = document.querySelector("#main h1 span");

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.id}`,
    this.value + suffix
  );
}

inputs.forEach(input => input.addEventListener("change", handleUpdate));
inputs.forEach(input => input.addEventListener("mousemove", handleUpdate));
