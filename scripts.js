import parseTermInfo from "./parseTermInfo.js";

const refNav = document.getElementById("ref-nav");
const navMenu = document.getElementById("nav-menu");
const directory = document.getElementById("directory");

// Switches navigation from directory to reference list
const toggleNav = document.getElementById("toggle-nav");
toggleNav.addEventListener("click", () => {
  refNav.style.display = "block";
  navMenu.style.display = "none";
  directory.style.display = "none";
}, false);

/*
*  Change reference directory based on navigation
*  Hide reference list and show directory list with navigation menu
*  Indicate selected reference in search bar 
*/
const navItems = document.querySelectorAll("#ref-nav li");
for (let i = 0; i < navItems.length; i++) {
  navItems.item(i).addEventListener("click", async () => {
    refNav.style.display = "none";
    navMenu.style.display = "block";
    directory.style.display = "block";

    let title = navItems.item(i).innerText.trim().split(" ");
    document.getElementById("directory-search").placeholder = "Search " + title[0];

    convertJSONtoTerms(title);
  }, false);
}

async function convertJSONtoTerms(title) {
  await fetch(title[0]+ '.json')
  .then((res) => res.json())
  .then((json) => {
    let reference = JSON.stringify(json);
    let refObj = JSON.parse(reference);
    let text = "";

    for (let category of refObj.categories) {
      text += '<details class="category"><summary class="category-title">' + category + '</summary></details>'
    }
    directory.innerHTML = text;

    let categories = directory.children
    for (let term of refObj.terms) {
      for (let i = 0; i < categories.length; i++) {
        if (term.category.toUpperCase() == categories.item(i).firstElementChild.innerText.toUpperCase()) {
          let termElem = document.createElement("div");
          let termText = "";

          termText += '<div class="term-bubble" title="' + term.category + '">';
          termText += '<dt class="term">' + term.name + '</dt>';
          termText += '<dd class="def">' + term.tag + '</dd>';
          termText += '</div>';

          termElem.innerHTML = termText;

          termElem.addEventListener("click", () => {
            document.getElementById("edit-button").removeAttribute("disabled");

            document.getElementById("ref-src").href = term.source;
            document.getElementById("ref-mod").innerText = "Modified " + new Date(term.modified);
            document.getElementById("ref-title").innerText = term.name;
            document.getElementById("ref-tag").innerText = term.tag;

            document.getElementById("ref-info").innerHTML = parseTermInfo(term.info);
          });

          categories.item(i).append(termElem);
        }
      }
    }
  })
  .catch((err) => console.log('There was an error', err));
}

/*
*  Filter reference directory by search value
*/
const dirSearch = document.getElementById("directory-search");
dirSearch.addEventListener("input", () => {
  let terms = directory.getElementsByClassName("term");
  let search = dirSearch.value;

  for (let i = 0; i < terms.length; i++) {
    let found = terms.item(i).innerText.toUpperCase().match(search.toUpperCase());
    if (found) terms.item(i).parentElement.style.display = "block";
    else terms.item(i).parentElement.style.display = "none";
  }
}, false);

// ------------------------------------------------------------------------------------------------------------------------
const formDialog = document.getElementById("form-dialog");
const formTitle = document.getElementById("form-title");

// toggle dialog box
function toggleDialog() {
  if (formDialog.open) formDialog.close();
  else formDialog.showModal();
}

// close form
const closeForm = document.getElementById("close-form");
closeForm.addEventListener("click", () => toggleDialog(), false);

// add new item to a reference sheet
const addItem = document.getElementById("add-button");
addItem.addEventListener("click", () => {
  toggleDialog();
  formTitle.innerText = "Adding New Term";
  
  console.log("TO BE IMPLEMENTED");
}, false);

// edit existing item
const editItem = document.getElementById("edit-button");
editItem.addEventListener("click", () => {
  let term = document.getElementById("ref-title");

  toggleDialog();
  formTitle.innerText = "Editing " + term.innerText;

  console.log("TO BE IMPLEMENTED");
}, false);