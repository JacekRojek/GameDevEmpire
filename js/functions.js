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

//achievements
let achievements_popUp = $('#achievements-popUp');
let achievements_panel = $('#achievements');

let achievements = new Map([
[
    'GitHub', 'github'
],
[
    'Linux', 'linux'
],
[
    '200$', 'money'
],
[
    'Clicker', 'bolt'
],
['PhotoShop', 'photo']
]);

function unlockAchievement(name) {
//Display Popup

let iconCode = achievements.get(name);
achievements_popUp.find('h2').html(name);
let icon = $('<i />', {
    "class": "fa fa-" + iconCode
});
console.log(icon);
achievements_popUp.prepend(icon);
achievements_popUp.show();
//TODO Add achievement to the list

}
