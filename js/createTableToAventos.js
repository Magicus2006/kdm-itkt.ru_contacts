function CreateTableToAventosKits2(response, tipon) {

    //var content='<table class="table_result_css">'
    var content=''
    var withTipon = ''
    var withOutTipon = ''
    if(tipon) {
        withTipon = 'style="text-decoration: underline"'
        withOutTipon = 'style="background-color: #e2e2dd"'
    } else {
        withTipon = 'style="background-color: #e2e2dd"'
        withOutTipon = 'style="text-decoration: underline"'
    }

    content += '<div class="row">\n' +
        '                <div class="col-xl-12 title_cal" >\n' +
        '                    <span>Результат расчета</span>\n' +
        '                </div>\n' +
        '            </div>' +
        '<div class="row"> ' +
        '<div class="col-xl-5 title_cal-2">Тип подъемника</div>' +
        '<div class="col-xl-3 title_div_table">Комплект</div>' +
        '<div class="col-xl-3 title_div_table">Цена</div>' +
        '</div>'

    //content += '<tr><th  style="color: #000000">Тип подъемника<br>AVENTOS</th><th style="color: #000000">Комплект</th><th style="color: #000000">Цена, <a href="javascript:void(0)" class="euro">€</a>, <a href="javascript:void(0)" class="rub">₽</a></th></tr>'
    for (var kit in response) {
        //console.log(kit, " len", response[kit].length)
        if(response[kit]["tipon"] == tipon) {
            if (response[kit]["set"].length > 1) {
                var options_last_child = ""
                for (var index = 0; index < response[kit]["set"].length; ++index) {
                    var nameAventos = response[kit]["set"][index]["name"]
                    var costAventos = response[kit]["set"][index]["cost"]

                    //costAventos = costAventos*(1-(discount_one/100))
                    //costAventos = costAventos*(1-(discount_two/100))
                    //if(nationalCurrency){
                    //    costAventos = costAventos * euro
                        costAventos = costAventos.toFixed(2)
                    //    costAventos = costAventos + "₽"
                    //} else {
                    //    costAventos = costAventos.toFixed(2)
                     //   costAventos = costAventos + "€"
                    //}

                    content += '<div class="row row_gray">' +
                        `                <div class="col-xl-5">${kit}</div>` +
                        `                <div class="col-xl-3 options">` +
                        `                    ${nameAventos}` +
                        '                </div>' +
                        `               <div class="col-xl-3 options">` +
                        `                       ${costAventos}`+
                        '               </div>' +
                        '            </div>'
                }
            } else {
                var index = 0
                var nameAventos = response[kit]["set"][index]["name"]
                var costAventos = response[kit]["set"][index]["cost"]
                //costAventos = costAventos*(1-(discount_one/100))
                //costAventos = costAventos*(1-(discount_two/100))
                //if(nationalCurrency){
                //    costAventos = costAventos * euro
                    costAventos = costAventos.toFixed(2)
                 //   costAventos = costAventos + "₽"

                //} else {
                //    costAventos = costAventos.toFixed(2)
                //    costAventos = costAventos + "€"
                //}

                content += '<div class="row row_gray">' +
                    `                <div class="col-xl-5">${kit}</div>` +
                    `                <div class="col-xl-3 options ${options_last_child}">` +
                    `                    ${nameAventos}` +
                    '                </div>' +
                    `               <div class="col-xl-3 options ${options_last_child}">` +
                    `                       ${costAventos}`+
                    '               </div>' +
                    '            </div>'
            }
        }
    }
    content += '<div class="row row_gray row_max">' +
        '<div class="col-xl-12 description">Наш калькулятор автоматически предлагает, все типы подъемников,\n' +
        'подходящие под выбранные Вами характеристика фасада.</div>' +
        '</div>'

    $("#divAventosTypesV2").html(content)


/*
    $('#myModal__close, #myOverlay').click(function () {
        discount_one = $('input[name="discount_radio"]:checked').val();
        discount_two = $("input[name=amount_discount]").val()
        CreateTableToAventosKits2(response)

        $('#myModal').animate({opacity: 0}, 198, function () {
            $(this).css('display', 'none');
            $('#myOverlay').fadeOut(297);
        });
    });
*/
}
