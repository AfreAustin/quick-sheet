const refNav = document.getElementById("ref-nav");
const navMenu = document.getElementById("nav-menu");
const directory = document.getElementById("directory");

/*
*  Change reference directory based on navigation
*  Hide reference list and show directory list
*  Show button that switches back to reference list
*/
const navItems = document.querySelectorAll("#ref-nav li");
for (let i = 0; i < navItems.length; i++) {
  navItems.item(i).addEventListener("click", () => {
    refNav.style.display = "none";
    navMenu.style.display = "block";
    directory.style.display = "block";

    let title = navItems.item(i).innerText.trim().split(" ");
    let sheet = title[0];

    document.getElementById("directory-search").placeholder = "Search " + sheet;
  }, false);
}

const toggleNav = document.getElementById("toggle-nav");
toggleNav.addEventListener("click", () => {
  refNav.style.display = "block";
  navMenu.style.display = "none";
  directory.style.display = "none";
}, false);

/*
*  filter reference directory by search value
*/
const dirSearch = document.getElementById("directory-search");
dirSearch.addEventListener("input", () => {
  let search = dirSearch.value;
  let terms = directory.getElementsByClassName("term");
  // let titles = directory.getElementsByClassName("category-title"); // TODO: Hide title if no bubbles shown?

  for (let i = 0; i < terms.length; i++) {
    let found = terms.item(i).innerText.toUpperCase().match(search.toUpperCase());
    if (found) terms.item(i).parentElement.style.display = "block";
    else terms.item(i).parentElement.style.display = "none";
  }
}, false);

/*
// convert terms from JSON to objects
let temp = {
  category: "New Section",
  term: "Stuff",
  definition: "Stuff define"
};
let temp2 = {
  category: "New Section",
  term: "Command",
  definition: "Command Description"
};
const refTerms = [temp, temp2, , temp2, temp2, temp2, temp2, temp2, temp2, temp2, temp2, temp2, temp2, temp2, temp2, temp2, temp2, temp2];

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

// adds onclick event to all elements with term-bubble class
// click event swaps reference article and enables edit and source
const listTerms = document.getElementById("directory").getElementsByClassName("term-bubble");
for (let i = 0; i < listTerms.length; i++) {
  let currBubble = listTerms.item(i);
  currBubble.addEventListener("click", function(){
    let currTerm = currBubble.children;

    document.getElementById("ref-title").innerText = currTerm.item(0).innerText;
    document.getElementById("ref-desc").innerText = currTerm.item(1).innerText;

    document.getElementById("ref-link").style.display = "inline";
    document.getElementById("edit-button").removeAttribute("disabled");
  }, false);
}

// toggle dialog box
function toggleDialog() {
  const formDialog = document.getElementById("form-dialog");

  if (formDialog.open) formDialog.close();
  else formDialog.showModal();
}

// add new item to a reference sheet
function newItem() {
  const formTitle = document.getElementById("form-title");

  toggleDialog();
  formTitle.innerText = "Adding New Term";
  
  console.log("TO BE IMPLEMENTED");
}

// edit existing item
function editItem() {
  const formTitle = document.getElementById("form-title");
  let term = document.getElementById("ref-title");
  formTitle.innerText = "Editing " + term.innerText;

  toggleDialog();
  console.log("TO BE IMPLEMENTED");
}
*/