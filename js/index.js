$(document).ready(function () {

    var getDataIdArray = function () {

        var resultArray = [];
        var btnElements = $(".par .par-content .buttons .btn.active");

        $.each(btnElements, function (index, obj) {
            resultArray.push($(obj).data("id"));
        });

        return resultArray;
    };

    var setVisiableInput = function () {

        var resultArray = getDataIdArray();

        var elemArray = [$("#start-debet"), $("#start-getter-debet"), $("#sell"), $("#finish-debet"), $("#finish-getter-debet"), $("#order")];

        $.each(elemArray, function (index, obj) {

            obj.val("");
            obj.parent().parent().hide();

        });


        if (
            resultArray.indexOf(2) != -1 &&
            resultArray.indexOf(4) != -1
        ) {

            elemArray[2].parent().parent().show();
            elemArray[5].parent().parent().show();

        } else if (
            resultArray.indexOf(1) != -1 &&
            resultArray.indexOf(4) != -1
        ) {
            elemArray[0].parent().parent().show();
            elemArray[2].parent().parent().show();
            elemArray[3].parent().parent().show();
            elemArray[5].parent().parent().show();

        } else if (
            resultArray.indexOf(2) != -1 &&
            resultArray.indexOf(3) != -1
        ) {

            elemArray[1].parent().parent().show();
            elemArray[2].parent().parent().show();
            elemArray[4].parent().parent().show();
            elemArray[5].parent().parent().show();

        } else if (
            resultArray.indexOf(1) != -1 &&
            resultArray.indexOf(3) != -1
        ) {
            elemArray[0].parent().parent().show();
            elemArray[1].parent().parent().show();
            elemArray[2].parent().parent().show();
            elemArray[3].parent().parent().show();
            elemArray[4].parent().parent().show();
            elemArray[5].parent().parent().show();
        } else {
            elemArray[2].parent().parent().show();
            elemArray[5].parent().parent().show();

        }

    };

    var validateInputValue = function (array) {

        for (var i = 0; i < array.length; i++) {

            if (!(array[i] ^ 0 == array[i])) {

                return false;

            }

        }
        return true;

    };
    var getResult = function () {


        var resultArray = getDataIdArray();
        var result = 0;

        var startDebt = parseInt($("#start-debet").val().replace(/[^0-9]/g, ''));
        var startGetterDebt = parseInt($("#start-getter-debet").val().replace(/[^0-9]/g, ''));
        var sell = parseInt($("#sell").val().replace(/[^0-9]/g, ''));
        var finishDebt = parseInt($("#finish-debet").val().replace(/[^0-9]/g, ''));
        var finishGetterDebt = parseInt($("#finish-getter-debet").val().replace(/[^0-9]/g, ''));
        var order = parseInt($("#order").val().replace(/[^0-9]/g, ''));


        if (
            resultArray.indexOf(2) != -1 &&
            resultArray.indexOf(4) != -1 &&
            validateInputValue([sell, order])
        ) {

            result = ((sell - order) * 18 / 118 );

        } else if (
            resultArray.indexOf(1) != -1 &&
            resultArray.indexOf(4) != -1 &&
            validateInputValue([sell, order, finishDebt, startDebt])
        ) {

            result = ((sell - order + finishDebt - startDebt ) * 18 / 118);

        } else if (
            resultArray.indexOf(1) != -1 &&
            resultArray.indexOf(3) != -1 &&
            validateInputValue([sell, order, finishDebt, startDebt, startGetterDebt, finishGetterDebt])
        ) {

            result = ((sell - order + finishDebt - startDebt - startGetterDebt ) * 18 / 118 + finishGetterDebt);

        } else if (
            resultArray.indexOf(2) != -1 &&
            resultArray.indexOf(3) != -1 &&
            validateInputValue([sell, order, startGetterDebt, finishGetterDebt])
        ) {

            result = ((sell - order - startGetterDebt ) * 18 / 118 + finishGetterDebt);

        }

        $("#result").find("span").html((result != 0) ? Math.round(result) : 0);
    };


    $(".par .par-content .buttons .btn").on("click", function () {

        $(this).parent().find(".active").removeClass("active");

        $(this).addClass("active");

        setVisiableInput();

        getResult();

    });

    $(".par .par-content .input-wrapper input").on("keyup", function () {


        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }


        $(this).val(this.value.replace(/\B(?=(\d{3})+(?!\d))/g, " "));


        getResult();

    });


    $("#socials tr td ").on("click", function () {
        Share[$(this).data("id")](window.location.href.slice(0, window.location.href.indexOf('\?')));
    });


    setVisiableInput();


});