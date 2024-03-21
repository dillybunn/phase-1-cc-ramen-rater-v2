const handleClick = (ramen) => {
  // Add code
  const ramenDetail = document.querySelector("#ramen-detail");
  const ratingDisplay = document.querySelector("#rating-display");
  const commentDisplay = document.querySelector("#comment-display");

  ramenDetail.querySelector(".detail-image").src = ramen.image;
  ramenDetail.querySelector(".name").textContent = ramen.name;
  ramenDetail.querySelector(".restaurant").textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};
const createRamenImage = (ramen) => {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  console.log(img);
  return img;
};

const attachClickListener = (img, ramen) => {
  img.addEventListener("click", () => {
    handleClick(ramen);
  });
};

const addSubmitListener = () => {
  const ramenForm = document.querySelector("#new-ramen");
  if (ramenForm) {
    ramenForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newRamen = {
        name: ramenForm.elements["name"].value,
        restaurant: ramenForm.elements["restaurant"].value,
        image: ramenForm.elements["image"].value,
        rating: ramenForm.elements["rating"].value,
        comment: ramenForm.elements["new-comment"].value,
      };

      const img = createRamenImage(newRamen);
      const ramenMenu = document.querySelector("#ramen-menu");
      ramenMenu.appendChild(img);

      attachClickListener(img, newRamen);
      ramenForm.reset();
    });
  } else {
    console.error("Form not found");
  }
};

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((r) => r.json())
    .then((ramens) => {
      const ramenMenu = document.querySelector("#ramen-menu");
      console.log(ramenMenu);
      ramens.forEach((ramen) => {
        const img = createRamenImage(ramen);
        ramenMenu.appendChild(img);
        attachClickListener(img, ramen);
      });
    })

    .catch((error) => console.error("issue loading content:", error));
  // Add code
};

const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    displayRamens();
    addSubmitListener();
  });
  // Invoke displayRamens here
  // Invoke addSubmitListener here
};

main();

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
