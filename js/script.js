document.getElementById("english").addEventListener("click", function () {
  alert("Language switched to English!");
});

document.getElementById("turkish").addEventListener("click", function () {
  alert("Dil Türkçeye değiştirildi!");
});

let ratings = JSON.parse(localStorage.getItem("ratings")) || [];
let comments = JSON.parse(localStorage.getItem("comments")) || [];

let totalRating = 0;
let ratingCount = 0;
let selectedRating = 0;
let rated = false;


function updateComments() {
  const commentList = document.getElementById("commentList");
  commentList.innerHTML = "";
  comments.forEach(comment => {
      const newComment = document.createElement("div");
      newComment.className = "comment-item";
      newComment.innerHTML = `
          <strong>${comment.name}</strong><br>
          <p>${comment.text}</p>
          <div class="stars">${'★'.repeat(comment.rating)}${'☆'.repeat(5 - comment.rating)}</div>
      `;
      commentList.appendChild(newComment);
  });
}


function highlightStars(rating) {
  document.querySelectorAll("#userStars .star").forEach(star => {
      star.classList.remove("selected");
      if (parseInt(star.getAttribute("data-value")) <= rating) {
          star.classList.add("selected");
      }
  });
}


function rate(star) {
  if (!rated) {
      selectedRating = parseInt(star.getAttribute("data-value"));
      highlightStars(selectedRating);
      ratings.push(selectedRating);
      localStorage.setItem("ratings", JSON.stringify(ratings));
      updateRating();
  }
}


function updateRating() {
  if (ratings.length > 0) {
      let average = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      document.getElementById("averageRating").textContent = average.toFixed(1);
  }
}


function addComment() {
  const nameInput = document.getElementById("nameInput");
  const commentInput = document.getElementById("commentInput");

  if (nameInput.value.trim() === "" || commentInput.value.trim() === "" || selectedRating === 0 || rated) {
      alert("Lütfen tüm alanları doldurun ve bir puan seçin.");
      return;
  }

  const newComment = {
      name: nameInput.value,
      text: commentInput.value,
      rating: selectedRating
  };

  
  comments.push(newComment);
  localStorage.setItem("comments", JSON.stringify(comments));

 
  updateComments();

  
  totalRating += selectedRating;
  ratingCount++;
  document.getElementById("averageRating").innerText = (totalRating / ratingCount).toFixed(1);

  
  nameInput.value = "";
  commentInput.value = "";
  selectedRating = 0;
  rated = true;
}


document.addEventListener("DOMContentLoaded", function () {
  updateComments();
  updateRating();
});


document.addEventListener("DOMContentLoaded", function () {
  let video = document.getElementById("storyVideo");
  let playPauseBtn = document.getElementById("playPauseBtn");

  playPauseBtn.addEventListener("click", function () {
      if (video.paused) {
          video.play();
          playPauseBtn.textContent = "Pause";
      } else {
          video.pause();
          playPauseBtn.textContent = "Play";
      }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const spans = document.querySelectorAll("span");

  spans.forEach(span => {
      const text = span.textContent.toLowerCase();

      if (text.includes("exotic") || text.includes("egzotik")) {
          span.classList.add("exotic");
      } else if (text.includes("mythic") || text.includes("eşsiz")) {
          span.classList.add("mythic");
      }
  });
});


const params = new URLSearchParams(window.location.search);
const sectionID = params.get('open');

if (sectionID) {
  const section = document.getElementById(sectionID);
  if (section) {
      section.style.display = 'block';
      section.scrollIntoView({ behavior: 'smooth' });
  }
}


document.querySelectorAll('.Chapter1Season1').forEach(el => {
  const text = el.innerHTML;
  const updatedText = text
      .replace(/\(vaulted\)/gi, '<span style="color:red">(vaulted)</span>')
      .replace(/\(mahzene kaldırıldı\)/gi, '<span style="color:red">(mahzene kaldırıldı)</span>');
  el.innerHTML = updatedText;
});


document.querySelectorAll("#userStars .star").forEach(star => {
  star.addEventListener("click", function () {
      if (!rated) {
          selectedRating = parseInt(star.getAttribute("data-value"));
          highlightStars(selectedRating);
      }
  });
});
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const openId = params.get('open');
  if (openId) {
    const section = document.getElementById(openId);
    if (section) {
      section.style.display = 'block';
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const sectionToShow = urlParams.get("open");
  if (sectionToShow) {
    const section = document.getElementById(sectionToShow);
    if (section) {
      section.style.display = "block";
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
};