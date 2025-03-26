const initRulerFn = () => {
  let tickLabelPos = 0;
  let newTickLabels = [];
  const topRulerEl = document.querySelector(".top-ruler");
  const bottomRulerEl = document.querySelector(".bottom-ruler");
  const leftRulerEl = document.querySelector(".left-ruler");
  const rightRulerEl = document.querySelector(".right-ruler");
  const rulerLength = topRulerEl.scrollWidth;
  while (tickLabelPos <= rulerLength) {
    if (tickLabelPos % 50 == 0) {
      newTickLabels.push(
        `<div class="tick tick-label" style="left: ${tickLabelPos}px;">${tickLabelPos}</div>`
      );
    } else if (tickLabelPos % 10 == 0) {
      newTickLabels.push(
        `<div class="tick tick-major" style="left: ${tickLabelPos}px;"></div>`
      );
    } else if (tickLabelPos % 5 == 0) {
      newTickLabels.push(
        `<div class="tick tick-minor" style="left: ${tickLabelPos}px;"></div>`
      );
    }
    tickLabelPos += 5;
  }

  topRulerEl.innerHTML = newTickLabels.join("");
  bottomRulerEl.innerHTML = newTickLabels.join("");

  newTickLabels.length = 0;
  tickLabelPos = 0;
  while (tickLabelPos <= leftRulerEl.scrollHeight) {
    if (tickLabelPos % 50 == 0) {
      newTickLabels.push(
        `<div class="tick tick-label" style="top: ${tickLabelPos}px;">${tickLabelPos}</div>`
      );
    } else if (tickLabelPos % 10 == 0) {
      newTickLabels.push(
        `<div class="tick tick-major" style="top: ${tickLabelPos}px;"></div>`
      );
    } else if (tickLabelPos % 5 == 0) {
      newTickLabels.push(
        `<div class="tick tick-minor" style="top: ${tickLabelPos}px;"></div>`
      );
    }
    tickLabelPos += 5;
  }
  leftRulerEl.innerHTML = newTickLabels.join("");
  rightRulerEl.innerHTML = newTickLabels.join("");
};

initRulerFn();
window.onresize = initRulerFn;

window.joppInit = (initOpts) => {
  window.onresize = null;
  const { pdfInfo } = initOpts;

  const rulerContainerEl = document.querySelector(".ruler-container");
  rulerContainerEl.style.width = pdfInfo.width + "px";
  rulerContainerEl.style.height = pdfInfo.height + "px";
  initRulerFn();
};
