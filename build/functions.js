'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
