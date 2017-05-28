$(document).ready(() => {
    let numOptions = 2;
    $("#add").click((e) => {
        $("#options").append(`<input class="form-control" type="text" name="option-${numOptions}" placeholder="option${numOptions + 1}" id=${numOptions} required="true"></input>`);
        numOptions++;
        e.preventDefault();
    });
    $("#remove").click((e) => {
        numOptions--;
        $(`#${numOptions}`).remove();
        e.preventDefault();
    });
    $("form").submit((e) => {
        return numOptions > 1;
    });
});
