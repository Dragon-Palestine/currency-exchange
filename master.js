const parentOfAmount = document.querySelector(".content .inp > input");
const btn = document.querySelector(".content > button");
const select = document.querySelector("select");
const resultOfTrans = document.querySelector(".result .numre");
const isoResultOfTrans = document.querySelector(".result .textre");

const header = document.querySelector(".header");
const rotate = document.querySelector(".header .rotate");

const textINp = document.querySelector(".inp > p");

let palTOAny = true;

rotate.onclick = () => {
  header.classList.toggle("row");
  palTOAny = !palTOAny;
  if (!palTOAny) {
    textINp.textContent = select.value;
    isoResultOfTrans.textContent = "ILS";
  } else {
    textINp.textContent = "ILS";
    isoResultOfTrans.textContent = select.value;
  }
};

const valueOfIso = (iso) => {
  return fetch(
    "https://v6.exchangerate-api.com/v6/3faaf9b3f645e566da5961b1/latest/USD"
  )
    .then((req) => req.json())
    .then((data) => data.conversion_rates[iso]);
};
select.onchange = () => {
  if (!palTOAny) textINp.textContent = select.value;
  else isoResultOfTrans.textContent = select.value;
};
btn.onclick = () => {
  const amount = parseFloat(parentOfAmount.value);
  if (amount) {
    const iso = select.value;
    valueOfIso(iso).then((val) => {
      valueOfIso("ILS").then((pal) => {
        const baseVal = 1 / val; // Trans to USD
        let result = 0;
        if (palTOAny) {
          result = amount / (pal * baseVal);
        } else {
          result = amount * (pal * baseVal);
        }
        resultOfTrans.textContent = result.toFixed(2);
      });
    });
  }
};
