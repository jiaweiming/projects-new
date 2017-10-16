var canvas=document.getElementById('clock');
var context=canvas.getContext('2d');
var width=context.canvas.width;
var height=context.canvas.height;
var r=width/2;

//先画时钟的大外圆框
function DrawBackground() {
    context.save();  //先保存绘画环境
    context.translate(r,r);  //将原点移动画布正中间
    context.beginPath();
    context.lineWidth=6;  //线条宽度
    context.arc(0,0,r-5,0,2*Math.PI,false);  //画圆
    context.stroke();

    var hours=[3,4,5,6,7,8,9,10,11,12,1,2]; //定义的12小时数组
    context.font='18px Arial';
    context.textAlign='center';  //调整大小和居中
    context.textBaseline='middle';
    hours.forEach(function (number,i) {  // 遍历：第一个参数为数组的内容，第二个为内容的索引
        var rad=2*Math.PI/12*i; //弧度 总的除以12再乘以i就是索引值得弧度
        var x=Math.cos(rad)*(r-30);  //根据弧度计算x的坐标
        var y=Math.sin(rad)*(r-30);
        context.fillText(number,x,y)
    });

    for(var i=0;i<60;i++){     //遍历分钟
        var rad=2*Math.PI/60*i;   //算出分钟的弧度，乘以索引值
        var x=Math.cos(rad)*(r-18);
        var y=Math.sin(rad)*(r-18);
        context.beginPath();
        if(i%5===0){   //5个点刚好一个小时，让小时点变色，对5求模即可
            context.fillStyle="#5255ba";
            context.arc(x,y,2,0,2*Math.PI,false);
        }else{
            context.fillStyle="#ff0600";
            context.arc(x,y,2,0,2*Math.PI,false);
        }
        context.fill();
    }


}

//画出小时的针
function DrawHours(hour,minutes) {
    context.save();  //保存当前的环境
    context.beginPath();
    var rad=2*Math.PI/12*hour;
    var mRad=2*Math.PI/12/60*minutes;
    context.rotate(rad+mRad);
    context.lineWidth=5;   //线宽6个像素
    context.lineCap='round';  //使线条变圆
    context.moveTo(0,10);
    context.lineTo(0,-r/2);
    context.stroke();
    context.restore(); // 还原环境
}

//画出分钟的针
function DrawMinutes(minutes) {
    context.save();  //保存当前的环境
    context.beginPath();
    var rad=2*Math.PI/60*minutes;
    context.rotate(rad);
    context.lineWidth=3;   //线宽6个像素
    context.lineCap='round';  //使线条变圆
    context.moveTo(0,10);
    context.lineTo(0,-r+30);
    context.closePath();
    context.stroke();
    context.restore(); // 还原环境;
}

//画出秒针
function DrawSeconds(seconds) {
    context.save();  //保存当前的环境
    context.beginPath();
    var rad=2*Math.PI/60*seconds;
    context.rotate(rad);
    context.lineWidth=1;   //线宽6个像素
    context.lineCap='round';  //使线条变圆
    context.moveTo(0,10);
    context.lineTo(0,30-r);
    context.stroke();
    context.restore(); // 还原环境
}

//画出中间的固定三个针的白色圆柱
function DrawCenter() {
    context.beginPath();
    context.fillStyle="#ffffff";
    context.arc(0,0,3,0,2*Math.PI,false);
    context.fill();
}

// 画出所有的东西
function DrawAll() {
    context.clearRect(0,0,width,height);  //清除的画布
    var hours=new Date().getHours();
    var minutes=new Date().getMinutes();
    var seconds=new Date().getSeconds();
    DrawBackground();
    DrawHours(hours,minutes);
    DrawMinutes(minutes);
    DrawSeconds(seconds);
    DrawCenter();
    context.restore();  //重置画布环境
}

DrawAll();
setInterval(DrawAll,1000);   //1秒画一次














