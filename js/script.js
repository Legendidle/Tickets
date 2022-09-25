let body = document.body;
let contentRender = body.querySelector(".content__render-list");
let template = body.querySelector("#template").content;
let search = body.querySelector(".tickets__search-btn");
let searchInput = body.querySelector(".tickets__search-input");
let sort = body.querySelector(".tickets__sort");
let filter = body.querySelector(".tickets__filter");

//createElement

function createElement (user) {

  let elItem = template.cloneNode(true)
  let priorityText = elItem.querySelector(".priority-text");

  elItem.querySelector(".item-img").src = user.ava;
  elItem.querySelector(".span-detail").textContent = user.company; 
  elItem.querySelector(".content-detail").textContent = user.date_of_onliine;
  elItem.querySelector(".span-name").textContent = user.name;
  elItem.querySelector(".content-name").textContent = user.phone;
  elItem.querySelector(".span-date").textContent = user.date_of_register;
  elItem.querySelector(".content-date").textContent = user.time;
  priorityText.textContent = user.priority;

  let priority = user.priority;
 

  if(priority === "high"){
    priorityText.style.background = "#F12B2C";
  }
  else if(priority === "normal"){
    priorityText.style.background = "#29CC97";
  }
  else{
    priorityText.style.background = "#FEC400";
  }

  return elItem
}

//render

// let cuttenData = data.slice(0,6);

function render(users) {
  contentRender.innerHTML = "";
  
  let listFragment = document.createDocumentFragment();

  // console.log(listFragment);

  users.forEach((user) => {
    listFragment.append(createElement(user))
  });

  contentRender.appendChild(listFragment)
}

//search

search.addEventListener("click", () => {
  searchInput.classList.toggle("block")
  searchInput.focus();
  searchInput.value = "";
})

searchInput.addEventListener("input", () => {
  let inputValue = searchInput.value.toLowerCase().trim();
  let searchUsers = data.filter(user => user.name.toLowerCase().includes(inputValue));
  
  render(searchUsers);

})


//sort 
let sortArr = [...data];

sort.addEventListener("change", () => {
  sortArr.sort((a,b) => {
    if(a.name > b.name) return 1;
    else if(a.name < b.name) return -1;
    return 0
  })
  
  if (sort.value === "a-z") {
    render(sortArr)
  }
  else if (sort.value === "z-a") {
    render(sortArr.reverse())
  }
  else if (sort.value === "default"){
    render(data);
  }
})

//filter
filter.addEventListener("change", () => {
  let filterUser = filter.value
  let filteredUsers = sortArr.filter(user => user.priority.toLowerCase().includes(filterUser));
  
  render(filteredUsers);

  if(filter.value === "default"){
    render(sortArr);
  }
})

//changePriority

contentRender.addEventListener("click", (evt) => {
  if(evt.path[1].matches(".priority-btn")) {
    let selectPriority = evt.path[1].nextElementSibling
    console.log(selectPriority);
    // selectPriority.classList.toggle("block");
  }
})





render(data);

