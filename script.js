let btn = document.querySelector(".composer button");
let control = 0;

document.body.addEventListener("keydown", (e) => {
    playSound(e.code.toLowerCase())
});

btn.addEventListener("click", () => {
    let song = document.querySelector("#input").value;
    let interval;

    if( btn.innerHTML == "Parar") {
        control = 1;
        btn.innerHTML = "Tocar"
    } else {
        btn.innerHTML = "Parar"
        control = 0
        if(song != "") {
            let songArray = song.split("");
            let timeMusic = 200;
            let timeMusicFull = (songArray.length * timeMusic) + timeMusic;

            playComposition(songArray, timeMusic)
           
            interval = setInterval(() => {
                if(control) {
                    clearInterval(interval)
                } else {
                    playComposition(songArray, timeMusic)
                }
            }, timeMusicFull);
        }
    }

})

function playSound(sound){
    let audioElement = document.getElementById(`s_${sound}`);
    let keyElement = document.querySelector(`[data-key=${sound}]`);

    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
        keyElement.classList.add("active");

        setTimeout(() => {
            keyElement.classList.remove("active"); 
        }, 200);
    }
}

function playComposition(songArray, time) {
    let wait = 0;
    for(let item of songArray) {
        setTimeout(()=>{
            playSound(`key${item}`)
        }, wait)
        wait += time
    }
}