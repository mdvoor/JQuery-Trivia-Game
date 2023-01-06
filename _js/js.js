  $(()=>{
//================================================
//GLOBAL VARIABLES FOR GAME
//================================================
var winCount=0;
var loseCount=0;
var timeCount=0;
var count=0;
var clock=null;
var wrongAnswers=[];
var userChose=[];
//================================================
//QUIZ Q&A OBJECT
//================================================
var quiz=[];//this array will be filled with Question objects
function Question(question,a,b,c,d,correctAnswer){//question constructor
    this.question=question;
    this.answers={
      a:a,
      b:b,
      c:c,
      d:d
      };
    this.correctAnswer=correctAnswer;
  }
quiz[0]=new Question("Unobtrusive JavaScript means to:","separate behavior from structure","create as little code as possible","include inline events","combine all source code into one file","separate behavior from structure");
quiz[1]=new Question("The jQuery file should always be placed where in your HTML file?",
"above the body tag","below all script files","before the main external script file","as an inline event","before the main external script file");
quiz[2]=new Question("The document ready handler can be written in which way?","jQuery(document).ready(function()...});","$(document).ready(function()...})","a and b","$();","a and b");
quiz[3]=new Question("Which selector selects an element with an id of 'special'?","$('.special')","$('special')","$(#special)","$('#special')","$('#special')");
quiz[4]=new Question("The All (or Universal) selector is represented by which character?","*","~",":","%","*");
quiz[5]=new Question("Which selector selects an element with a class of 'special'?","$('.special')","$('special')","$(.special)","$('#special')","$('.special')");
quiz[6]=new Question("Which selector selects a 'div' element?","$(div)","$('.div')","$('#div')","$('div')","$('div')");
quiz[7]=new Question("Which selector selects an input element with an attribute name that begins with an 'r'?",`$('input[name$="red"]')`,`$('input[name*="red"]')`,`$('input[name^="red"]')`,`$('input[name@="red"]')`,`$('input[name^="red"]')`);
quiz[8]=new Question("Which selector selects an audio element that ends with a specific value?",`$('audio[src$="red"]')`,`$('audio[src*="red"]')`,`$('audio[src^="red"]')`,`$('audio[src@="red"]')`,`$('audio[src$="red"]')`);
quiz[9]=new Question("Which selector selects a 'p' element that contains a value of 'important' anywhere in the attribute?",`$('p[class$="important"]')`,`$('p[class*="important"]')`,`$('p[class^="important"]')`,`$('p[class@="important"]')`,`$('p[class*="important"]')`);
quiz[10]=new Question("Which selector selects the last paragraph element in a group?","$('p:last')","$('.p:lastChild')","$('p:lastChildNode')","$(p:last)","$('p:last')");
quiz[11]=new Question("Which selector selects the first paragraph element in a group?","$(p:first)","$('.p:firstChild')","$('p:firstChildNode')","$('p:first')","$('p:first')");
quiz[12]=new Question( "Which function makes a hidden 'div' appear?",".show()",".appear()",".visible()",".val()",".show()");
quiz[13]=new Question("Which function deletes the element from the source code?",".delete()",".remove()",".hide()",".erase()",".remove()");
quiz[14]=new Question("Which function reads HTML or removes and replaces the HTML?",".edit()",".val()",".text()",".html()",".html()");
quiz[15]=new Question("Which function replaces the text within an HTML tag?",".replace()",".text()",".html()",".find()",".text()");
quiz[16]=new Question("Which function allows you to directly change the CSS properties of an element?",".css()",".style()",".design()",".changeTo()",".css()");
quiz[17]=new Question("Which function adds HTML as the last child element of the selected element?",".add()",".append()",".prepend()",".push()",".append()");
quiz[18]=new Question("Which function adds a specified class to an element?",".class()",".removeClass()",".switchClass ()",".addClass()",".addClass()");
quiz[19]=new Question("Script elements should always be placed on bottom for what reason?","to allow progressive rendering","to have greater download parallelization","to run your code before download is complete","both a and b","both a and b");
//================================================
//Function to Start Game
//================================================
 $('#btn_start').on('click',()=>{
   $('.header').hide();
   $('#btn_start').hide();
   $('.divContainer').css("height","800px");
   $('.box').css("height","500px");
   $('.time-p').show();
   $('.btn').show();
   populate(count,quiz);
 });//end of start click
//================================================
//  Function to populate questions
//  used for quiz & question review
//================================================
function populate(num,arr){
  clearInterval(clock);
  if(num>arr.length-1&&arr===quiz){//tests if there are questions in the quiz array
    showScore();
  }else if(num>arr.length-1&&arr===wrongAnswers){//tests if there are questions in wrongAnswers array
    $('.back-next').remove();
    showScore();
  }else if(num<=arr.length-1){//populates questions from given array
    $('.question').text(arr[num].question);
    $('#btn_1').text(arr[num].answers.a);
    $('#btn_2').text(arr[num].answers.b);
    $('#btn_3').text(arr[num].answers.c);
    $('#btn_4').text(arr[num].answers.d);
      if(arr===wrongAnswers){//conditionals for reviewed questions
        $('.timeOutNote').remove();
        if(userChose[num]==="Timed Out"){
            $('.question').append('<p class="timeOutNote">This question was timed out!</p>');
            }
        for(let i=1;i<=$('.btn').length;i++){//changes the color for right and wrong answers
            if($(`#btn_${i}`).text()===(wrongAnswers[num].correctAnswer)){
              $(`#btn_${i}`).css('color','#22f929');
            }if($(`#btn_${i}`).text()===(userChose[num])){
              $(`#btn_${i}`).css('color','red');
             }
        }
      }
          if(arr===quiz){//conditionals for quiz
             let ticks = 25;
             $('#timer').text(ticks);
             clock=setInterval(()=>{
               ticks--;
               $('#timer').text(ticks);
               if(ticks===0){
                   clearInterval(clock);
                   showMsg('OUT OF TIME!');
                   wrongAnswers.push(arr[num]);
                   userChose.push("Timed Out");
                   return;
                 }
               }, 1000);
          }
  }
}//end of populate
//================================================
// Function to calculate score, show user
// message, and populate next question
//================================================
  $('.btn').on('click',(e)=>{
    clearInterval(clock);
    var picked=event.target.innerHTML;
      if(picked===quiz[count].correctAnswer){
        winCount++;
        showMsg('CORRECT!');
      }else{
        loseCount++;
        showMsg('INCORRECT!');
        wrongAnswers.push(quiz[count]);
        userChose.push(picked);
      }
   });//end of btn click function
//================================================
//   Functions to diplay message after user has
//   selected an answer
//================================================
function showMsg(str){
    if(str==="OUT OF TIME!"){//keeps track of times out questions
      timeCount++;
    }
  hideDivs();
  $('.divContainer').css("height","670px");
  $('#message').show();
  $('#msgText').text(str);
}//end of showMsg function

$('#close').on('click',()=>{//closes message div
  clearInterval(clock);
  $('#message').hide();
  $('#msgText').text('');
  $('.divContainer').css("height","800px");
  $('.box').css("height","500px");
  $('.time-p').show();
  $('.question').show();
  $('.btn').show();
  count++;//count keeps track of question number
  populate(count,quiz);
});

function hideDivs(){
  $('.time-p').hide();
  $('.question').hide();
  $('.btn').hide();
  $('.box').css("height","350px");
}

//================================================
//FUNCTION TO SHOW THE SCORE SCREEN WHEN GAME IS
//OVER
//================================================
function showScore(){
  $('.header').show();
  hideDivs();
  $('.divContainer').css("height","750px");
  $('h1').append(`<p class="question">GAME OVER</p>
        <p id="correctS" class="score delete">Correct answers: </p>
        <p id="incorrectS" class="score red delete">Incorrect answers: </p>
        <p id="timeS" class="score yellow delete">Questions timed out: </p>
        <button id="play_again" class="delete">Play Again</button>`);
      if(timeCount!==0||loseCount!==0){
        $('h1').append(`<button id="missed_questions" class="delete">Review Missed Questions</button>`);
      }
  $('#correctS').append(winCount);
  $('#incorrectS').append(loseCount);
  $('#timeS').append(timeCount);
 //==============================================
//function to refresh the game and play again
//==============================================
        $('#play_again').on('click',function(){
          location.reload(true);
        });
//==============================================
//function to review missed questions when game
//is over
//==============================================
$('#missed_questions').on('click',()=>{
     $('.btn').off('click');//removes event handler from btns
     count=0;
     $('.header').hide();
     $('.question').css('margin-top','20px').show();
     $('.btn').text('').show().on('mouseover',()=>{
        $('.btn').css({
          'transform':'scale(1)',
        });
     });
     $('.divContainer').css("height","800px");
     $('.box').css("height","500px");
     $('.delete').remove();
     $('#btn_4').after('<button class="back-next" id="back">Back</button><button class="back-next" id="next">Next</button>');
     populate(count,wrongAnswers);

     $('#back').on('click',()=>{//navigates question review
         if(count>0){
           $('.btn').css('color','#228ef9')
             count--;
             populate(count,wrongAnswers);
         }else{
           $('.back-next').remove();
           showScore();
         }
     });

     $('#next').on('click',()=>{//navigates question review
         $('.btn').css('color','#228ef9')
         count++;
         populate(count,wrongAnswers);
     });
  });//end of missed_questions()
}//end of showScore()
});//end of document.ready function

