baseURL = "http://localhost:4455/";
const listContainer = document.getElementById("list-container");
window.addEventListener("load", async () => {
  const response = await axios.get(baseURL);
  console.log(response.data);
  showPlaces(response.data);
});

document.querySelector("#foodForm").addEventListener("submit", addPlace);
function showPlaces(data) {
  const listItems = document.querySelector("ul.list");
  if (listItems) listItems.remove();

  const list = document.createElement("ul");
  list.classList.add("list");
  data.forEach((item, index) => {
    console.log(item.place);
    const place = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const placeTitle = document.createElement("span");
    deleteBtn.dataset.id = item.id;
    deleteBtn.onclick = deletePlace;

    placeTitle.textContent = item.place;
    deleteBtn.textContent = "delete";
    place.appendChild(placeTitle);
    place.appendChild(deleteBtn);

    list.appendChild(place);
  });
  listContainer.appendChild(list);
}

async function deletePlace(e) {
  const id = e.target.dataset.id;
  const response = await axios.delete(`${baseURL}${id}`);
  showPlaces(response.data);
}

async function addPlace(event) {
  event.preventDefault();
  // list.removeChild(list.childNodes[0]);
  let inputField = document.querySelector("input");
  const response = await axios.post(baseURL, { place: inputField.value });
  console.log(response.data);
  showPlaces(response.data);

  inputField.value = "";
}

document.querySelector("#randomize").addEventListener("click", doRandom);

function doRandom(event) {
  event.preventDefault();
  const spans = document.querySelectorAll("span");
  const span = spans[Math.floor(Math.random() * spans.length)];

  const winnerList = document.querySelector("#winner");
  const place = document.createElement("li");
  place.innerHTML = span.textContent;
  console.log(winnerList);
  winnerList.innerHTML = "";
  winnerList.appendChild(place);
}
