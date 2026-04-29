
  // A simple lookup table of mixes (you can expand this list).
  const mixTable = {
    "red+black":   { colourName: "Maroon",      hex: "#800000" },
    "red+white":   { colourName: "Pink",        hex: "#FFC0CB" },
    "blue+black":  { colourName: "Navy",        hex: "#000080" },
    "blue+white":  { colourName: "Light Blue",  hex: "#ADD8E6" },
    "yellow+blue": { colourName: "Green",       hex: "#008000" },
    "red+blue":    { colourName: "Purple",      hex: "#800080" },
    "yellow+red":  { colourName: "Orange",      hex: "#FFA500" },
    "white+black": { colourName: "Gray",        hex: "#818181" },
    "yellow+black":{ colourName: "Olive Green", hex: "#788102" },
    "yellow+white":{ colourName: "Light Yellow",hex: "#f4fc7e" },
  };

  // Run after the HTML is loaded
  document.addEventListener("DOMContentLoaded", () => {

    const colour1El = document.getElementById("colour1");
    const colour2El = document.getElementById("colour2");
    const mixBtn = document.getElementById("mixBtn");
    const resultNameEl = document.getElementById("resultName");
    const previewEl = document.getElementById("preview");
    const messageEl = document.getElementById("message");

    function setMessage(text) {
      messageEl.textContent = text;
    }

    function resetOutput() {
      resultNameEl.textContent = "—";
      previewEl.style.backgroundColor = "transparent";
      previewEl.textContent = "Display colour here";
    }

    function showResult(colourName, hex) {
      resultNameEl.textContent = colourName;
      previewEl.style.backgroundColor = hex;
      previewEl.textContent = "";
    }

    mixBtn.addEventListener("click", () => {
      const c1 = colour1El.value;
      const c2 = colour2El.value;

      setMessage("");
      resetOutput();

      if (!c1 || !c2) {
        setMessage("Please select both colours first.");
        return;
      }

      // Make mixing order-independent (red+black == black+red)
      const keyA = `${c1}+${c2}`;
      const keyB = `${c2}+${c1}`;

      const mix = mixTable[keyA] || mixTable[keyB];

      if (mix) {
        showResult(mix.colourName, mix.hex);
        setMessage(`Nice! ${c1} + ${c2} makes ${mix.colourName}.`);
      } else {
        setMessage("That combination isn’t saved yet. Try another mix!");
      }
    });

  });
