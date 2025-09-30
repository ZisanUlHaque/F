let cart = [];
let totalPrice = 0;

function addToCart(plant) {
  cart.push(plant);
  totalPrice += parseFloat(plant.price);
  displayCart();
}

function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartContainer.innerHTML = "";

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("flex", "justify-between", "items-center", "bg-green-50", "p-2", "rounded-lg", "shadow-sm");

    div.innerHTML = `
      <span class="font-medium text-sm">${item.name}</span>
      <span class="font-semibold text-sm">${item.price} Tk</span>
    `;
    cartContainer.appendChild(div);
  });

  cartTotal.innerText = totalPrice.toFixed(2);
}




const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const loadLevelCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryPlants(data.plants));
};

const loadPlantDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  const res = await fetch(url);
  const details = await res.json();
  displayPlantsDetails(details.plants);
};

const loadAllPlants = () => {
  document.getElementById("plant-section-title").innerText = "All Trees";
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // শুধু প্রথম ৬টা প্ল্যান্ট নাও
      const firstSix = data.plants.slice(0, 6);
      displayPlantShows(firstSix);
    });
};

const displayCategory = (cats) => {
  // 1.get the container
  const levelContainer = document.getElementById("Category-container");
  levelContainer.innerHTML = "";

  // //2. get into every lessons
  for (let cat of cats) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onClick="loadLevelCategory(${cat.id})" class="md:p-1 rounded md:text-xl text-start">
        ${cat.category_name}
        </button>
        `;
    levelContainer.append(btnDiv);
  }
};

const displayCategoryPlants = (cats) => {
  const levelContainer = document.getElementById("Plant-Container");
  levelContainer.innerHTML = "";

  for (let cat of cats) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <div class="card bg-base-100 w-75 shadow-sm">
            <figure>
                <img
                src="${cat.image}"
                alt="Shoes" class="p-5 rounded-4xl w-full h-60 object-cover"
                />
            </figure>
            <div class="card-body">
                <button onclick="loadPlantDetails(${cat.id})" class="card-title">
                ${cat.name}
                </button>
                <p class="text-justify line-clamp-2">
                ${cat.description}
                </p>
                <div class="card-actions justify-between">
                <div class="badge font-semibold text-[#15803D] bg-[#DCFCE7]">${cat.category}</div>
                <div class="badge font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${cat.price}</div>
                </div>
                <button class="btn text-white bg-[#15803D] mt-4 rounded-3xl">
                Add to Cart
                </button>
            </div>
            </div>
        `;
    levelContainer.append(btnDiv);
  }
};

const displayPlantsDetails = (plantsDetails) => {
  const levelContainer = document.getElementById("details-container");
  levelContainer.innerHTML = `
              <div class="card bg-base-100 w-90 shadow-sm">
            <figure>
                <img
                src="${plantsDetails.image}"
                alt="Shoes" class="p-5 rounded-4xl w-full h-60 object-cover"
                />
            </figure>
            <div class="card-body">
                <button class="card-title">
                ${plantsDetails.name}
                </button>
                <p class="text-justify">
                ${plantsDetails.description}
                </p>
                <div class="card-actions justify-between">
                <div class="badge font-semibold text-[#15803D] bg-[#DCFCE7]">${plantsDetails.category}</div>
                <div class="badge font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plantsDetails.price}</div>
                </div>
                <button class="btn text-white bg-[#15803D] mt-4 rounded-3xl">
                Add to Cart
                </button>
                    <div class="modal-action">
                    <form  method="dialog">
                    <button class="btn flex-1 justify-center">Close</button>
                  </form>
                    </div>
            </div>
            </div>`;
  document.getElementById("my_modal_5").showModal();
};

const displayPlantShows = (plants) => {
  const levelContainer = document.getElementById("Plant-Container");
  levelContainer.innerHTML = "";

  plants.forEach((plant) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <div class="card bg-base-100 w-75 shadow-sm">
        <figure>
          <img src="${plant.image}" alt="${plant.name}" class="p-5 rounded-4xl w-full h-60 object-cover" />
        </figure>
        <div class="card-body">
          <button onclick="loadPlantDetails(${plant.id})" class="card-title">${plant.name}</button>
          <p class="text-justify line-clamp-2">${plant.description}</p>
          <div class="card-actions justify-between">
            <div class="badge font-semibold text-[#15803D] bg-[#DCFCE7]">${plant.category}</div>
            <div class="badge font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</div>
          </div>
          <button onclick='addToCart(${JSON.stringify(plant)})' class="btn text-white bg-[#15803D] mt-4 rounded-3xl">Add to Cart</button>
        </div>
      </div>
    `;
    levelContainer.append(btnDiv);
  });
};

document.getElementById("plant-section-title").addEventListener("click", () => {
  loadAllPlants();
});

loadAllPlants();

loadCategory();
