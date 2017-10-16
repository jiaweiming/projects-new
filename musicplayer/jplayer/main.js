
var volume = 0.2;
$(document).ready(function () {
    $("#but").css("background-position", "-42px -44px");
    $("#MyJplayer").jPlayer({
        ready: function (event) {
            $(this).jPlayer("setMedia", {
                title: "Bubble",
                mp3: "http://stdj2.60dj.com/shuqing/38/格子兮 - 泪雨红妆.mp3"
            }).jPlayer("play");
            document.getElementById('end').innerHTML = 0+"3"+":"+"09";
        },
        ended: function () {  //结束，监听函数
            $("#but").css("background-position", "-42px -2px");
            $("#progress-c").css({
                "width": 0 + "px"
            });
        },
        //播放的更新
        timeupdate: function (event) {
            var curPer = event.jPlayer.status.currentPercentRelative;  //当前播放百分比，实时更新的
            changeProgressHandler(curPer);
            var val=Math.round(curPer);
            $("#progress").slider("value",val);  //播放进度的滑块 随着播放百分比向右滑
            //播放的时间 时分秒换算
            var timeSeconds = parseInt(event.jPlayer.status.currentTime);
            var seconds,minutes,hours;
            hours = parseInt(timeSeconds / 3600);
            minutes = parseInt(( timeSeconds % 3600 ) / 60);
            seconds = timeSeconds % 60;
            showTime(hours,minutes,seconds);
        },
        swfPath: "js",
        supplied: "mp3",
        wmode: "window",
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true,
        volume: 0.1,
        seekBar: "seekBar"
    });

    //显示播放的实时时间  将毫秒转化成标准时间
    function showTime(hours,minutes,seconds){
        var str = "";
        if(hours){
            if(hours <10){
                str = "0"+hours
            }else{
                str = hours;
            }
            str += ":";
        }
        if(minutes < 10){
            str += "0"+minutes
        }else{
            str += minutes;
        }
        str += ":";
        if(seconds < 10){
            str += "0"+seconds
        }else{
            str += seconds;
        }
        document.getElementById('begin').innerHTML = str;//将时间添加到输出位置
    }
       //音量初始状态
    $("#cur-vol").css("width",40+'px');
    $("#MyJplayer").jPlayer("volume", 0.4);

       //按钮点击--音量出现
    $("#addVo").on("click", function () {
        $("#MyJplayer").jPlayer("volume", 0.2);
        $("#vol-full").slider("value",20);
        $("#cur-vol").css("width",50+'px');
        $(".cut").css("background-position", "-80px -168px");
    });
        // 按钮点击--音量消失
    $("#subVo").on("click", function () {
        $("#MyJplayer").jPlayer("volume", 0);
        $(".cut").css("background-position", "-60px -168px");
        $("#cur-vol").css("width",0);
        $("#vol-full").slider("value",0);
    });
    // 歌曲播放进度条-实时增加宽度
    function changeProgressHandler(curPer) {
        var nodeWidth = $("#progress").width();
        var width = Math.round(curPer * nodeWidth/100);
        //背景颜色根据实时的百分比宽度而显示
        $("#progress-c").css({
            "width": width + "px"
        });
    }
    // 进度条（鼠标点击时X坐标减去div距窗口的left值再除以div的宽度，得到实时宽度占比）
    $("#progress").on("click", function (e) {
        var left = document.getElementById("progress").getBoundingClientRect().left;
        var abWidth = Math.round(e.clientX - left);
        var nodeWidth = $(this).width();
        var per = Math.round(100 * (abWidth / nodeWidth));
        //播放头 根据实时的宽度值而改变
        $("#MyJplayer").jPlayer("playHead", per);

    });
    // 声音滚动条，和滑轮一起运动
    $("#vol-full").slider({
        animate: true,
        slide: function (event, ui) {},
        change: function(event, ui ) {
            $("#cur-vol").css({"width": ui.value*2.5 + 'px'});
            $("#MyJplayer").jPlayer("volume", ui.value / 100);
        }
    });
    // 滚动条  调用引入的文件 slide方法 播放进度
    $("#progress").slider({
        animate: true,
        slide: function (event, ui) {},
        change: function(event, ui ) {
            $("#progress-c").css({"width": ui.value*1.8 + 'px'});
        }
    });

        //下一曲按钮 更改歌曲信息
    $("#next").on("click", function () {
        $("#MyJplayer").jPlayer("setMedia", {
            mp3: "http://stdj.60dj.com/huiyuan/201702/13/201702132144216016_32805.mp3"
        }).jPlayer("play");
        $("h3").html("凉凉");
        $("#end").html('05:04');
        $("#lyrics").find('p').eq(0).html('影视原声：《三生三世十里桃花》');
        $("#lyrics").find('p').eq(1).html('演唱：张碧晨、杨宗纬');
        $("#album-1").css("background-image","url(images/sanshengsanshi.png)")
    });

    //上一曲按钮 更改音乐信息
    $("#last").on("click", function () {
        $("#MyJplayer").jPlayer("setMedia", {
            mp3: "http://stdj2.60dj.com/shuqing/45/崔子格 - 可念不可说.mp3"
        }).jPlayer("play");
        $("h3").html("可念不可说");
        $("#end").html('04:49');
        $("#lyrics").find('p').eq(0).html('影视原声：《太子妃升职记》');
        $("#lyrics").find('p').eq(1).html('演唱：崔子格');
        $("#album-1").css("background-image","url(images/cuizige.png)")
    });
});
//暂停按钮的点击事件
var pause = false;
function stop() {
    if (!pause) {
        $("#MyJplayer").jPlayer("stop");
        $("#pause").css("background-position", "0 -83px");
        $("#but").css("background-position", "-42px -2px");
        pause = true;
    }
}
//播放函数及对应的执行事件
function play() {
    if (pause) {
        $("#MyJplayer").jPlayer("play");
        $("#pause").css("background-position", "-29px -83px");
        $("#but").css("background-position", "-42px -44px");
    } else {
        $("#MyJplayer").jPlayer("pause");
        $("#but").css("background-position", "-42px -2px");
    }
    pause = !pause;
}