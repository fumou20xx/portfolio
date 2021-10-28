window.onload = function(){
    var canvas = document.querySelector('#canvas-container');
    var ctx = canvas.getContext('2d');

    const target = document.getElementById('rect');
    //const lastPos = {x: null, y: null};

    let x = 0;
    let y = 0;
    let isMouseDown = false;

    //マウス移動時
    //document.onmousemove = onmousemove;

    //マウス押下
    target.addEventListener('mousedown', e=>{
        x = e.offsetX;
        y = e.offsetY;
        isMouseDown = true;
    });

    //マウスが要素状に入ったとき
    target.addEventListener('mouseover', ()=>{
        isMouseDown = true;
        target.style.backgroundColor = '#000000';

        target.addEventListener('mousedown', ()=>{
            //if()
            draw();
        });
        // if(isMouseMove){
        //     onmousemove = function(e){
        //         draw();
        //         console.log(lastPos);
        //     } 
        //}
    }, false);

    //マウスが要素上から離れたとき
    target.addEventListener('mouseleave', ()=>{
        //isMouseMove = false;
        target.style.backgroundColor = 'rgb(30, 124, 124)';
    });

    function draw(){
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'yellow';
        ctx.strokeRect(x, y, 20, 20);
        window.requestAnimationFrame(draw);
    }
}

