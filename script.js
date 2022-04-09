let data = [];
let score, questionIndex
const totalQuestions = 10;
 
const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const questionContainer = document.getElementById('container')
const summaryContainer = document.getElementById('summary')
const startAgainBtn = document.getElementById('statr-again-btn')

startBtn.addEventListener('click', () => startGame())
nextBtn.addEventListener('click', () => moveNextQuestion())
startAgainBtn.addEventListener('click', () => startGame())

window.onload = async () => 
{
	//summary container
	summaryContainer.classList.add('hide')
	
	// questions container
	questionContainer.classList.add('hide')
	
	// next button
	nextBtn.classList.add('hide')
	
	// start again button
	startAgainBtn.classList.add('hide')
	
	const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple');
	data = await response.json();
}

function startGame()
{	
	startBtn.classList.add('hide')
	startAgainBtn.classList.add('hide')
	summaryContainer.classList.add('hide')	
	nextBtn.classList.remove('hide')
	questionContainer.classList.remove('hide')	
	
	questionIndex = 0
	score = 0
	showData();
}

function showData()
{	 
	showQuestion();
	showAnswers();
}

function showQuestion()
{
	document.getElementById('question').innerHTML = data.results[questionIndex].question;
}
	
function showAnswers()
{
	// get all incorrect answers
	let options = [... data.results[questionIndex].incorrect_answers];
	// add a correct answer
	options.splice(0,0,data.results[questionIndex].correct_answer);
	// Shuffle all options
	shuffle(options);
	// show options in the UI
	options.forEach((option, index) =>  document.getElementsByClassName('btn')[index].innerHTML = option);
}

function checkAnswer(selectedBtn)
{
	if (selectedBtn.innerHTML == data.results[questionIndex].correct_answer)
	{
		//alert("Correct! YOU ARE SO SMART")
		updateScore()
		setStatusClass(selectedBtn, 'correct')
	}
	else
	{
		setStatusClass(selectedBtn, 'wrong')
	}
	
	let buttons = [... document.getElementsByClassName('btn')]
	buttons.forEach((btn) => btn.disabled = true)
}	

function moveNextQuestion()
{
	let buttons = [... document.getElementsByClassName('btn')]
	buttons.forEach((btn) => btn.disabled = false)
	
	let corrects = [... document.getElementsByClassName('correct')]
	corrects.forEach((correct) => correct.classList.remove('correct'))
	
	let wrongs = [... document.getElementsByClassName('wrong')]
	wrongs.forEach((wrong) => wrong.classList.remove('wrong'))
	
	questionIndex ++;
	if (questionIndex < totalQuestions)
		showData()
	else
		finishGame()
}

function setStatusClass(element, correct)
{
	if (correct == 'correct')
		element.classList.add('correct')
	else
		element.classList.add('wrong')
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0)
 {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function updateScore()
{
	score += 10
	document.getElementById('score').innerHTML = score
}

function finishGame()
{
	questionContainer.classList.add('hide')
	nextBtn.classList.add('hide')
	summaryContainer.classList.remove('hide')
	startAgainBtn.classList.remove('hide')
	
	document.getElementById('score').innerHTML = score
}