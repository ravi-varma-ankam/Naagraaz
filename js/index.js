// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/nagini.mp3');
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 9, y: 9}
];

food = {x: 6, y: 7};



// Ask the user to select a difficulty level using a prompt
alert("Hi🙌 this is NaagRaaz😃,\nGet Ready to experience the epic NaagRaaz.\nTo start game press any key");
alert("INSTRUCTIONS\nNaagRaaz - Snake Game\nYou can also select difficulty level.\nPress arrow key buttons in your keyboard to change the directions.\n");
const userInput = prompt("Select a difficulty level with numbers:\n1. Easy😒\n2. Medium😅\n3. Hard😳");

// Check the user's input and set the difficulty level accordingly
var difficultyLevel;

switch (userInput) {
    case "1":
        difficultyLevel = "Easy";
        speed = 8;
        break;
    case "2":
        difficultyLevel = "Medium";
        speed = 10;
        break;
    case "3":
        difficultyLevel = "Hard";
        speed = 14;
        break;
    default:
        // Handle invalid input or cancel button
        alert("Invalid input or canceled. Defaulting to Medium difficulty.");
        difficultyLevel = "Medium";
        speed = 10;
        break;
}

// Now, you can use the 'difficultyLevel' variable in your game logic
// console.log("Selected difficulty level: " + difficultyLevel);



// --------------Game Functions-------------
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you hit into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    musicSound.play();
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over.😢 Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        speed = 8;
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();

        //-----------------Increase the Score and Hiscore------------
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        
        //----------------------Add the food to the body---------------------
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        
        //---------------Creating food at random location------------------------
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}

        //--------------Increase the speed------------
        speed = speed + (speed * 0.01);
    }

    //------------------------Moving the snake---------------------------------
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
        // snakeArr[i+1] = snakeArr[i];
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //----------------Part 2: Display the snake and Food---------------------
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //-----------------------Display the food----------------------------
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}


// ---------------------------Main logic ------------------------------
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
// --------------------------Start the game-----------------------------

    inputDir = {x: 0, y: 1} 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});