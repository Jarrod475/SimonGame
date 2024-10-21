var isGameStart = false;http://127.0.0.1:3000/index.html

var buttonQ = [];
var currentQuePos = 0;
// the counter that keeps track of the levels
// i have no clue why this only works with const...
const levelCounter = {counter : 0};

//so when this is called, it increments our level counter by 1
Object.defineProperty(levelCounter,"inc",
{
    get : function () 
    {
        this.counter++;
        $("h1").html("level :" + this.counter);
    }
});

//this resets the game.
Object.defineProperty(levelCounter, "reset", 
{
    get : function () 
    {
        this.counter = 0;
        $("h1").html("GAME OVER!");
    }
});

//when player presses any keyboard button
$("body").keypress(function(event){
    if (isGameStart){
        return;
    }else
    {
        console.log("game begins");
        isGameStart = true
        levelCounter.inc;
        addNumber();
    }
  
});

$(".btn").click(function(event){
    if (!isGameStart){
        return;
    }
    switch($(this).attr("class")){
        case "btn red": 
            console.log("red"); 
            playSound("red");
            checkQ(2);
            break;
        case "btn yellow": 
            console.log("yellow"); 
            playSound("yellow");
            checkQ(3);
            break;
        case "btn blue": 
            console.log("blue"); 
            playSound("blue");
            checkQ(4);
        break;
        case "btn green": 
            console.log("green"); 
            playSound("green");
            checkQ(1);
        break;
    }

    addPress(this);
});

function playSound(color){
    var audio;
    switch(color){
        case "red" : 
            audio = new Audio('./sounds/red.mp3');
            break;
        case "blue" : 
            audio = new Audio('./sounds/blue.mp3');
            break;
        case "yellow" : 
            audio = new Audio('./sounds/yellow.mp3');
            break;
        case "green" :
            audio = new Audio('./sounds/green.mp3');
            break;
    }
    audio.play();

}


// these 2 add and removes the "pressed" class that give it a little grey bg and a flash to let the
// user know they pressed this bad boy.
function addPress(obj)
{
    $(obj).addClass("pressed");
    setTimeout(removePress,100,obj);
   
}

function removePress(obj)
{
    $(obj).removeClass("pressed");
}


//button queue stuff 

function addNumber()
{
    var newnum = Math.floor(Math.random() * 4) + 1;
    buttonQ.push(newnum);

    switch(newnum)
    {
        case 1: 
            playSound("green");
            addPress($(".green"));
            break;
        case 2: 
            playSound("red");
            addPress($(".red"));
            break;
        case 3: 
            playSound("yellow");
            addPress($(".yellow"));
            break;
        case 4:
            playSound("blue");
            addPress($(".blue")); 
            break;
    }
}

//this checks if the latest button press is equal 
//to the current button in the button queue array
function checkQ(buttonID)
{
    if(!isGameStart){
        return;
    }

    if (buttonQ[currentQuePos] === buttonID)
        {
            if (currentQuePos >= buttonQ.length - 1)
            {
                    currentQuePos = 0;
                    setTimeout(addNumber,300);
                    levelCounter.inc;
            }else
            {
                currentQuePos++;
            }
        }
        else
        {
            flashBackground();
            levelCounter.reset;
            currentQuePos = 0;
            buttonQ = [];
            var sound = new Audio("./sounds/wrong.mp3");
            sound.play();
            setTimeout(addNumber,1500);
        }
        
}

function flashBackground()
{
    $("body").addClass("game-over");
    setTimeout(revertFlash,100);
}

function revertFlash()
{
    $("body").removeClass("game-over");
}