//Player section
class Player {

    constructor(name) {
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

    addExperience(exp) {
        let bar = $("#experience_bar");
        let maxValue = bar.attr('aria-valuemax');
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
        let width = this.experience / maxValue * 100;
        bar.css('width', width + '%').attr('aria-valuenow', this.experience);
    };

    addReputation(amount) {
        this.reputation += amount;
        $('#profile').find('#reputation_span').html(this.reputation);
    }

    addSkillPoints(amount, type) {
        let bar = $("#" + type);
        let maxValueForSkill = 100;
        let unlocked = false;
        switch (type) {
            case "coding":
                this.coding += amount;

                if (this.coding >= maxValueForSkill) {
                    this.coding -= maxValueForSkill;
                    this.addExperience(15);

                }

                let width = this.coding / maxValueForSkill * 100;

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
                let width2 = this.art / maxValueForSkill * 100;
                bar.css('width', width2 + '%').attr('aria-valuenow', this.art);
                break;

            case "music":
                this.music += amount;
                if (this.music >= maxValueForSkill) {
                    this.music -= maxValueForSkill;
                    this.addExperience(15);
                }
                let width3 = this.music / maxValueForSkill * 100;
                bar.css('width', width3 + '%').attr('aria-valuenow', this.music);
                break;

            case "design":
                this.design += amount;
                if (this.design >= maxValueForSkill) {
                    this.design -= maxValueForSkill;
                    this.addExperience(15);
                }
                let width4 = this.design / maxValueForSkill * 100;
                bar.css('width', width4 + '%').attr('aria-valuenow', this.design);
                break;
            default:

                break;
        }
    };

    set newName(newName) {
        this.name = newName;
    }
}

let player = new Player();
//End of Player Section
