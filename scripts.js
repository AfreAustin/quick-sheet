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
  navItems.item(i).addEventListener("click", () => {
    refNav.style.display = "none";
    navMenu.style.display = "block";
    directory.style.display = "block";

    let title = navItems.item(i).innerText.trim().split(" ");
    document.getElementById("directory-search").placeholder = "Search " + title[0];

    fetch('HTML.json')
      .then((res) => res.json())
      .then((json) => console.log(json));

  }, false);
}

function convertJSONtoTerms(json) {
  return "to be implemented"
}

/*
*  Swap reference article and enable editing
*/
const listTerms = directory.querySelectorAll(".term-bubble");
for (let i = 0; i < listTerms.length; i++) {
  listTerms.item(i).addEventListener("click", () => {
    let currTerm = listTerms.item(i).children;

    document.getElementById("edit-button").removeAttribute("disabled");

    document.getElementById("ref-title").innerText = currTerm.item(0).innerText;
    document.getElementById("ref-tag").innerText = currTerm.item(1).innerText;
    document.getElementById("ref-src").style.display = "inline";
  }, false);
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

/*
// populate directory with reference's terms (ES6+)
let directory = document.getElementById("directory");
refTerms.forEach(function(term) {
  let sections = directory.children;
  let exists = false;

  for (i = 0; i < sections.length; i++) {
    let category = sections.item(i).firstElementChild.innerText; 
    if (category.toUpperCase() == term.category.toUpperCase()) exists = true;
  }

  if (exists == false) {
    const categoryElem = document.createElement("section");
    const catTitleElem = document.createElement("h3");

    categoryElem.setAttribute("class", "category");
    catTitleElem.setAttribute("class", "category-title");

    directory.appendChild(categoryElem);
    categoryElem.appendChild(catTitleElem);
    catTitleElem.innerText = term.category;
  }

  for (i = 0; i < sections.length; i++) {
    if (term.category.toUpperCase() == sections.item(i).firstElementChild.innerText.toUpperCase()) {
      const bubbleElem = document.createElement("div");
      const termElem = document.createElement("dt");
      const defElem = document.createElement("dd");

      bubbleElem.setAttribute("class", "term-bubble");
      bubbleElem.setAttribute("title", term.term);
      termElem.setAttribute("class", "term");
      defElem.setAttribute("class", "def");

      sections.item(i).appendChild(bubbleElem);
      bubbleElem.appendChild(termElem);
      termElem.innerText = term.term;
      bubbleElem.appendChild(defElem);
      defElem.innerText = term.definition;
    }
  }
});
*/