document.getElementById("form").addEventListener("submit", (e) => {
  let chosenColor = document.getElementById("color").value;
  let modeEl = document.getElementById("mode");
  let selectedMode = modeEl.options[modeEl.selectedIndex].value;
  e.preventDefault();
  getColorScheme(chosenColor.substring(1), selectedMode);
});

function getColorScheme(color, mode) {
  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`)
    .then((res) => res.json())
    .then((data) => {
      renderColor(data.colors);
    });
}

function renderColor(colorsArray) {
  const colorHtml = colorsArray
    .map((color) => {
      return `
        <div class="color-box">
            <div class="color"><img src="${color.image.bare}" id="img"/></div>
            <div class="hex">${color.hex.value}</div>
        </div>
        `;
    })
    .join("");
  document.getElementById("scheme-container").classList.remove("onload");
  document.getElementById("scheme-container").innerHTML = colorHtml;
}
