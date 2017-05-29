$(document).ready(() => {
    let numOptions = 2;
    $("#add").click((e) => {
        $("#options").append(`<input class="form-control" type="text" name="option-${numOptions}" placeholder="option${numOptions + 1}" id=${numOptions} required="true"></input>`);
        $(`#${numOptions}`).focus();
        numOptions++;
        e.preventDefault();
    });
    $("#remove").click((e) => {
        numOptions--;
        if (numOptions < 2)
            numOptions++;
        else
            $(`#${numOptions}`).remove();
        $(`#${numOptions - 1}`).focus();
        e.preventDefault();
    });
});
