$(function() {

    //hiding buttons on the list
    $('#buttons ul.options').hide();

    //Hide buttons again on second click
    $('.selector').click(function() {
        $(this).parent().find('.options').slideToggle();
    });

    //Clicking on the task button
    $('.options .btn-outline-info').click(function() {
        let thisButton = $(this);

        //check if it has a price
        let price = thisButton.data("price");
        if (price) {
            if (price > player.money) {
                thisButton.parent().find('p').show().delay(3000).fadeOut();
                return;
            } else {
                player.money -= price;
                $('#profile').find('#money_span').html(player.money);
            }
        }

        let options = $(this).closest('.options');
        let buttonParent = options.parent().find('.selector');
        buttonParent.prop('disabled', true);
        options.slideToggle();
        let type = thisButton.data("type");
        let exp = thisButton.data("experience");

        //Temp counting clicks
        player.clickCounter++;
        if (player.clickCounter == 10) {
            unlockAchievementUsingClass('Clicker');
        }

        //waiting animation callback function
        let afterTimePasses = function temp() {
            player.addExperience(exp);
            player.addSkillPoints(exp, type);

            if (thisButton.data("reputation") > 0) {
                player.addReputation(thisButton.data("reputation"));
            }

            let income = thisButton.data("income");
            if (income) {
                player.money += income;
                if(player.money > 200) {unlockAchievementUsingClass('$200');}
                $('#profile').find('#money_span').html(player.money);
            }
        };

        timer(buttonParent.find('div'), $(this).data("time"), afterTimePasses);

    });

    //Display Tooltip on button hover
    $('.options .btn-outline-info').hover(function() {

        $(this).parent().find('span').css("visibility", "visible");
    }, function() {

        $(this).parent().find('span').css("visibility", "hidden");
    });
    //Get Player Name
    $('#welcome').submit(function(event) {

        event.preventDefault();
        player.name = $("#name").val() || "Player";
        $('#profile').find('#playerName').html(player.name);
        $('#welcome').hide("slow");
    });

    //Hide Achievement popUp
    $('#achievements-popUp').submit(function(event) {
        event.preventDefault();
        $('#achievements-popUp').hide("slow");
        let icon = achievements_popUp.find('i');
        achievements_panel.append(icon);
    });

    //Buy item in the shop
    $('#shop').find('i').click(function() {
        let icon = $(this);
        let price = icon.data("price");
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
    $('#shop').find('i').mouseleave(function() {
        $(this).find('a').tooltip("hide");
    });
    //End of document selector
});
