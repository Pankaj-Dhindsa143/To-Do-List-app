const inputValue = document.querySelector(".input");
const addbtn = document.querySelector(".addbtn");
let btnText = addbtn.innerText;
const ShowInput = document.getElementById("ShowInput");
let inputContainer = document.querySelector(".inputContainer");


let task = document.querySelector(".task");

let userArr = [];
let Edit_id = null;

let Todos = localStorage.getItem("users");
if (Todos != null) {
  userArr = JSON.parse(Todos);
}
DisplayInfo();


ShowInput.addEventListener('click',() =>{
  inputContainer.classList.toggle("ShowInput")
})




addbtn.addEventListener("click", () => {
  let itemName = inputValue.value;
  if (inputValue.value == "") {
    alert("enter");
  } else if (Edit_id != null) {
    userArr.splice(Edit_id, 1, { name: itemName, status: "peanding" });
    Edit_id = null;
  } else {
    userArr.push({ name: itemName, status: "pending" });
  }

  SaveInfo(userArr);
  inputValue.value = "";
  addbtn.innerText = btnText;
  inputContainer.classList.remove("ShowInput")
});

function SaveInfo(userArr) {
  let string = JSON.stringify(userArr);
  localStorage.setItem("users", string);
  DisplayInfo();
}

function DisplayInfo() {
  let li = "";
  userArr.forEach((user, id) => {
    li += ` <li>
                <label for="${id}" class="li-1st-box">
                
                  <input  onclick="updateStatus(this)" type="checkbox" id="${id}">
                
                  <p class="pankaj">${user.name}</p>
                </label>
                 
                 <div>
                   
                  
                     <button onclick='Editinfo(${id})'><i class="fa-regular fa-pen-to-square"></i></button>
                     <button onclick='deleteinfo(${id})'> <i class="fa-solid fa-trash"></i></button>
                    
                  </div>
              </li>`;
  });
  task.innerHTML = li;
}

function updateStatus(selectedTask) {
  let TaskName = selectedTask.parentElement.lastElementChild;

  if (selectedTask.checked) {
    TaskName.classList.add("checked");
    userArr[selectedTask.id].status = "completed";
  } else {
    TaskName.classList.remove("checked");
    userArr[selectedTask.id].status = "pending";
  }

}


function Editinfo(id) {
  Edit_id = id;
  inputValue.value = userArr[id].name;
  addbtn.innerText = "Edit save";
  inputContainer.classList.add("ShowInput")
}

function deleteinfo(id) {
  userArr.splice(id, 1);
  SaveInfo(userArr);
}
