//state object
var state = {
  questionPage: {
    question : "",
    choices : "",
    queNumber: 1,
    correctAns: 0,
    wrongAns: 0,
    questionIndex: 0
  },
  checked: false,
  answerValue: false
}
//state modification functions
var addQuestion = function(state,requiredQuestion, requiredChoices) {
  state.questionPage.question = requiredQuestion;
  state.questionPage.choices = requiredChoices;
}

var choiceCheck = function() {
  state.checked = true;
}

var answerCheckTrue = function() {
  state.answerValue = true;
}

var answerCheckFalse = function() {
  state.answerValue = false;
}

var incrementCorrectAnsCount = function() {
  state.questionPage.correctAns += 1;
}

var incrementWrongAnsCount = function() {
  state.questionPage.wrongAns += 1;
}

var incrementQueNumberCount = function() {
  state.questionPage.queNumber += 1;
}

var incrementQuestionIndexCount = function() {
  state.questionPage.questionIndex += 1;
}
//render functions
var renderQuestion = function(state) {
  var index = state.questionIndex;
  var questionRender = "<div class=\"question_page\">" +  
        "<h2 class=\"q_header\">Cat quiz</h2>" +
        "<div class=\"q_box\">" +
          "<span class=\"js-q_number\">" + state.questionPage.queNumber + "</span>" + 
          "<span>/9: </span>" + 
          "<span class=\"js-q_text\">" + state.questionPage.question + "</span>" +
        "</div>" +
        "<div class=\"stats_box\">" +
          "<span>correct: </span><span class=\"js-correct_num\">" + state.questionPage.correctAns + "</span>" + 
          "<span> | wrong: </span><span class=\"js-wrong_num\">" + state.questionPage.wrongAns +  "</span>" +
        "</div>" +
        "<div class=\"choices_box\">" + state.questionPage.choices +
        "</div>" +
        "<div class=\"nav_box\">" +
          `<button ${state.checked ? "" : "disabled" } class=\"choice_submit_button\">Submit Answer</button>` +
        "</div>" +
      "</div>"
  $(".js-container").html(questionRender);
}

var renderFeedback = function() {
  var result = "";
  if (state.answerValue) {
    result = "<div class=\"feedback_page_correct\">" +  
        "<h2 class=\"correct_ans\">Correct!</h2>" +
        "<p class=\"feedback_text\">Turns out you do know a lot about your cat!</p>" +
        "<button class=\"next_question\">Next</button>" + 
        "</div>";
  }
  else if (state.answerValue === false) {
    result = "<div class=\"feedback_page_wrong\">" +  
        "<h2 class=\"wrong_ans\">Wrong!</h2>" +
        "<p class=\"feedback_text\">Really?! you didn't know that? how could you face your cat after that?</p>" +
        "<button class=\"next_question\">Next</button>" + 
        "</div>"
  }
  $(".js-container").html(result);
}

var renderCheck = function() {
  var changeButton = `<button ${state.checked ? "" : "disabled" } class=\"choice_submit_button\">Submit Answer</button>`
  $(".nav_box").html(changeButton)
}


//event listeners
function handleStartQuiz(){
  $(".start_quiz").click(function(event){
    var index = state.questionPage.questionIndex;
    questionsArray(index);
    renderQuestion(state)
  })
}

function handleNext(){
  $(".js-container").on("click", ".next_question", function(event) {
    var index = state.questionPage.questionIndex;
    questionsArray(index);
    renderQuestion(state)
  })
}

function handleSubmitAnswer() {
  $(".js-container").on("click", ".choice_submit_button", function(event) {
    renderFeedback();
    if (state.answerValue) {
      incrementCorrectAnsCount();
    }
    else if (state.answerValue === false) {
      incrementWrongAnsCount();
    }
    incrementQueNumberCount();
    incrementQuestionIndexCount()
  })
} 

function handleChoiceCheck() {
  $(".js-container").on( "click", "input[type=radio]" , function(event) {
    var elementID = $(this).attr('id');
    if (elementID === "correct") {
      answerCheckTrue();
    }
    else if (elementID === "wrong") {
      answerCheckFalse();
    }
    choiceCheck();
    renderCheck()
  })
}

var questionsArray = function (index) {
  var questionText = ["For how high can cats jump?", "How fast can cats run?"];
  var questionChoices = [//first Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> twice it's height<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> five times it's height<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> the same as it's height<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> seven times it's height<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> ten times it's height" +
              "</form>",
                        //second Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 30mph<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> 34mph<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 2mph<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 50mph<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 10mph" +
              "</form>"]
  var requiredQuestion = questionText[index];
  var requiredChoices = questionChoices[index];
  addQuestion(state, requiredQuestion, requiredChoices);            
}

/*"<form>" +
              "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"num1\"> twice it's height<br>" +
             " <span>2: </span><input type=\"radio\" name=\"choice\" id=\"num2\"> five times it's height<br>" +
              "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"num3\"> the same as it's height<br>" +
             " <span>4: </span><input type=\"radio\" name=\"choice\" id=\"num4\"> seven times it's height<br>" +
             " <span>5: </span><input type=\"radio\" name=\"choice\" id=\"num5\"> ten times it's height" +
  "</form>"
  */


  $(function() {
    handleStartQuiz();
    handleChoiceCheck();
    handleSubmitAnswer();
    handleNext()
  })