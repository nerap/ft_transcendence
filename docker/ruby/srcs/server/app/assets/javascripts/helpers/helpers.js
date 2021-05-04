function getAnagram(userId) {
    guildId = Transcendence.users.get(userId).toJSON().guild
    if (guildId) {
        return Transcendence.guilds.get(guildId).toJSON().anagram;
    }
    return null;
}

function flashMessage(type, str) {
    var flash = `<div class="${type}">` +
        `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
        `${str}` +
        `</div>`
    $("#flash-message").append(flash);
    setTimeout(function () {
        $(`.${type}`).slideUp(500);
    }, 3000);
} // type: notice, error or deleted; str: message to print