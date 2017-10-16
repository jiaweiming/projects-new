window.onload=function () {
    $(".dB1").click(function () {
        $(".protable").toggle(300)
    });
    $(".dB2").click(function () {
        $(".introduce").toggle(300)
    });
    $(".project").click(function () {
        $(".protable").toggle(300)
    });
    $(".about").click(function () {
        $(".introduce").toggle(200)
    });
    $(".csdn").click(function () {
        window.open("http://my.csdn.net/");
    });
    $(".github").click(function () {
        window.open("https://github.com/join");
    });

    $("#date").html("@"+(new Date().getFullYear()));
};