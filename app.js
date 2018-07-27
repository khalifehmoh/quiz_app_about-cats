//state object
var state = {
  questionPage: {
    question : "",
    choices : "",
    queNumber: 1,
    correctAns: 0,
    wrongAns: 0
  },
  questionIndex: 0
}
//state modification functions
var addQuestion = function(state,requiredQuestion, requiredChoices) {
  state.questionPage.question = requiredQuestion;
  state.questionPage.choices = requiredChoices;
}
//render functions
var renderQuestion = function(state, ) {
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
          "<button class=\"choice_submit_button\">Submit Answer</button>" +
        "</div>" +
      "</div>"
  $(".js-container").html(questionRender)
}
//event listeners
function handleStartQuiz(){
  $(".start_quiz").click(function(event){
    var index = state.questionIndex;
    questionsArray(index);
    renderQuestion(state)
  })
}

var questionsArray = function (index) {
  var questionText = ["For how high can cats jump?", "How fast can cats run?"];
  var questionChoices = [//first Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"num1\"> twice it's height<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"num2\"> five times it's height<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"num3\"> the same as it's height<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"num4\"> seven times it's height<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"num5\"> ten times it's height" +
              "</form>",
                        //second Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"num1\"> 30mph<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"num2\"> 32mph" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"num3\"> 2mph" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"num4\"> 50mph" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"num5\"> 10mph" +
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
    handleStartQuiz()
  })