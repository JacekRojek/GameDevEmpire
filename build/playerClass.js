"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        key: "addExperience",
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
        key: "addReputation",
        value: function addReputation(amount) {
            this.reputation += amount;
            $('#profile').find('#reputation_span').html(this.reputation);
        }
    }, {
        key: "addSkillPoints",
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
        key: "newName",
        set: function set(newName) {
            this.name = newName;
        }
    }]);

    return Player;
}();

var player = new Player();
//End of Player Section
