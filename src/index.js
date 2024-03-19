// index.js
const imageDiv = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const form = document.querySelector("#new-ramen");
const ramenArray = [];

// Callbacks
const handleClick = (event) => {
  const id = event.target.id-1;
  const item = ramenArray[id];

  const detailImage = ramenDetail.querySelector(".detail-image");
  detailImage.src = item.image;

  const detailName = ramenDetail.querySelector(".name");
  detailName.textContent = item.name;

  const detailRestaurant = ramenDetail.querySelector(".restaurant");
  detailRestaurant.textContent = item.restaurant;

  const detailRating = document.querySelector("#rating-display");
  detailRating.textContent = item.rating;

  const detailComment = document.querySelector("#comment-display");
  detailComment.textContent = item.comment;
};

const addSubmitListener = (event) => {
  event.preventDefault();
  ramenArray.push({
    image: form.querySelector("#new-image").value,
    name: form.querySelector("#new-name").value,
    restaurant: form.querySelector("#new-restaurant").value,
    rating: form.querySelector("#new-rating").value,
    comment: form.querySelector("#new-comment").value,
  })
  const img = document.createElement("img");
  img.src = ramenArray[ramenArray.length-1].image;
  img.id = ramenArray.length;
  imageDiv.append(img);
console.log(ramenArray[ramenArray.length-1].name);
}

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
  .then(response => response.json())
  .then(ramens => {
    ramens.forEach(element => {
      ramenArray.push({
        image: element.image,
        name: element.name,
        restaurant: element.restaurant,
        rating: element.rating,
        comment: element.comment,
      })
      const img = document.createElement("img");
      img.src = element.image;
      img.id = element.id;
      imageDiv.append(img);
    });
  })
  .catch(error => console.log(error))
};

const main = () => {
  displayRamens();
  imageDiv.addEventListener("click",handleClick);
  form.addEventListener("submit",addSubmitListener);
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
