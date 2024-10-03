document.addEventListener("DOMContentLoaded", function() {
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);
    const starContainer = document.getElementById("starRating");
    const ratingFeedback = document.getElementById("ratingFeedback");
    let currentRating = 0;
  
    stars.forEach((star) => {
      const starElement = document.createElement("span");
      starElement.classList.add("star", "text-gray-300");
      starElement.innerHTML = "&#9733;"; // Unicode star symbol
  
      // Handle mouse enter, leave, and click for star rating
      starElement.addEventListener("mouseenter", () => highlightStars(star));
      starElement.addEventListener("mouseleave", () => highlightStars(currentRating));
      starElement.addEventListener("click", () => {
        currentRating = star;
        highlightStars(currentRating);
        updateFeedback(currentRating);
      });
  
      starContainer.appendChild(starElement);
    });
  
    function highlightStars(rating) {
      Array.from(starContainer.children).forEach((starElement, index) => {
        if (index < rating) {
          starElement.classList.add("fill-yellow-400");
          starElement.classList.remove("text-gray-300");
        } else {
          starElement.classList.add("text-gray-300");
          starElement.classList.remove("fill-yellow-400");
        }
      });
    }
  
    function updateFeedback(rating) {
      let feedbackText = "";
      let emoji = "";
      if (rating === 1) {
        feedbackText = "Poor";
        emoji = "&#128577;"; // Frown emoji
      } else if (rating === 2) {
        feedbackText = "Fair";
        emoji = "&#128533;"; // Meh emoji
      } else if (rating === 3) {
        feedbackText = "Good";
        emoji = "&#128578;"; // Smile emoji
      } else if (rating === 4) {
        feedbackText = "Very Good";
        emoji = "&#128516;"; // Big smile emoji
      } else if (rating === 5) {
        feedbackText = "Excellent";
        emoji = "&#128515;"; // Grinning face emoji
      }
  
      ratingFeedback.innerHTML = `${emoji} ${feedbackText}`;
    }
  
    // Handle form submission
    document.getElementById("reviewForm").addEventListener("submit", function(event) {
      event.preventDefault();
  
      const review = document.getElementById("review").value;
      const recommend = document.querySelector('input[name="recommend"]:checked').value;
  
      if (!currentRating || !review.trim()) {
        alert("Please provide both a rating and a review.");
        return;
      }
  
      console.log({
        rating: currentRating,
        review: review,
        recommend: recommend,
      });
  
      alert("Thank you for your review!");
  
      // Reset the form
      document.getElementById("reviewForm").reset();
      currentRating = 0;
      highlightStars(0);
      ratingFeedback.innerHTML = "";
    });
  });
  