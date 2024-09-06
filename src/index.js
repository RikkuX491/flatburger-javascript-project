let foods

const restaurantMenu = document.getElementById('restaurant-menu')
const foodsFilterElement = document.getElementById('foods-filter')
foodsFilterElement.addEventListener('change', handleChange)

function addFoodImageToRestaurantMenu(food){
    const imgElement = document.createElement('img')
    imgElement.src = food.image
    imgElement.addEventListener('click', () => {
        displayFoodDetails(food)
    })
    restaurantMenu.appendChild(imgElement)
}

function displayFoodDetails(food){
    const foodDetailImageElement = document.querySelector('.detail-image')
    foodDetailImageElement.src = food.image

    const foodNameElement = document.querySelector('.name')
    foodNameElement.textContent = food.name

    const foodDescriptionDisplayElement = document.getElementById('description-display')
    foodDescriptionDisplayElement.textContent = food.description
}

function handleSubmit(event){
    event.preventDefault()

    const newNameInputElement = document.getElementById('new-name')
    const newImageInputElement = document.getElementById('new-image')
    const newDescriptionInputElement = document.getElementById('new-description')
    const healthySelectElement = document.getElementById('healthy-select')

    const newFood = {
        name: newNameInputElement.value,
        image: newImageInputElement.value,
        description: newDescriptionInputElement.value,
        isHealthy: healthySelectElement.value === "healthy" ? true : false
    }

    addFoodImageToRestaurantMenu(newFood)
    foods.push(newFood)

    event.target.reset()
}

function handleChange(event){
    restaurantMenu.innerHTML = ""

    if(event.target.value === "all"){
        foods.forEach(addFoodImageToRestaurantMenu)
    }
    else if(event.target.value === "healthy"){
        foods.forEach(food => {
            if(food.isHealthy){
                addFoodImageToRestaurantMenu(food)
            }
        })
    }
}

fetch('https://raw.githubusercontent.com/RikkuX491/flatburger-javascript-project/main/db.json')
.then(response => response.json())
.then(apiData => {
    foods = apiData.foods
    foods.forEach(addFoodImageToRestaurantMenu)
    displayFoodDetails(foods[0])
})

const newFoodForm = document.getElementById('new-food')
newFoodForm.addEventListener('submit', handleSubmit)