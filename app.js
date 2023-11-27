const div = document.querySelector(".con");
const inpEl = document.querySelector("input");
const formEl = document.querySelector("form");
const btnEl = document.querySelector("button");
const font1 = document.querySelector(".select-list .li1");
const font2 = document.querySelector(".select-list .li2");
const font3 = document.querySelector(".select-list .li3");
const maniFont = document.querySelector(".main-font");
const mode = document.querySelector(".pod");
let count = 1;
const modeLink = document.querySelector(".modeLink");
mode.addEventListener("click", () => {
  if (count % 2 == 0) {
    count = 1;
    modeLink.removeAttribute("href");
    modeLink.setAttribute("href", "main.css");
  } else if (modeLink.hasAttribute("href", "dark.css")) {
    count = 2;
    modeLink.removeAttribute("href");
    modeLink.setAttribute("href", "dark.css");
  }
});

font1.addEventListener("click", (e) => {
  fonts(e);
});
font2.addEventListener("click", (e) => {
  fonts(e);
});
font3.addEventListener("click", (e) => {
  fonts(e);
});
function fonts(r) {
  let thiss = r.target;
  maniFont.textContent = thiss.textContent;
  document.body.style.fontFamily = thiss.textContent;
}

formEl.addEventListener("submit", (e) => {
  let inputValue = inpEl.value;
  api(inputValue);
  inpEl.value = "";
  e.preventDefault();
});

async function api(j) {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${j}`
  );
  const data = await res.json();
  console.log(data);
  if (data.resolution) {
   erro(data)
  } else {
    renHTML(data);
  }
  console.log(data);
}

function erro(err) {
  const newError = `
  <div class="container error">
    <img class="emo" src="images/emo.svg" alt="emogi" />
    <h2>${err.title}</h2>
    <p>${err.message}</p>
  </div>
  `;
  div.innerHTML = newError
}

function renHTML(d) {
  const newHTML = `
    <div class="container main-word">
    <div class="word">
      <div class="word-a">${d[0].word}</div>
      <div class="word-y">${
        d[0].phonetics[0].text ? d[0].phonetics[0].text : ""
      }</div>
    </div>
    <img class="play" src="images/play2.svg" alt="play" />
  </div>
  <div class="noun container">
    <div class="noun__head">
      <p class="noun__head-p">noun</p>
      <div class="noun__head-line"></div>
    </div>
    <p class="maining-p">maining</p>
    <ul class="maining">
    ${makeLi(d[0].meanings)}
    </ul>
    <p class="senonim">senonym <span class="senonm-words">${sinon(
      d[0].meanings[0].synonyms
    )}</span></p>
  </div>
  <div class="noun container">
    <div class="noun__head">
      <p class="noun__head-p">verb</p>
      <div class="noun__head-line"></div>
    </div>
    <p class="maining-p">maining</p>
    <ul class="maining">
      ${makeVerb(d[0].meanings)}
      </ul>
      <p class="maining-p">example</p>
      <ul class="maining">
      ${makeEx(d[0].meanings)}
      </ul>
      
  </div>
  <hr class="container">
  <footer class="container">
    <p>sourse</p>
    <a href=${d[0].sourceUrls}>${d[0].sourceUrls}</a>
  </footer>
    `;
  div.innerHTML = newHTML;
  let asd = document.querySelector(".play");
  asd.addEventListener("click", (event) => {
    playSound(d[0].phonetics[0].audio);
  });
}

function playSound(audiolink) {
  let audio = new Audio(audiolink);
  audio.play();
}

function makeLi(l) {
  let li = "";
  for (let i = 0; i < l.length; i++) {
    if (l[i].partOfSpeech === "noun") {
      for (let x = 0; x < l[i].definitions.length; x++) {
        // return console.log(l[i].definitions[1].definition );
        li += `<li class="main1">${l[i].definitions[x].definition}</li>`;
      }
    }
  }
  return li;
}

function makeVerb(l) {
  let li = "";
  for (let i = 0; i < l.length; i++) {
    if (l[i].partOfSpeech === "verb") {
      for (let x = 0; x < l[i].definitions.length; x++) {
        // return console.log(l[i].definitions[1].definition );
        li += `<li class="main1">${l[i].definitions[x].definition}</li>`;
      }
    }
  }
  return li;
}

function makeEx(l) {
  let li = "";
  for (let i = 0; i < l.length; i++) {
    if (l[i].partOfSpeech === "verb") {
      for (let x = 0; x < l[i].definitions.length; x++) {
        // return console.log(l[i].definitions[1].definition );
        if (l[i].definitions[x].example) {
          li += `<li class="main1">${l[i].definitions[x].example}</li>`;
        }
      }
    }
  }
  return li;
}

function sinon(s) {
  let span = "";
  for (let i = 0; i < s.length; i++) {
    span += ` <span class="senonm-words">${s[i]},</span>`;
  }
  return span;
}
