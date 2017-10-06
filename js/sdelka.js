$(function () {
    $(".modal-wrapper").find(".close").on("click", function () {
        $(this).closest(".modal-wrapper").fadeOut();
    });

    $("#tax-btn").on("click", function () {
        $("#modal-regions").fadeIn();
    })
});