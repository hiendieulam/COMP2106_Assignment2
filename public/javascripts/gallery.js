

/* Variables
-------------------------------------------------- */
var slideIndex = 1;
var slides = document.getElementsByClassName("carousel-item");
// var dots = document.getElementsByClassName("demo");
var captionText = document.getElementById("caption");

showSlides(slideIndex);

/* Next/previous controls
-------------------------------------------------- */
function plusSlides(n) {
  // dots[slideIndex - 1].classList.remove("active");
  slides[slideIndex - 1].style.display = 'none';

  showSlides(slideIndex += n);
}

/* Thumbnail image controls
-------------------------------------------------- */
function currentSlide(n) {
  // dots[slideIndex-1].classList.remove("active");
  slides[slideIndex-1].style.display = 'none';

  showSlides(slideIndex = n);
}

/* Function
-------------------------------------------------- */
function showSlides(n) {
  if (n > slides.length) {slideIndex = 1;}
  if (n < 1) {slideIndex = slides.length;}
  slides[slideIndex-1].style.display = 'block';
  // dots[slideIndex-1].classList.add("active");
  // captionText.innerHTML = dots[slideIndex-1].alt;
}


/****  https://stackoverflow.com/questions/20007610/bootstrap-carousel-multiple-frames-at-once ****/
$('.carosel-control-right').click(function() {
  $(this).blur();
  $(this).parent().find('.carosel-item').first().insertAfter($(this).parent().find('.carosel-item').last());
});
$('.carosel-control-left').click(function() {
  $(this).blur();
  $(this).parent().find('.carosel-item').last().insertBefore($(this).parent().find('.carosel-item').first());
});