changeBoton=() => {
    if (document.getElementById('pausa').innerHTML=='Pause') {
        document.getElementById('pausa').innerHTML='Resume0';
    } else { document.getElementById('pausa').innerHTML='Pause'; }
}
//Inicialización del campo
Crafty.init(1366, 900, document.getElementById('game'))

// Ubicación del Timer
let time=0
let Tiempo=Crafty.e('2D,DOM,Text').attr({
    x: 200,
    y: 200,
    w: 265,
    h: 50
});

Tiempo.textFont({
    size: '20px',
}).textColor('white');
//Tiempo en formato mm:ss
// Tiempo.bind('UpdateFrame', (eventData) => {
//     time+=eventData.dt/1000;
//     let minutos=parseInt((time/60), 10);
//     if (minutos<10) minutos='0'+minutos;
//     let segundos=parseInt((time%60), 10);
//     if (segundos<10) segundos='0'+segundos;
//     if (minutos==10) {
//         Crafty.stop(); go1=0; go2=0; time=0;
//         this.text("Se acabo el partido!");
//     } else {
//         this.text("Tiempo: "+minutos+":"+segundos);
//     }
// });
// Ubicación del Marcador

// Formato Marcador de goles


//Inicialización de los jugadores

// Equipo_1
let assetsObj={
    "sprites": {
        "equipo_1.png": {
            tile: 104,
            tileh: 114,
            map: {
                walker_start: [0, 0],
                walker_middle: [7, 0],
                walker_end: [7, 1]
            }
        }
    }
};
Crafty.load(assetsObj);

//Equipo 2
let assetsObj2={
    "sprites": {
        "equipo_2.png": {
            tile: 104,
            tileh: 114,
            map: {
                walker2_start: [0, 0],
                walker2_middle: [7, 0],
                walker2_end: [7, 1]
            }
        }
    }
};
Crafty.load(assetsObj2);

//Inicialización del balon
let assetsObjBall={
    "sprites": {
        "balon.png": {
            tile: 306,
            tileh: 306,
            map: {
                ball_start: [0, 0],
                ball_middle: [0, 0],
                ball_end: [0, 0]
            }
        }
    }
}
Crafty.load(assetsObjBall);

//! Cración de las Porterias
// let red1 = Crafty
//                 .e("2D, Canvas, Color, Collision")
//                 .attr({x:28, y: 280, w:28, h82})
//                 .color('green')
//                 .collision()
//                 .checkHits("ball_start")
//                 .bind("HitOn", function(hitData) {
//                     if((hitDatas = this.hit('ball_start'))){
//                         go2 += 1;
//                         Crafty.stop();
//                         initPosition();
//                         //Logica para cuando se mete un gol
//                     }
//                 });
//! Cración del Balon
let ball=Crafty
    .e('2D, Canvas, ball_start,SpriteAnimation, Collision')
    .attr({ x: (1366/2)-20, y: 430, w: 40, h: 40 })
    .collision()
    .checkHits('Collision')
    .bind("HitOn", (hitData) => {
        //desplazamientos
        if ((hitData=this.hit('arriba'))) {
            this.y_move=false;
            this.y_tiro=false;
        }
        if ((hitData=this.hit('abajo'))) {
            this.y_move=true;
            this.y_tiro=false;
        }
        if ((hitData=this.hit('centro'))) {
            this.y_tiro=true;
        }
        if ((hitData=this.hit('walker_start'))) {
            this.x_move=true;
        }
        if ((hitData=this.hit('walker2_start'))) {
            this.x_move=false;
        }
    });
ball.reel("walking", 500, [
    [0, 0]
]);
ball.animate("walking", -1);

//! Creación de los jugadores
let team_1=[]
let team_2=[]

// Equipo_1
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, centro").attr({ x: 30, y: 400, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, arriba").attr({ x: 300, y: 300, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, abajo").attr({ x: 300, y: 500, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, centro").attr({ x: 570, y: 150, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, arriba").attr({ x: 570, y: 400, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, abajo").attr({ x: 570, y: 650, w: 85, h: 85 }).collision())
team_1.push(Crafty.e("2D, Canvas, walker_start, SpriteAnimation, Collision, centro").attr({ x: 850, y: 400, w: 85, h: 85 }).collision())

// Equipo_2
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 1240, y: 400, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 970, y: 300, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 970, y: 500, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 720, y: 150, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 720, y: 400, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 720, y: 650, w: 85, h: 85 }).collision())
team_2.push(Crafty.e("2D, Canvas, walker2_start, SpriteAnimation, Collision, centro").attr({ x: 420, y: 400, w: 85, h: 85 }).collision())


//Posicionamiento de los jugadores
//Equipo 1
var initPosition=() => {
    team_1[0].attr({ x: 30, y: 400, w: 85, h: 85 })
    team_1[1].attr({ x: 300, y: 300, w: 85, h: 85 })
    team_1[2].attr({ x: 300, y: 500, w: 85, h: 85 })
    team_1[3].attr({ x: 570, y: 150, w: 85, h: 85 })
    team_1[4].attr({ x: 570, y: 400, w: 85, h: 85 })
    team_1[5].attr({ x: 570, y: 650, w: 85, h: 85 })
    team_1[6].attr({ x: 850, y: 400, w: 85, h: 85 })

    //Equipo 2
    team_2[0].attr({ x: 1240, y: 400, w: 85, h: 85 })
    team_2[1].attr({ x: 970, y: 300, w: 85, h: 85 })
    team_2[2].attr({ x: 970, y: 500, w: 85, h: 85 })
    team_2[3].attr({ x: 720, y: 150, w: 85, h: 85 })
    team_2[4].attr({ x: 720, y: 400, w: 85, h: 85 })
    team_2[5].attr({ x: 720, y: 650, w: 85, h: 85 })
    team_2[6].attr({ x: 420, y: 400, w: 85, h: 85 })

}
// Espacio de desplazamiento establedo para cada jugador
for (let i=0; i<7; i++) {
    // Espacio jugador equipo1
    team_1[i].reel("walking", 500, [
        [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
        [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
    ]);
    team_1[i].animate("walking", -1);

    //Espacio jugador equipo2
    team_2[i].reel("walking", 500, [
        [7, 1], [6, 1], [5, 1], [4, 1], [3, 1], [2, 1], [1, 1], [0, 1],
        [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]
    ]);
    team_2[i].animate("walking", -1);
}
//Movimiento del balón
let xball;
let yball;
ball.origin("center");
ball.bind("UpdateFrame", (eventData) => {
    if (this.x>950||!this.x_move) {
        xball=true;
        this.x_move=false;
    }
    if (this.x<55||this.x_move) {
        xball=false;
        this.x_move=true;
    }
    if (xball) {
        this.x=this.x-222*(eventData.dt/1000);
        this.rotation=this.rotation-8;
    }
    else {
        this.x=this.x+222*(eventData.dt/1000);
        this.rotation=this.rotation+8;
    }
    if (this.y>=595||this.y_move) {
        yball=true;
        this.y_move=true;
    }
    if (this.y<=17||!this.y_move) {
        yball=false;
        this.y_move=false;
    }
    let velocidad=200;
    if (this.y_tiro) {
        velocidad=22
    }
    if (yball) {
        this.y=this.y-velocidad*(eventData.dt/1000);
    }
    else {
        this.y=this.y+velocidad*(eventData.dt/1000);
    }
});

//Movimiento de los jugadores

let y1;
let x1;
team_1[0].bind("UpdateFrame", (eventData) => {
    if (this.x>68) {
        x1=true;
    }
    if (this.x<28) {
        x1=false;
    }
    if (x1)
        this.x=this.x-30*(eventData.dt/1000);
    else
        this.x=this.x+30*(eventData.dt/1000);

    if (this.y>=350) {
        y1=true;
    }
    if (this.y<=190) {
        y1=false;
    }
    if (y1) {
        this.y=this.y-68*(eventData.dt/1000);
    }
    else {
        this.y=this.y+73*(eventData.dt/1000);
    }
});