const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const filterButtons = document.querySelectorAll(".filter-btn");

let currentIndex = 0;

let visibleItems = Array.from(galleryItems);


/* Open Lightbox */

galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        currentIndex = visibleItems.indexOf(item);

        showImage();

        lightbox.classList.add("active");

    });

});


/* Show Image */

function showImage() {

    if (visibleItems.length === 0) return;

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;

}


/* Next Button */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    showImage();

});


/* Previous Button */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    showImage();

});


/* Close Lightbox */

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


/* Close by clicking background */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }

});


/* Keyboard Navigation */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (event.key === "Escape") {
        closeBtn.click();
    }

});


/* Category Filters */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        visibleItems = [];

        galleryItems.forEach((item) => {

            if (
                filter === "all" ||
                item.dataset.category === filter
            ) {

                item.style.display = "block";

                visibleItems.push(item);

            } else {

                item.style.display = "none";

            }

        });

    });

});