//state object
var state = {
  catName: "",
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
var setCatName = function(catname) {
  state.catName = catname;
  state.catName = state.catName.charAt(0).toUpperCase() + state.catName.slice(1);
}
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
var renderCatName = function() {
  var render = "<div class=\"cats_name__page\">" +
         "<form class=\"catForm\">" + 
          "<h1 class=\"cat_name__header\">What's your cat name?</h1>" +
         " <input type=\"text\" name=\"catname\" id= \"catname_input\" placeholder= \"Please enter the name\" >" +
         " <button class=\"start_quiz\" >Start quiz</button>" +
         "<br><span class=\"hidden cat_name_prompt\">Enter a name..</span>" + 
          "<p>**Don't worry, we won't be using it for commercial purposes, lol.</p>" +
         "</form>" +
        "</div>"
  $(".js-container").html(render);
}

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
  var correctRandom =  ["Correct!", "That's right!", "Yeppi!"][Math.floor(Math.random()*3)]
  var wrongRandom =  ["Wrong!", "That's incorrect!", "Ugh!"][Math.floor(Math.random()*3)]
  if (state.answerValue) {
    result = "<div class=\"feedback_page_correct\">" +  
        "<h2 class=\"correct_ans\">" + correctRandom + "</h2>" +
        "<button class=\"next_question\">Next</button>" + 
        "</div>";
  }
  else if (state.answerValue === false) {
    result = "<div class=\"feedback_page_wrong\">" +  
        "<h2 class=\"wrong_ans\">"+ wrongRandom + "</h2>" +
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
function handleOfc(){
  $(".ofc_submit").click(function(event){
    event.preventDefault();
    renderCatName();
  })
}

function handleStartQuiz(){
  $(".js-container").on("click", ".start_quiz", function(event){ 
    event.preventDefault();
    var catNameStore = $("input[type=text]").val();
    if (catNameStore === "") {
      $(".cat_name_prompt:hidden").fadeIn();
    }
    else {
      var index = state.questionPage.questionIndex;
      setCatName(catNameStore);
      questionsArray(index);
      renderQuestion(state)
    }
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

//other functions
var questionsArray = function (index) {
  var questionText = ["For how high can cats jump?",
                      "What was the punishment for the smuggling and exportation of cats in ancient Egypt?",
                      "For how long does the female cat carries her kittens before giving birth to them?",
                      "If a cat fell down from a five storie building, how much it's survival rate?",
                      "Humans greet each other using hands, how does cats greet each other?",
                      "How many toes does cats have on each paw?",
                      "What does a group of kittens called?",
                      "Who invented the cats \"flap\" door?",
                      "Why does cats meow?"];
  var questionChoices = [//first Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> twice it's height<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> twenty times it's height<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> the same as it's height<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> seven times it's height<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> ten times it's height" +
              "</form>",
                        //second Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> Jail<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> Death<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> Alive Mummication<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> Cutting Fingers<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> Nothing, they didn't care about them anyway" +
              "</form>",
                      //third Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 28 days<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> 2 months<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 3 months<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 20 days<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 6 months" +
              "</form>",
                      //fourth Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 20%<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 50%<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> 90%<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 100%<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> 0% There's no way that it can survive such incedent" +
              "</form>",
                      //fifth Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> By rubbing there noses<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> By meowing <br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> By running in circles<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> By shaking hands<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> I don't know" +
              "</form>",
                      //sixth Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> two on the back, three on the front paws<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> ten on the back, ten on the front paws<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> five on the back, eleven on the front paws<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> too many on the back, a lot on the front paws<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> four on the back, five on the front paws" +
              "</form>",
                      //seventh Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> kittens(it's not kittens, don't choose this)<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> kindle<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> fire<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> hot<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> hottens" +
              "</form>",
                      //eigth Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> a guy frustrated by his cat cuz she keeps opening the door and leave it opened<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> Donald trump<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> I did!<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"correct\">Issac Newton<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> some inventor that i don't the know the name of" +
              "</form>",
                      //ninth Q
              "<form>" +
                "<span>1: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> To call for other cats<br>" +
                "<span>2: </span><input type=\"radio\" name=\"choice\" id=\"correct\"> To call for humans<br>" +
                "<span>3: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> To annoy you<br>" +
                "<span>4: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> To express happiness<br>" +
                "<span>5: </span><input type=\"radio\" name=\"choice\" id=\"wrong\"> To practice its vocal cords for next weeks Purr's got talent" +
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
  "<p class=\"feedback_text\">Turns out you do know a lot about " +  state.catName + "..<br>eventhough, " +  state.catName + " will still be ignoring you</p>" +
  "<p class=\"feedback_text\">Really?! you didn't know that? how could you face " + state.catName + " after that?</p>" 
  */


$(function() {
    handleOfc();
    handleStartQuiz();
    handleChoiceCheck();
    handleSubmitAnswer();
    handleNext()
  })