changeBoton=() => {
    if (document.getElementById('pausa').innerHTML=='Pause') {
        document.getElementById('pausa').innerHTML='Resume0';
    } else { document.getElementById('pausa').innerHTML='Pause'; }
}
//Inicialización del campo
Crafty.init(1366, 900, document.getElementById('game'))

//Texto y Botones
// Ubicación del Timer

//Tiempo en formato mm:ss

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