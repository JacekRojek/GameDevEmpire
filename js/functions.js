//button timer
function timer($div, time, result) {
    $div.show().width("100%");
    $div.animate({
        width: 0
    }, time * 1000, function() {
        $div.parent().prop('disabled', false);
        $div.hide();
        result();
    });
}




//Achievement Section
class Achievement {
  constructor(name, icon, description, reward) {
  		this._name = name;
  		this._icon = icon;
  		this._description = description;
      this._reward = reward;
  	}
    get name() { return this._name; }
  	get icon() { return this._icon; }
  	get description() { return this._description; }
	  get reward() { return this._reward; }

    reward(){
      this._reward();
    }

}

let achievementsFromFunction = createDatabaseMap();
function createDatabaseMap(){
  let achievements = new Map();
  achievements.set('GitHub', new Achievement("GitHub","github","You've discovered source control software. Repotation incrises",function(){ return player.addReputation(57)} ));
  achievements.set('Linux', new Achievement("Linux","linux","You've discovered new operating system. Repotation incrises",function(){ return player.addReputation(17)} ));
  achievements.set('200$', new Achievement("First Money","money","You've saved some money. Repotation incrises ",function(){ return player.addReputation(107)} ));
  achievements.set('Clicker', new Achievement("Clicker","bolt","You are in the flow. Repotation incrises ",function(){ return player.addReputation(107)} ));
  achievements.set('Photoshop', new Achievement("Photoshop","photo","You've started earning money. Repotation incrises ",function(){ return player.addReputation(107)} ));
  return achievements;
}

let achievements_popUp = $('#achievements-popUp');
let achievements_panel = $('#achievements');

function unlockAchievementUsingClass(name){
  let achievementObject = achievementsFromFunction.get(name);
  achievements_popUp.find('h2').html(achievementObject.name);
  achievements_popUp.find('p').html(achievementObject.description);
  let icon = $('<i />', {
      "class": "fa fa-" + achievementObject.icon
  });
  console.log(icon);
  achievements_popUp.prepend(icon);
  achievements_popUp.show();
  achievementObject.reward();
}
//End of Achievement Section


//--------------------------------------------------------------------------------------------------------------
