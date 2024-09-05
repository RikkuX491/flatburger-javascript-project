const restaurantMenu = document.getElementById('restaurant-menu')

function addFoodImageToRestaurantMenu(food){
    const imgElement = document.createElement('img')
    imgElement.src = food.image
    imgElement.addEventListener('mouseover', () => {
        displayFoodDetails(food)
    })
    imgElement.addEventListener('click', handleClick)
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

function handleClick(event){
    event.target.remove()
}

function handleSubmit(event){
    event.preventDefault()

    const newNameInputElement = document.getElementById('new-name')
    const newImageInputElement = document.getElementById('new-image')
    const newDescriptionInputElement = document.getElementById('new-description')

    const newFood = {
        name: newNameInputElement.value,
        image: newImageInputElement.value,
        description: newDescriptionInputElement.value
    }

    addFoodImageToRestaurantMenu(newFood)

    event.target.reset()
}

fetch('https://raw.githubusercontent.com/RikkuX491/flatburger-javascript-project/main/db.json')
.then(response => response.json())
.then(apiData => {
    const foods = apiData.foods
    foods.forEach(addFoodImageToRestaurantMenu)
    displayFoodDetails(foods[0])
})

const newFoodForm = document.getElementById('new-food')
newFoodForm.addEventListener('submit', handleSubmit)