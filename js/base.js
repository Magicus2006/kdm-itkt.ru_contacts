$( "#menu_icon, #menu_main" ).hover(
        function() {
            console.log('Привет от fnOver');
            $("#menu_main").css("display", "block"); // Для показа

            $("#menu_icon").css("background-color", "#484450")
            $(".menu_icon_line").css("background-color", "#ffffff")
            $(".menu_icon_text").css("color","#ffffff")
        }, function() {
            console.log('Привет от fnOver');
        $("#menu_main").css("display", "none"); // Для скрытия
        $("#menu_icon").css("background-color", "#ffffff")
        $(".menu_icon_line").css("background-color", "#484450")
        $(".menu_icon_text").css("color","#484450")
        }
);

$("#menu_icon").click(
    function () {
        $("#menu_main").css("display", "block"); // Для показа
    }
);
