const clrIn = document.getElementById("color-input");
const modSel = document.getElementById("mode-select");
const clrBtn = document.getElementById("btn");

const clrCnt = 5;
const clrmds = [
  "monochrome",
  "monochrome-dark",
  "monochrome-light",
  "analogic",
  "complement",
  "analogic-complement",
  "triad",
];

clrBtn.addEventListener("click", getClrSch);

// Get color scheme data from API
function getClrSch() {
  const hex = clrIn.value.slice(1);
  const mod = modSel.value;
  const cnt = clrCnt;

  let url = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mod}&count=${cnt}`;

  fetch(url)
    .then((res) => res.json())
    .then((clrsch) => {
      const clrArr = clrsch.colors;
      const html = clrArr
        .map((clr) => {
          return `
          <div class="color-column">
            <div class="color-block" data-hex="${clr.hex.value}" style="--bg-color: ${clr.hex.value}">
            </div>
              <span class="color-label" data-hex="${clr.hex.value}">
                ${clr.hex.value}
              </span>
          </div>`;
        })
        .join("");

      const container = document.getElementById("color-generator");
      container.innerHTML = html;
      // Click to copy for both block and label
      container.querySelectorAll(".color-block, .color-label").forEach((el) => {
        el.addEventListener("click", () => {
          const hex = el.getAttribute("data-hex");
          navigator.clipboard.writeText(hex);
          el.classList.add("copied");
          setTimeout(() => el.classList.remove("copied"), 1000);
        });
      });
    });
}

// Render color scheme select options
function renderSel() {
  clrmds.forEach((mode) => {
    const opt = document.createElement("option");
    opt.value = mode;
    opt.textContent = mode;
    modSel.appendChild(opt);
  });
}

renderSel();
getClrSch();
