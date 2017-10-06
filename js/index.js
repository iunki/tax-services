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

    var validateInputValue = function () {

        var array = getDataIdArray();

        for (var i = 0; i < array.length; i++) {

            if (array[i] == "") {
                return false;

            }

        }
        return true;

    };
    var getResult = function () {


        var resultArray = getDataIdArray();
        var result = 0;

        var startDebt = $("#start-debet").val();
        var startGetterDebt = $("#start-getter-debet").val();
        var sell = $("#sell").val();
        var finishDebt = $("#finish-debet").val();
        var finishGetterDebt = $("#finish-getter-debet").val();
        var order = $("#order").val();


        if (
            resultArray.indexOf(2) != -1 &&
            resultArray.indexOf(4) != -1 &&
            validateInputValue([sell, order])
        ) {

            result = ((sell - order) * 18 / 118 ).toFixed(2);

        } else if (
            resultArray.indexOf(1) != -1 &&
            resultArray.indexOf(4) != -1 &&
            validateInputValue([sell, order, finishDebt, startDebt])
        ) {

            result = ((sell - order + finishDebt + startDebt ) * 18 / 118).toFixed(2);

        } else if (
            resultArray.indexOf(1) != -1 &&
            resultArray.indexOf(3) != -1 &&
            validateInputValue([sell, order, finishDebt, startDebt])
        ) {

            result = ((sell - order - startGetterDebt + finishGetterDebt) * 18 / 118).toFixed(2);

        } else if (
            resultArray.indexOf(2) != -1 &&
            resultArray.indexOf(3) != -1 &&
            validateInputValue([sell, order, finishDebt, startDebt, startGetterDebt, finishGetterDebt])
        ) {

            result = ((sell - order + finishDebt - startDebt - startGetterDebt + finishGetterDebt) * 18 / 118).toFixed(2);

        }


        $("#result").find("span").html((result != 0) ? result : 0);
    };


    $(".par .par-content .buttons .btn").on("click", function () {

        $(this).parent().find(".active").removeClass("active");

        $(this).addClass("active");

        setVisiableInput();
        getResult();

    });

    $(".par .par-content .input-wrapper input").on("keyup", function () {

        if (this.value.match(/,/)) {
            this.value = this.value.replace(/,/, '.');
        }

        if (this.value.match(/[^0-9.]/g)) {
            this.value = this.value.replace(/[^0-9.]/g, '');
        }

        getResult();

    });


    $("#socials tr td ").on("click", function () {
        Share[$(this).data("id")](window.location.href.slice(0,window.location.href.indexOf('\?')));
    });


    setVisiableInput();


});