// write your code here
const menu = document.querySelector("#ramen-menu");

const displayRamenDetails = (ramen, image) => {
  console.log(image);
  const d = document.querySelector("#delete");
  if (d) {
    d.remove();
  }
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
  const btn = document.createElement("btn");
  btn.id = "delete";
  btn.innerText = "Delete";
  btn.addEventListener("click", () => {
    detailImg.src = "";
    detailImg.alt = "";
    detailName.innerText = "";
    detailRest.innerText = "";
    detailRating.innerText = "";
    detailComment.innerText = "";
    btn.remove();
    image.remove();
  });
  document.querySelector("#ramen-detail").append(document.createElement("br"));
  document.querySelector("#ramen-detail").append(btn);
};

const addRamen = (ramen) => {
  const image = document.createElement("img");
  image.src = ramen.image;
  image.alt = ramen.name;
  menu.append(image);
  image.addEventListener("click", () => {
    displayRamenDetails(ramen, image);
  });
};

fetch("http://localhost:3000/ramens")
  .then((r) => r.json())
  .then((data) => {
    data.forEach(addRamen);
    displayRamenDetails(data[0], menu.querySelector("img"));
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

document.querySelector("#edit-ramen").addEventListener("submit", (e) => {
  e.preventDefault();
  const detailRating = document.querySelector("#rating-display");
  const detailComment = document.querySelector("#comment-display");
  detailRating.innerText = e.target.rating.value;
  console.log(e.target["edit-comment"].value);
  detailComment.innerText = e.target["edit-comment"].value;
});
