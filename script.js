const accessContainer = document.getElementById("accessContainer");
const quizContainer = document.getElementById("quizContainer");
const codeForm = document.getElementById("codeForm");
const codeInput = document.getElementById("codeInput");
const codeMessage = document.getElementById("codeMessage");
const secretCode = "1234";

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
    answer: "11 AM"
  },
  {
    question: "Which one is a brunch classic?",
    options: ["Pizza", "Pancakes", "Sushi"],
    answer: "Pancakes"
  },
  {
    question: "Who is the prettiest girl in da world? 💕",
    options: ["Angelina Jolie", "YOU! 😍", "Taylor Swift"],
    answer: "YOU! 😍",
    spoiler: true
  },
  {
    question: "What drink pairs well with brunch?",
    options: ["Milkshake", "Mimosa", "Cola"],
    answer: "Mimosa"
  }
];

let current = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const messageEl = document.getElementById("message");
const spoilerEl = document.getElementById("spoiler");

function loadQuestion() {
    questionEl.textContent = quiz[current].question;
    optionsEl.innerHTML = "";
    messageEl.textContent = "";
    spoilerEl.innerHTML = "";
  
    if (quiz[current].spoiler) {
      showSpoiler();
    } else {
      quiz[current].options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
      });
    }
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
  messageEl.innerHTML = `Your brunch date is set for <strong>Sunday at 11:00 AM</strong>! 🌷<br/>Get ready for love, laughter, and waffles 🧇💖`;
}
