window.onload = function () {
    var list = document.getElementById('list');

    //每隔三秒切换海报图片
    function animate() {
        var newLeft = parseInt(list.style.left);
        if (newLeft < -2400) {
            list.style.left = 0;
        } else {
            list.style.left = newLeft - 800 + 'px';
        }
        setTimeout(animate, 3000);
    }

    animate();

};

function checkTime(i) { //将0-9的数字前面加上0，两位数显示
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//倒计时时间
setInterval(function () {
    var nowTime = new Date().getTime();//获取毫秒数
    var endTime = new Date(2017, 10, 13, 23, 25, 26);
    var leftTime = endTime - nowTime;  //获取差值毫秒数
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24); //计算剩余的天数
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24);//计算剩余小时数
    var minutes = parseInt(leftTime / 1000 / 60 % 60);//计算剩余的分钟
    var seconds = parseInt(leftTime / 1000 % 60);//计算剩余的秒数
    var D = checkTime(days), H = checkTime(hours), M = checkTime(minutes), S = checkTime(seconds);
    $(".timer").html(D + ":" + H + ":" + M + ":" + S);
}, 1000);

$("#suggests").click(function () {
    $("#img0").toggle(150)
});
$(".mobile-word").mouseover(function () {
    $(".pic-img").toggle(150)
});
$(".mobile-word").mouseout(function () {
    $(".pic-img").css("display", 'none')
});
