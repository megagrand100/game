let questions = [];
let current = {};

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  });

function loadQuestion() {
  current = questions[Math.floor(Math.random() * questions.length)];

  document.getElementById("question").innerText = current.q;

  let optionsHTML = "";
  current.o.forEach(opt => {
    optionsHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button><br>`;
  });

  document.getElementById("options").innerHTML = optionsHTML;
  document.getElementById("result").innerText = "";
}

function checkAnswer(selected) {
  if(selected === current.a){
    document.getElementById("result").innerText = "✅ Correct!";
  } else {
    document.getElementById("result").innerText = "❌ Wrong! Answer: " + current.a;
  }
}
