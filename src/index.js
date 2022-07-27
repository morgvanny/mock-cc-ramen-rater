// write your code here
const menu = document.querySelector("#ramen-menu");

const addRamen = (ramen) => {
  const image = document.createElement("img");
  image.src = ramen.image;
  image.alt = ramen.name;
  menu.append(image);
  image.addEventListener("click", (e) => {
    const detailImg = document.querySelector(".detail-image");
    const detailName = document.querySelector(".name");
    const detailRest = document.querySelector(".restaurant");
    const detailRating = document.querySelector("#rating-display");
    const detailComment = document.querySelector("#comment-display");
    detailImg.src = ramen.image;
    detailImg.alt = ramen.name;
    detailName.innerText = ramen.name;
    detailRest.innerText = ramen.restaurant;
    detailRating.innerText = ramen.rating;
    detailComment.innerText = ramen.comment;
  });
};

fetch("http://localhost:3000/ramens")
  .then((r) => r.json())
  .then((data) => {
    data.forEach(addRamen);
  });

document.querySelector("#new-ramen").addEventListener("submit", (e) => {
  e.preventDefault();
  const ramen = {
    name: e.target.name.value,
    image: e.target.image.value,
    restaurant: e.target.restaurant.value,
    rating: document.querySelector("#new-rating").value,
    comment: e.target["new-comment"].value,
  };

  addRamen(ramen);

  e.target.reset();
});
