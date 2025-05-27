const accessContainer = document.getElementById("accessContainer");
const quizContainer = document.getElementById("quizContainer");
const codeForm = document.getElementById("codeForm");
const codeInput = document.getElementById("codeInput");
const codeMessage = document.getElementById("codeMessage");
const secretCode = "1911";

codeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (codeInput.value === secretCode) {
    accessContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
  } else {
    codeMessage.textContent = "Incorrect code! Try again 💭";
    setTimeout(() => codeMessage.textContent = "", 2000);
  }
});

const quiz = [
    {
      question: "What time is brunch best enjoyed?",
      options: ["8 AM", "11 AM", "2 PM"],
      answer: "11 AM",
      image: "3.PNG",
      title: "Hey gorgeous!<br/>💖 Ready for a Sweet Surprise?"
    },
    {
      question: "What is the first place we've been 2gether?",
      options: ["McDonalds", "Rocket", "SamoPivo"],
      answer: "SamoPivo",
      image: "1.PNG",
      title: "What a night it was, ha 🌠"
    },
    {
        question: "Who is the prettiest girl in da world? 💕",
        answer: "YOU! 😍",
        spoiler: true,
        image: "1",
        title: "The last, but not least"
    },    
    {
      question: "How many times we've travelled?",
      options: ["1", "2", "3"],
      answer: "2",
      image: "2.PNG",
      title: "And hundreeds are coming🗺"
    }
  
  ];  

let current = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const messageEl = document.getElementById("message");
const spoilerEl = document.getElementById("spoiler");
const titleMessage = document.getElementById("title");

function loadQuestion() {
    const currentQuiz = quiz[current];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = "";
    messageEl.textContent = "";
    spoilerEl.innerHTML = "";
    titleMessage.innerHTML = currentQuiz.title;
  
    const img = document.querySelector(".photo");
    if (img && currentQuiz.image) {
      img.src = currentQuiz.image;
    }
  
    animateElements([questionEl, optionsEl, img]);
  
    if (currentQuiz.spoiler) {
      showSpoiler();
    } else {
      currentQuiz.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
      });
    }
  }
  
  function animateElements(elements) {
    elements.forEach(el => {
      if (!el) return;
      el.classList.remove("animated");
      void el.offsetWidth; // Trigger reflow
      el.classList.add("animated");
    });
  }  

function checkAnswer(selected) {
  if (selected === quiz[current].answer) {
    if (quiz[current].spoiler) {
      showSpoiler(() => {
        current++;
        loadQuestion();
      });
    } else {
      current++;
      if (current < quiz.length) {
        loadQuestion();
      } else {
        showSurprise();
      }
    }
  } else {
    messageEl.textContent = "Oops! Try again 💡";
    setTimeout(() => messageEl.textContent = "", 1500);
  }
}

function showSpoiler() {
    spoilerEl.innerHTML = `
      <button onclick="toggleSpoiler()">Click for a surprise... 👀</button>
      <div class='spoiler-content' id='spoiler-content'>
        <video autoplay playsinline muted width='100%' style='margin-top:10px; border-radius:12px;' id='frontCam'></video>
        <div id='spoilerButtons' style='margin-top: 15px; display: none;'>
          <button onclick='handleSpoilerAnswer(true)'>Correct? ✅</button>
          <button onclick='handleSpoilerAnswer(false)'>Incorrect? ❌</button>
        </div>
      </div>`;
  
    const spoilerContent = document.getElementById('spoiler-content');
    const video = document.getElementById('frontCam');
    const buttons = document.getElementById('spoilerButtons');
  
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } }).then(stream => {
      video.srcObject = stream;
    }).catch(() => {
      spoilerContent.innerHTML = "<p>Camera access denied 😢</p>";
    });
  
    window.toggleSpoiler = function () {
      const isVisible = spoilerContent.style.display === 'block';
      spoilerContent.style.display = isVisible ? 'none' : 'block';
      if (!isVisible) {
        buttons.style.display = 'block';
      }
    }
  
    window.handleSpoilerAnswer = function (isCorrect) {
      if (isCorrect) {
        current++;
        loadQuestion();
      } else {
        messageEl.textContent = "Oops! Try again 💡";
        setTimeout(() => {
          messageEl.textContent = "";
          loadQuestion();
        }, 1500);
      }
    }
  }

function showSurprise() {
  questionEl.textContent = "🎉 You did it!";
  optionsEl.innerHTML = "";
  messageEl.innerHTML = `Your brunch date is set for <strong>8th of June, Sunday at 11:00 AM</strong>! 🌷<br/>Get ready for love and laughter 🧇💖`;
}
