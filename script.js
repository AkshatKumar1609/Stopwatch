let hour = 0;
let min = 0;
let sec = 0;
let milisec = 0;
let startId;
function startStop(){
    if(document.querySelector('.js-startStop').innerText === 'Start'){
        start();
    }
    else{
        stop();
    }
}

function start(){
    document.querySelector('.js-startStop').innerText = 'Stop';
    startId = setInterval(function(){
    milisec = Number(milisec) + 1;
    if(milisec>=100){
        milisec = 0;
        sec = sec + 1;
    }
    if(sec>=60){
        sec = 0;
        min = min + 1;
    }
    if(min>=60){
        min = 0;
        hour = hour + 1;
    }
    render();
    },10);
}

function stop(){
    document.querySelector('.js-startStop').innerText = 'Start';
    clearInterval(startId);
}

function render(){
    document.querySelector('.time').innerText = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(milisec).padStart(2, '0')}`;
}

function reset(){
    hour = 0;
    min = 0;
    sec = 0;
    milisec = 0;
    render();
    stop();
    data.splice(0, data.length);
    renderLap();
}

function lap(){
    data.push(`${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(milisec).padStart(2, '0')}`);
    renderLap();
}

function renderLap(){
    let html = '';
    data.forEach((item, index) => {
        html = `
            <div class="lap-row">
                <div class="lap-index">${index+1}</div>
                <div class="lap-value">${item}</div>
                <button class="lap-remove" onclick = "deleteLap(${index})">-</button>
            </div>
        ` + html;
    })
    document.querySelector('.laps').innerHTML = html;
}

function deleteLap(index){
    console.log(index);
    data.splice(index, 1);
    renderLap();
}