const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const loadLevelCategory = (id) =>{
  
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayCategoryPlants(data.plants))
}

const displayCategory = (cats) => {
  // 1.get the container
  const levelContainer = document.getElementById("Category-container");
  levelContainer.innerHTML = "";

  // //2. get into every lessons
  for (let cat of cats) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onClick="loadLevelCategory(${cat.id})" class="md:p-3 p-1 rounded md:text-xl text-start">
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
                <h2 class="card-title">
                ${cat.name}
                </h2>
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

loadCategory();
