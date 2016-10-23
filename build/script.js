'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {

    //hiding buttons on the list
    $('#buttons ul.options').hide();

    //Hide buttons again on second click
    $('.selector').click(function () {
        $(this).parent().find('.options').slideToggle();
    });

    //Clicking on the task button
    $('.options .btn-outline-info').click(function () {
        var thisButton = $(this);

        //check if it has a price
        var price = thisButton.data("price");
        if (price) {
            if (price > player.money) {
                thisButton.parent().find('p').show().delay(3000).fadeOut();
                return;
            } else {
                player.money -= price;
                $('#profile').find('#money_span').html(player.money);
            }
        }

        var options = $(this).closest('.options');
        var buttonParent = options.parent().find('.selector');
        buttonParent.prop('disabled', true);
        options.slideToggle();
        var type = thisButton.data("type");
        var exp = thisButton.data("experience");

        //Temp counting clicks
        player.clickCounter++;
        if (player.clickCounter == 10) {
            unlockAchievementUsingClass('Clicker');
        }

        //waiting animation callback function
        var afterTimePasses = function temp() {
            player.addExperience(exp);
            player.addSkillPoints(exp, type);

            if (thisButton.data("reputation") > 0) {
                player.addReputation(thisButton.data("reputation"));
            }

            var income = thisButton.data("income");
            if (income) {
                player.money += income;
                if (player.money > 200) {
                    unlockAchievementUsingClass('$200');
                }
                $('#profile').find('#money_span').html(player.money);
            }
        };

        timer(buttonParent.find('div'), $(this).data("time"), afterTimePasses);
    });

    //Display Tooltip on button hover
    $('.options .btn-outline-info').hover(function () {

        $(this).parent().find('span').css("visibility", "visible");
    }, function () {

        $(this).parent().find('span').css("visibility", "hidden");
    });
    //Get Player Name
    $('#welcome').submit(function (event) {

        event.preventDefault();
        player.name = $("#name").val() || "Player";
        $('#profile').find('#playerName').html(player.name);
        $('#welcome').hide("slow");
    });

    //Hide Achievement popUp
    $('#achievements-popUp').submit(function (event) {
        event.preventDefault();
        $('#achievements-popUp').hide("slow");
        var icon = achievements_popUp.find('i');
        achievements_panel.append(icon);
    });

    //Buy item in the shop
    $('#shop').find('i').click(function () {
        var icon = $(this);
        var price = icon.data("price");
        if (price) {
            if (price > player.money) {
                icon.find('a').tooltip("show");
                return;
            }
            player.money -= price;
            $('#profile').find('#money_span').html(player.money);
            icon.hide("slow");
        };
    });
    $('#shop').find('i').mouseleave(function () {
        $(this).find('a').tooltip("hide");
    });
    //End of document selector
});

//button timer
function timer($div, time, result) {
    $div.show().width("100%");
    $div.animate({
        width: 0
    }, time * 1000, function () {
        $div.parent().prop('disabled', false);
        $div.hide();
        result();
    });
}

//--------------------------------------------------------------------------------------------------------------

//Player section

var Player = function () {
    function Player(name) {
        _classCallCheck(this, Player);

        this.name = name || "Player";
        this.experience = 0;
        this.level = 0;
        this.money = 100;
        this.reputation = 0;

        //skills
        this.coding = 0;
        this.art = 0;
        this.music = 0;
        this.design = 0;

        this.clickCounter = 0;
    }

    _createClass(Player, [{
        key: 'addExperience',
        value: function addExperience(exp) {
            var bar = $("#experience_bar");
            var maxValue = bar.attr('aria-valuemax');
            this.experience += exp;
            if (this.experience >= 100 + this.level * 10 + this.level * this.level * 5) {
                this.experience -= 100 + this.level * 10 + this.level * this.level * 5;
                this.level++;
                $('#level_span').html(this.level);
                //TODO levelUP animation
                maxValue = 100 + this.level * 10 + this.level * this.level * 5;
                bar.attr('aria-valuemax', maxValue);
                if (this.level == 2) {
                    unlockAchievementUsingClass('GitHub');
                } else if (this.level == 3) {
                    unlockAchievementUsingClass('Linux');
                }
            }
            var width = this.experience / maxValue * 100;
            bar.css('width', width + '%').attr('aria-valuenow', this.experience);
        }
    }, {
        key: 'addReputation',
        value: function addReputation(amount) {
            this.reputation += amount;
            $('#profile').find('#reputation_span').html(this.reputation);
        }
    }, {
        key: 'addSkillPoints',
        value: function addSkillPoints(amount, type) {
            var bar = $("#" + type);
            var maxValueForSkill = 100;
            var unlocked = false;
            switch (type) {
                case "coding":
                    this.coding += amount;

                    if (this.coding >= maxValueForSkill) {
                        this.coding -= maxValueForSkill;
                        this.addExperience(15);
                    }

                    var width = this.coding / maxValueForSkill * 100;

                    bar.css('width', width + '%').attr('aria-valuenow', this.coding);
                    break;

                case "art":
                    this.art += amount;
                    if (this.art >= maxValueForSkill) {
                        this.art -= maxValueForSkill;
                        this.addExperience(15);
                        if (!unlocked) {
                            unlockAchievementUsingClass('Photoshop');
                            unlocked = true;
                        }
                    }
                    var width2 = this.art / maxValueForSkill * 100;
                    bar.css('width', width2 + '%').attr('aria-valuenow', this.art);
                    break;

                case "music":
                    this.music += amount;
                    if (this.music >= maxValueForSkill) {
                        this.music -= maxValueForSkill;
                        this.addExperience(15);
                    }
                    var width3 = this.music / maxValueForSkill * 100;
                    bar.css('width', width3 + '%').attr('aria-valuenow', this.music);
                    break;

                case "design":
                    this.design += amount;
                    if (this.design >= maxValueForSkill) {
                        this.design -= maxValueForSkill;
                        this.addExperience(15);
                    }
                    var width4 = this.design / maxValueForSkill * 100;
                    bar.css('width', width4 + '%').attr('aria-valuenow', this.design);
                    break;
                default:

                    break;
            }
        }
    }, {
        key: 'newName',
        set: function set(newName) {
            this.name = newName;
        }
    }]);

    return Player;
}();

var player = new Player();
//End of Player Section

//--------------------------------------------------------------------------------------------------------------

//Achievement Section

var Achievement = function () {
    function Achievement(name, icon, description, reward) {
        _classCallCheck(this, Achievement);

        this._name = name;
        this._icon = icon;
        this._description = description;
        this._reward = reward;
    }

    _createClass(Achievement, [{
        key: 'reward',
        value: function reward() {
            this._reward();
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        }
    }, {
        key: 'icon',
        get: function get() {
            return this._icon;
        }
    }, {
        key: 'description',
        get: function get() {
            return this._description;
        }
    }, {
        key: 'reward',
        get: function get() {
            return this._reward;
        }
    }]);

    return Achievement;
}();

var achievementsFromFunction = createDatabaseMap();
function createDatabaseMap() {
    var achievements = new Map();
    achievements.set('GitHub', new Achievement("GitHub", "github", "You've discovered source control software. Repotation incrises", function () {
        return player.addReputation(57);
    }));
    achievements.set('Linux', new Achievement("Linux", "linux", "You've discovered new operating system. Repotation incrises", function () {
        return player.addReputation(17);
    }));
    achievements.set('200$', new Achievement("First Money", "money", "You've saved some money. Repotation incrises ", function () {
        return player.addReputation(107);
    }));
    achievements.set('Clicker', new Achievement("Clicker", "bolt", "You are in the flow. Repotation incrises ", function () {
        return player.addReputation(107);
    }));
    achievements.set('Photoshop', new Achievement("Photoshop", "photo", "You've started earning money. Repotation incrises ", function () {
        return player.addReputation(107);
    }));
    return achievements;
}

var achievements_popUp = $('#achievements-popUp');
var achievements_panel = $('#achievements');

function unlockAchievementUsingClass(name) {
    var achievementObject = achievementsFromFunction.get(name);
    achievements_popUp.find('h2').html(achievementObject.name);
    achievements_popUp.find('p').html(achievementObject.description);
    var icon = $('<i />', {
        "class": "fa fa-" + achievementObject.icon
    });
    console.log(icon);
    achievements_popUp.prepend(icon);
    achievements_popUp.show();
    achievementObject.reward();
}
//End of Achievement Section


//--------------------------------------------------------------------------------------------------------------
//# sourceMappingURL=script.js.map
