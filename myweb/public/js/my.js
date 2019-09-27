function gameOfLife(){
    //初始化
    var ctx = document.getElementById("canvas").getContext("2d");
    var size=1;
    var baseArr=[];
    var canvasWidth=1500;
    var canvasHeight=900;
    var cellSize=30;
    var cell=cellSize-2;
    var xnum=parseInt(canvasWidth/cellSize);
    var ynum=parseInt(canvasHeight/cellSize);
    var change;
    var changeTime=1000;
    canvas.width=canvasWidth*size;
    canvas.height=canvasHeight*size;
    ctx.scale(size,size);
    //二次初始化
    function ready(){
        cell=cellSize-2;
        xnum=parseInt(canvasWidth/cellSize);
        ynum=parseInt(canvasHeight/cellSize);
        canvas.width=canvasWidth*size;
        canvas.height=canvasHeight*size;
        ctx.scale(size,size);
        var x=baseArr.length;
        var y=baseArr[0].length;
        if(xnum>x||ynum>y){
            var newlive=creatNullArr();
            for(var i=0;i<x;i++){
                        for(var j=0;j<y;j++){
                            newlive[i][j]=baseArr[i][j];
                        }
                    } 
                    baseArr=newlive;
        }
        drawBase();
        drawCanvas();
    }
    //创建空生命群组
    function creatNullArr(){
        var arr=[];
        for(var i=0;i<xnum;i++){
            arr[i]=[];
            for(var j=0;j<ynum;j++){
                arr[i][j]=0;
            }
        }
        return arr;
    }
    //创建随机生命群数组
    function creatBaseArr(){
        for(var i=0;i<xnum;i++){
            baseArr[i]=[];
            for(var j=0;j<ynum;j++){
                baseArr[i][j]=parseInt(Math.round(Math.random()));
            }
        }
    }
    //绘制背景画布
    function drawBase(){
        for(var i=0;i<xnum;i++){
            for(var j=0;j<ynum;j++){
                ctx.strokeStyle='rgb(99,99,99)';
                ctx.strokeRect(i*cellSize,j*cellSize,cellSize,cellSize);
            }
        }
    }
    //出现生命
    function setLive(i,j){
        ctx.fillStyle='rgb(0,255,0,0.7)';
        ctx.fillRect(i*cellSize+1,j*cellSize+1,cell,cell);
    }
    //生命消失
    function setDie(i,j){
        ctx.fillStyle='rgb(0,0,0,0.75)';
        ctx.fillRect(i*cellSize+1,j*cellSize+1,cell,cell);
    }
    //绘制生命群
    function drawCanvas(){
        for(var i=0;i<xnum;i++){
            for(var j=0;j<ynum;j++){
                if(baseArr[i][j]==1){
                    setLive(i,j);
                }else{
                    setDie(i,j);
                }
            }
        }
    }
    //获取生命邻居数
    function getNeighbors(x,y){
        var cnt=0;
        for(var i=x-1;i<=x+1;i++){
            for(var j=y-1;j<=y+1;j++){
                if(i>=0 && j>=0 && i<xnum && j<ynum) {
                    if((i != x || j != y)){
                        if(baseArr[i][j]==1){
                            cnt++; 
                        }
                    }
                }  
            }
        }
        return cnt;
    }
    //进化并刷新画布
    function go(){
        var nextArr=[];
        for(var i=0;i<xnum;i++){
            nextArr[i]=[];
            for(var j=0;j<ynum;j++){
                var neighbors=getNeighbors(i,j);
                if(neighbors==2){
                    nextArr[i][j]=baseArr[i][j];
                }else if(neighbors==3){
                    nextArr[i][j]=1;
                }else{
                    nextArr[i][j]=0;
                }
            }
        }
        baseArr=nextArr;
        drawCanvas();
    }
    //开始暂停
    function start(){
        change=setInterval(() => {
            go();
        },changeTime);
        $("#start-stop").html("暂停进化");
    }
    function stop(){
        clearInterval(change);
        $("#start-stop").html("自动进化");
    }
    $("#start-stop").click(function(){
        if( $("#start-stop").html()=="自动进化"){
            start();
        }else{
            stop();
        }
    })
    //进化一步
    $("#next-cell").click(function(){
        go();
    });
    //手动改变生命状态
    $("#canvas").click(function(e){
        var i=Math.floor(e.offsetX/(cellSize*size));
        var j=Math.floor(e.offsetY/(cellSize*size));
        if(baseArr[i][j]==1){
            baseArr[i][j]=0;
        }else{
            baseArr[i][j]=1;
        }
        drawCanvas();
        var g=getNeighbors(i,j);
    })
    //清空所有生命
    $("#clear-cell").click(function(){
        baseArr=creatNullArr();
        drawCanvas();
    })
    //修改速度
    $("#u-slower").click(function(){
       var speed=parseInt($("#u-slower").next().html());
       if(speed>1){
        $("#u-slower").next().html(--speed+"次/秒");
       }
       changeTime=parseInt(1000/speed);
       stop();
       start();
    })
    $("#u-faster").click(function(){
        var speed=parseInt($("#u-slower").next().html());
        if(speed<10){
         $("#u-slower").next().html(++speed+"次/秒");
        }
        changeTime=parseInt(1000/speed);
        stop();
        start();
    })
    //自定义世界
    $(".u-size:eq(0)").blur(function(){
        canvasWidth=$(".u-size:eq(0)").val();
        ready();
        stop();
        go();
    });
    $(".u-size:eq(1)").blur(function(){
        canvasHeight=$(".u-size:eq(1)").val();
        ready();
        stop();
        go();
    });
    $(".u-size:eq(2)").blur(function(){
        cellSize=$(".u-size:eq(2)").val();
        ready();
        stop();
        go();
    });
    $(".u-size:eq(3)").blur(function(){
        size=1/($(".u-size:eq(3)").val());
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        ready();
        stop();
        go();
    });
    $(".u-size:eq(4)").click(function(){
        creatBaseArr();
        stop();
        go();
    })
    //经典示例
    var objsgd={
        length:4,
        str:"0000000000000111"
    }
    var objhxj={
        length:4,
        str:"0000000101010011"
    }
    var objflower={
        length:10, 
        str:"0000000000000000000000000000000000000000000000000000000000000000000000000000011000000010110000000110"
    }
    var objten={
        length:10,
        str:"000000000000000000000000000000000000000000000000000000000001000000000100000000010000000001000000000100000000010000000001000000000100000000010000000001"
    }
    var objfly={
        length:10,
        str:"000000000000000000000000000000000000000000000000000000010100000010000000001000000000100100000011100000000000000000000000000000000000000000000000000000"
    }
    var objgun={
        length:10,
        str:"0000000000000000110000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001100011000000000000001000100000011100000001110000000000000000000000000000000000000000000000000000000010000000011100000001110000000000000001100011000110001100000000000000000000000000000000000000000000000000000000000000000000000000001100000000110000000000000000000000000000000000"
    }
    //转化为数组
    function creatArr(obj){
        var y=obj.length;
        var str=obj.str;
        var x=Math.ceil((str.length)/y);
        var arr=[];
        for(var i=0;i<x;i++){
            arr[i]=[];
            for(var j=0;j<y;j++){
                var live=str.substr(i*y+j,1);
                if(live==""){
                    arr[i][j]=0;
                }else{
                    arr[i][j]=parseInt(live);
                }
            }
        }
        var newlive=creatNullArr();
        for(var i=0;i<x;i++){
            for(var j=0;j<y;j++){
                newlive[i][j]=arr[i][j];
            }
        } 
        baseArr=newlive;
    }
    //使用示例
    $("#jd").change(function(){
        var obj;
        var changed=$("#jd").val()
        if(changed=="sgd"){
            obj=objsgd;
        }else if(changed=="hxj"){
            obj=objhxj;
        }else if(changed=="flower"){
            obj=objflower;
        }else if(changed=="ten"){
            obj=objten;
        }else if(changed=="fly"){
            obj=objfly;
        }else if(changed=="gun"){
            obj=objgun;
        }
        creatArr(obj);
        drawBase();
        drawCanvas();
    })
    //保存为对象
    // $("#save-obj").click(function(){
    //     var obj={
    //         length:0,
    //         str:""
    //     };
    //     var y=10;
    //     obj.length=y;
    //     for(var i=0;i<40;i++){
    //         for(var j=0;j<y;j++){
    //             obj.str+=(baseArr[i][j]).toString();
    //         }
    //     }
    // })
    //生成世界
    creatBaseArr();
    drawBase();
    drawCanvas();
}
gameOfLife();