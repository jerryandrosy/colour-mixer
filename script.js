const mixTable = {
  "red+black":    { colourName: "Maroon",       hex: "#800000" },
  "red+white":    { colourName: "Pink",         hex: "#FFC0CB" },
  "blue+black":   { colourName: "Navy",         hex: "#000080" },
  "blue+white":   { colourName: "Light Blue",   hex: "#ADD8E6" },
  "yellow+blue":  { colourName: "Green",        hex: "#008000" },
  "red+blue":     { colourName: "Purple",       hex: "#800080" },
  "yellow+red":   { colourName: "Orange",       hex: "#FFA500" },
  "white+black":  { colourName: "Gray",         hex: "#818181" },
  "yellow+black": { colourName: "Olive Green",  hex: "#788102" },
  "yellow+white": { colourName: "Light Yellow", hex: "#f4fc7e" }
};

document.addEventListener("DOMContentLoaded", () => {
  const colour1El = document.getElementById("colour1");
  const colour2El = document.getElementById("colour2");
  const mixBtn = document.getElementById("mixBtn");
  const resetBtn = document.getElementById("resetBtn");
  const resultNameEl = document.getElementById("resultName");
  const previewEl = document.getElementById("preview");
  const messageEl = document.getElementById("message");
  const historyListEl = document.getElementById("historyList");

  function setMessage(text) {
    messageEl.textContent = text;
  }

  function resetOutput() {
    resultNameEl.textContent = "—";
    previewEl.style.backgroundColor = "transparent";
    previewEl.textContent = "Display colour here";
    previewEl.classList.remove("active");
    setMessage("");
  }

  function showResult(colourName, hex) {
    resultNameEl.textContent = colourName;
    previewEl.style.backgroundColor = hex;
    previewEl.textContent = "";
    previewEl.classList.remove("active");

    setTimeout(() => {
      previewEl.classList.add("active");
    }, 10);
  }

  function addToHistory(firstColour, secondColour, resultColour) {
    const listItem = document.createElement("li");
    listItem.textContent = `${firstColour} + ${secondColour} = ${resultColour}`;
    historyListEl.prepend(listItem);

    if (historyListEl.children.length > 5) {
      historyListEl.removeChild(historyListEl.lastChild);
    }
  }

  mixBtn.addEventListener("click", () => {
    const c1 = colour1El.value;
    const c2 = colour2El.value;

    resetOutput();

    if (!c1 || !c2) {
      setMessage("Please select both colours first.");
      return;
    }

    if (c1 === c2) {
      showResult(c1.charAt(0).toUpperCase() + c1.slice(1), c1);
      setMessage(`You selected the same colour twice, so the result is still ${c1}.`);
      addToHistory(c1, c2, c1);
      return;
    }

    const keyA = `${c1}+${c2}`;
    const keyB = `${c2}+${c1}`;
    const mix = mixTable[keyA] || mixTable[keyB];

    if (mix) {
      showResult(mix.colourName, mix.hex);
      setMessage(`Nice! ${c1} + ${c2} makes ${mix.colourName}.`);
      addToHistory(c1, c2, mix.colourName);
    } else {
      setMessage("That combination is not saved yet. Try another mix.");
    }
  });

  resetBtn.addEventListener("click", () => {
    colour1El.value = "";
    colour2El.value = "";
    resetOutput();
  });
});