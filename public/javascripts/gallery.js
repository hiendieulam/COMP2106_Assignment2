/* Assignment 2 | COMP1073 Client-Side JavaScript */

/* Variables 
-------------------------------------------------- */
var slideIndex = 1;
var slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("demo");
var captionText = document.getElementById("caption");

showSlides(slideIndex);

/* Next/previous controls
-------------------------------------------------- */
function plusSlides(n) {
  dots[slideIndex - 1].classList.remove("active");
  slides[slideIndex - 1].styles.display = 'none';

  showSlides(slideIndex += n);
}

/* Thumbnail image controls
-------------------------------------------------- */
function currentSlide(n) {
  dots[slideIndex - 1].classList.remove("active");
  slides[slideIndex - 1].styles.display = 'none';
  
  showSlides(slideIndex = n);
}

/* Function
-------------------------------------------------- */
function showSlides(n) {
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  slides[slideIndex-1].styles.display = "block";
  dots[slideIndex-1].classList.add("active");
  captionText.innerHTML = dots[slideIndex-1].alt;
}


