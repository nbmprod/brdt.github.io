const accessContainer = document.getElementById("accessContainer");
    const quizContainer = document.getElementById("quizContainer");
    const codeForm = document.getElementById("codeForm");
    const codeInput = document.getElementById("codeInput");
    const codeMessage = document.getElementById("codeMessage");
    const secretCode = "1234"; // Set your secret 4-digit code here

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
        question: "What drink pairs well with brunch?",
        options: ["Milkshake", "Mimosa", "Cola"],
        answer: "Mimosa"
      }
    ];

    let current = 0;
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const messageEl = document.getElementById("message");

    function loadQuestion() {
      questionEl.textContent = quiz[current].question;
      optionsEl.innerHTML = "";
      quiz[current].options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option);
        optionsEl.appendChild(btn);
      });
    }

    function checkAnswer(selected) {
      if (selected === quiz[current].answer) {
        current++;
        if (current < quiz.length) {
          loadQuestion();
        } else {
          showSurprise();
        }
      } else {
        messageEl.textContent = "Oops! Try again 💡";
        setTimeout(() => messageEl.textContent = "", 1500);
      }
    }

    function showSurprise() {
      questionEl.textContent = "🎉 You did it!";
      optionsEl.innerHTML = "";
      messageEl.innerHTML = `Your brunch date is set for <strong>Sunday at 11:00 AM</strong>! 🌷<br/>Get ready for love, laughter, and waffles 🧇💖`;
    }