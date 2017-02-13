// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dots = 240;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};
var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};
var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};
var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde];

function checkEdible(ghost) {
  if (ghost.edible === true) {
    return 'edible';
  } else {
    return 'inedible';
  }
}


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  //setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  //}, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '  ||  Lives: ' + lives + '  ||  Power Pellets: ' + powerPellets + '  ||  Dots: ' + dots);
}

function printGhostsInMenu() {
  ghosts.forEach(function(ghost) {
    console.log('\(' + ghost.menu_option + '\) Eat ' + ghost.name + ' \(' + checkEdible(ghost) + '\)');
  });
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (dots >= 100) {
    console.log('(a) Eat 100 dots');
  }
  if (dots >= 10) {
    console.log('(s) Eat 10 dots');
  }
  if (dots > 0) {
    console.log('(d) Eat 1 dot');
  }
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  printGhostsInMenu();
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

function outOfLives(lives) {
  if (lives === 0) {
    drawScreen();
    console.log('\nYou are out of lives!');
    process.exit();
  }
}


// Menu Options
function eatDot(numDots) {
  if (dots < numDots) {
    console.log('\nNot enough dots!');
  } else {
    console.log('\nChomp!');
    score += (10 * numDots);
    dots -= numDots;
  }
}

function eatPowerPellet() {
  if (powerPellets > 0) {
    score += 50;
    ghosts.forEach(function(ghost) {
      ghost.edible = true;
    });
    powerPellets--;
  } else {
    console.log('\nNo Power-Pellets left!');
  }
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives--;
    outOfLives(lives);
    console.log('\n' + ghost.name + ' \(the ' + ghost.colour + ' one\) killed Pac-Man!');
  } else {
    console.log('\nMmm! ' + ghost.character + ', delicious ' + ghost.name + '!');
    score += 200;
    ghost.edible = false;
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case 'a':
      eatDot(100);
      break;
    case 's':
      eatDot(10);
      break;
    case 'd':
      eatDot(1);
      break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 700); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
