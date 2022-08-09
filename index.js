//Import other modules
import PogObject from "PogData";

//Variables go here

const roomNames = ["Around Pillars", "Blocks", "Castle Wall", "Early 3-1", "Fence Squeeze", "Fences", "Fortress", "Four Towers", "Glass Neo", "Ice", "Ladder Slide", "Ladder Tower", "Overhead 4B", "Quartz Climb", "Quartz Temple", "Sandpit", "Scatter" ,"Slime Scatter", "Slime Skip", "Tightrope", "Tower Tightrope", "Triple Platform", "Triple Trapdoors", "Underbridge"];
const x = [0, -6, 13, 5, 0, 1, 0, -3, 0, -4, 9, 0, 5, 0, 0, -13, -7, -1, 0, 9, 13, 9, 14, -8];
const y = [9, 11, 11, 14, 5, 8, 10, 12, 5, 6, 3, 18, 8, 16, 8, 12, 10, 3, 4, 14, 7, 14, 9, 8];
const z = [12, 25, 26, 31, 26, 26, 19, 11, 14, 19, 25, 10, 11, 27, 11, 15, 22, 22, 19, 33, 17, 16, 15, 28];
var display = new Display();
var onOrOffDisplay = new Display();
var roomOne = "";
var roomTwo = "";
var roomThree = "";
var roomFour = "";
var roomFive = "";
var roomSix = "";
var roomSeven = "";
var roomEight = "";
var checkpointTotal = 0;
var complete = false;
var inParkour = false;
var enabled = true;
var hasUsedBoost = false;

//Permanent data
const data = new PogObject("ParkourHelper", {

	"glass_neo": [60, 60],
	"fences": [60, 60],
	"slimeskip": [60, 60],
	"quartz_temple": [60, 60],
	"fortress": [60, 60],
	"castle_wall": [60, 60],
	"around_the_pillars": [60, 60],
	"ice": [60, 60],
	"three_platforms": [60, 60],
	"triple_trapdoors": [60, 60],
	"scatter": [60, 60],
	"tower_tightrope": [60, 60],
	"fence_squeeze": [60, 60],
	"quartz_climb": [60, 60],
	"under_the_bridge": [60, 60],
	"blocks": [60, 60],
	"slime_scatter": [60, 60],
	"ladder_slide": [60, 60],
	"4_towers": [60, 60],
	"ladder_tower": [60, 60],
	"early_3+1": [60, 60],
	"overhead_4b": [60, 60],
	"tightrope": [60, 60],
	"sandpit": [60, 60],

}, "data.json")

//Updates display for whether the module is on and sends you a message telling you it was toggled
function displayWhetherOn(){
	if (enabled){
		onOrOffDisplay.setLine(0, "&bParkour Helper: &aEnabled");
		ChatLib.chat("&bParkour Helper: &aEnabled");
	} else {
		onOrOffDisplay.setLine(0, "&bParkour Helper: &cDisabled");
		ChatLib.chat("&bParkour Helper: &cDisabled");
	}
	onOrOffDisplay.setRenderLoc(10, 10)
}
//Sets up the display which tracks the name of each room
function setUpDisplay(){

	display.addLine("Room 1: ");
	display.addLine("Room 2: ");
	display.addLine("Room 3: ");
	display.addLine("Room 4: ");
	display.addLine("Room 5: ");
	display.addLine("Room 6: ");
	display.addLine("Room 7: ");
	display.addLine("Room 8: ");
	display.addLines(2);
	display.addLine(new DisplayLine("Your Boost PB: "));
	display.addLine("Your Boostless PB: ");
	//display.addLine("Current Checkpoint: ");
	display.setRenderLoc(10, 20);

}

//resets display
function resetDisplay() {

	display.setLine(0, "Room 1: ");
	display.setLine(1, "Room 2: ");
	display.setLine(2, "Room 3: ");
	display.setLine(3, "Room 4: ");
	display.setLine(4, "Room 5: ");
	display.setLine(5, "Room 6: ");
	display.setLine(6, "Room 7: ");
	display.setLine(7, "Room 8: ");
	//display.addLine("Current Checkpoint: ");

}

//Runs through all possible 24 rooms to find which room is the room being looked at
function IdentifyCurrentRoom(currentRoom){
	var correctRoom = "";
	var tempBlock = "";

	for(let i = 0; i < 24; i++){
		tempBlock = World.getBlockAt(18 + x[i], 72 + y[i], 13 + z[i] + ((currentRoom - 1) * 57));
		if(tempBlock?.type?.getID() == 147){
			correctRoom = roomNames[i];
			continue;
		} else {

		}
	}
	return correctRoom;
}

//tracks whether you are in a parkour duels game
register("tick", () => {
	if(!enabled) return;
	inParkour = Scoreboard.getLines().map(a => a.getName()).some(a => !!a.match(/Parkour/));
	if(inParkour){
		hasBoosted();
	}
})

//sets up the display from earlier, then hides it, then checks if you are in a parkour duel and reenables it if so
//this is also where the commands in main start technically, everything before and after this is either a function or a trigger
setUpDisplay();
display.hide();
onOrOffDisplay.addLine("");
displayWhetherOn();

//If you are in a parkour duels game, it enables the room display, otherwise its hidden
register("worldLoad", () => {
	if(!enabled) return;
	setTimeout(() => {
		if(inParkour == true){
			resetDisplay();
			display.show();
			FindFirst3();
		} else {
			display.hide();
		}
		}, 100);
})

//Toggle command for parkour helper
register("command", () => {
	enabled = !enabled;
	displayWhetherOn();
	if(enabled){
		setTimeout(() => {
		if(inParkour == true){
			resetDisplay();
			display.show();
			FindFirst3();
		} else {
			display.hide();
		}
		}, 100);
	}
}).setName("toggleparkourhelper");

//Checks if you have boosted
function hasBoosted() {
	var inventory = Player.getInventory();
	var ghastTearSlot = inventory.indexOf(370);

	if (ghastTearSlot !== -1) {
		hasUsedBoost = true;
	} else {
		hasUsedBoost = false;
	}
}

//this finds the first 3 rooms
function FindFirst3 (){

	setTimeout(() => {
		roomOne = IdentifyCurrentRoom(1);
		display.setLine(0, "Room 1: " + roomOne);
	}, 500);

	//finds second room
	setTimeout(() => {
		roomTwo = IdentifyCurrentRoom(2);
		display.setLine(1, "Room 2: " + roomTwo);
	}, 2000);

	//finds third room
	setTimeout(() => {
		roomThree = IdentifyCurrentRoom(3);
		display.setLine(2, "Room 3: " + roomThree);
	}, 3500);

}

//Finds 4th room
function Find4th(){

	setTimeout(() => {
		roomFour = IdentifyCurrentRoom(4);
		display.setLine(3, "Room 4: " + roomFour);
	}, 1000);
}
register("tick", () => {

	if(Player.getZ() > 70 && Player.getZ() < 76 && complete == false){
		Find4th();
		complete == true;
	} else {
		complete == true;
	}
});

//Finds 5th room
function Find5th(){

	setTimeout(() => {
		roomFive = IdentifyCurrentRoom(5);
		display.setLine(4, "Room 5: " + roomFive);
	}, 1000);
}
register("tick", () => {

	if(Player.getZ() > 126 && Player.getZ() < 130 && complete == false){
		Find5th();
		complete == true;
	} else {
		complete == true;
	}
});

//Finds 6th room
function Find6th(){

	setTimeout(() => {
		roomSix = IdentifyCurrentRoom(6);
		display.setLine(5, "Room 6: " + roomSix);
	}, 1000);
}
register("tick", () => {

	if(Player.getZ() > 183 && Player.getZ() < 190 && complete == false){
		Find6th();
		complete == true;
	} else {
		complete == true;
	}
});

//Finds 7th room
function Find7th(){

	setTimeout(() => {
		roomSeven = IdentifyCurrentRoom(7);
		display.setLine(6, "Room 7: " + roomSeven);
	}, 1000);
}
register("tick", () => {

	if(Player.getZ() > 240 && Player.getZ() < 245 && complete == false){
		Find7th();
		complete == true;
	} else {
		complete == true;
	}
});

//Finds 8th room
function Find8th(){

	setTimeout(() => {
		roomEight = IdentifyCurrentRoom(8);
		display.setLine(7, "Room 8: " + roomEight);
	}, 1000);
}
register("tick", () => {

	if(Player.getZ() > 297 && Player.getZ() < 300 && complete == false){
		Find8th();
		complete == true;
	} else {
		complete == true;
	}
});



/*register("messageSent", (message) => {

	if(message.contains("You")){
		checkpointTotal++;
		display.setLine(13, "Current checkpoint: " + checkpointTotal);
	}

})*/
/*function TwoOrThree(room){

	if(room == "Four Towers" || room == "Ice" || room == "Ladder Tower" || room == "Overhead 4B" || room == "Sandpit" || room == "Slime Scatter" || ){
		var checkpoints = 3;
	} else {
		var checkpoints = 2;
	}
/*

each room is 50 blocks long
each wall is 6 blocks thick
spawn coords are 18 73 3

*/