window.addEventListener('load', ()=>{
    const canvas = document.querySelector('#draw-area');

    const context = canvas.getContext('2d');
    const lastPosition = { x: null, y: null};
    
    //初期化
    let isDrag = false;

    //現在の線の色を保持する変数
    let currentColor = '#000000';

    function draw(x, y){
        if(!isDrag){
            return;
        }

        //線の状態定義
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 5;
        context.strokeStyle = currentColor;

        //前回の位置から線を引く
        if(lastPosition.x === null || lastPosition.y === null){
            //ドラッグ開始時の線の開始位置
            context.moveTo(x, y);
        } else {
            //ドラッグ最中の線の開始位置
            context.moveTo(lastPosition.x, lastPosition.y)
        }

        //
        context.lineTo(x, y);
        context.stroke();

        //現在のマウス位置記憶
        lastPosition.x = x;
        lastPosition.y = y;
    }

    //全削除
    function clear(){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    //ドラッグが開始したら
    function dragStart(event){
        context.beginPath();
        isDrag = true;
    }

    //ドラッグが終了したら or マウスが枠を超えたら
    function dragEnd(event){
        context.closePath();
        isDrag = false;

        //描画中に記録していた値をリセットする
        lastPosition.x = null;
        lastPosition.y = null;   
    }

    //eventの定義
    function initEventHandler(){
        //全削除呼び出し
        const clearButton = document.querySelector('#clear-button');
        clearButton.addEventListener('click', clear);

        //消しゴム
        const eraserButton = document.querySelector('#eraser-button');
        eraserButton.addEventListener('click', ()=>{
            //白にする
            currentColor = '#FFFFFF';
        });
        
        //描画呼び出し
        canvas.addEventListener('mousedown', dragStart);
        canvas.addEventListener('mouseup', dragEnd);
        canvas.addEventListener('mouserout', dragEnd);
        canvas.addEventListener('mousemove', (event)=>{
            //デバッグ
            console.log(event);
            draw(event.layerX, event.layerY);
        });
    }

    //カラーパレットの設置
    function initColorPalette(){
        const joe = colorjoe.rgb('color-palette', currentColor);
        //'done'イベントはカラーパレットから色を選択したときに呼ばれるイベント
        joe.on('done', color =>{
            currentColor = color.hex();
        });
    }

    //イベント処理の初期化
    initEventHandler();

    //カラーパレット情報の初期化
    initColorPalette();
});