
process.stdout.setEncoding('utf8');
const readline = require('readline-sync');

//Importar las clases de personajes
const { Mono, Oso, Tigre, Zorro, Conejo, Enemigo } = require('./clases/personajes.js');

// ================================
// FUNCIONES DEL JUEGO
// ================================
function crearEnemigoAleatorio() {

    const enemigos = [
        new Enemigo('🐺 Lobo Salvaje', 75, 16),
        new Enemigo('🐻‍❄️ Oso Hambriento', 90, 18),
        new Enemigo('🐈‍⬛ Pantera Sigilosa', 60, 22),
        new Enemigo('🕷️ Arania Gigante', 45, 14),
        new Enemigo('🐕 Perro Rabioso', 65, 15),
        new Enemigo('🦂 Escorpion Venenoso', 50, 17),
        new Enemigo('🐍 Serpiente Gigante', 55, 15),
        new Enemigo('🐗 Jabali Furioso', 110, 19),
        new Enemigo('🦅 Aguila Cazadora', 45, 16)
    ];
    return enemigos[Math.floor(Math.random() * enemigos.length)];
}
function combate(jugador, enemigo) {
    console.log('\n==================================');
    console.log(`⚠️ ¡Ha aparecido un enemigo: ${enemigo.nombre}!`);
    console.log(`❤️ Energia del enemigo: ${enemigo.energia}`);
    console.log('==================================\n');

    while (jugador.energia > 0 && enemigo.energia > 0) {
        console.log('\n--- ⚔️ TURNO DE COMBATE ---');
        console.log(`Tu energia: ⚡ ${jugador.energia} | Energia de ${enemigo.nombre}: ❤️ ${enemigo.energia}`);
        console.log('\n⚔️ 1. Atacar');
        console.log('🛡️ 2. Defender');
        console.log('🏃 3. Huir');

        const opcion = readline.question('Elige una opcion: ');

        if (opcion === '1') {
            // 15% de probabilidad de que el jugador falle el ataque
            if (Math.random() < 0.15) {
                console.log(`\n💨 [FALLO] ${jugador.nombre} intento atacar, pero ${enemigo.nombre} lo esquivo rapidamente.`);
            } else {
                const golpeJugador = Math.floor(Math.random() * 11) + jugador.ataque;
                enemigo.recibirDanio(golpeJugador);
                console.log(`\n🗡️ [ATAQUE] ${jugador.nombre} ataco a ${enemigo.nombre} y le hizo ${golpeJugador} de danio.`);
            }

            // Turno de contraataque del enemigo
            if (enemigo.energia > 0) {
                let golpeEnemigo = Math.floor(Math.random() * 8) + enemigo.ataque;

                // 20% de probabilidad de que el enemigo haga un Golpe Crítico
                if (Math.random() < 0.20) {
                    golpeEnemigo += 10;
                    console.log(`\n⚠️ ¡GOLPE CRITICO DEL ENEMIGO!`);
                }

                jugador.recibirDanio(golpeEnemigo);
                console.log(`🩸 [CONTRAATAQUE] ${enemigo.nombre} te ataco e hizo ${golpeEnemigo} de danio.`);
            }

        } else if (opcion === '2') {
            let golpeEnemigo = Math.floor(Math.random() * 8) + enemigo.ataque;


            if (Math.random() < 0.20) { golpeEnemigo += 10; }

            const reducido = Math.floor(golpeEnemigo / 3);
            jugador.recibirDanio(reducido);


            jugador.energia += 5;
            if (jugador.energia > 100) jugador.energia = 100;

            console.log(`\n🛡️ [DEFENSA] ${jugador.nombre} levanto la guardia, redujo el impacto y recupero 5 de energia.`);
            console.log(`🩸 [ATAQUE ENEMIGO] El impacto original era de ${golpeEnemigo}, pero solo recibiste ${reducido} de danio.`);

        } else if (opcion === '3') {
            if (Math.random() < 0.5) {
                console.log(`\n💨 [HUIDA] ${jugador.nombre} logro escapar de ${enemigo.nombre}.`);
                return 'huida';
            } else {
                console.log(`\n❌ [HUIDA FALLIDA] No pudiste escapar.`);
                let golpeEnemigo = Math.floor(Math.random() * 8) + enemigo.ataque;
                if (Math.random() < 0.20) { golpeEnemigo += 10; console.log(`\n⚠️ ¡GOLPE CRITICO DEL ENEMIGO!`); }
                jugador.recibirDanio(golpeEnemigo);
                console.log(`🩸 ${enemigo.nombre} te golpeo con ${golpeEnemigo} de danio mientras intentabas huir.`);
            }
        } else {
            console.log('\n🚫 Opcion invalida.');
        }
    }

    if (jugador.energia <= 0) {
        jugador.perderVida();
        if (jugador.vidas <= 0) {
            console.log(`\n☠️ ${jugador.nombre} ya no tiene vidas.`);
            return 'derrota_total';
        }
        return 'vida_perdida';
    }

    if (enemigo.energia <= 0) {
        console.log(`\n🏆 [VICTORIA] Derrotaste a ${enemigo.nombre}.`);
        return 'victoria';
    }
}

function explorar(jugador) {
    console.log('\n🌲 Te adentras en el bosque...');
    jugador.habilidadEspecial();

    if (jugador.energia <= 0) {
        jugador.perderVida();
        if (jugador.vidas <= 0) return 'derrota_total';
        return 'continuar';
    }

    const evento = Math.random();

    if (evento < 0.20) {
        console.log('\n🍃 El bosque esta tranquilo. No encontraste enemigos.');
        return 'sin_evento';
    } else if (evento < 0.35) {
        console.log('\n🕳️ ¡Caiste en una trampa! Recibes 20 de danio.');
        jugador.recibirDanio(20);
        if (jugador.energia <= 0) {
            jugador.perderVida();
            if (jugador.vidas <= 0) return 'derrota_total';
        }
        return 'trampa';
    } else if (evento < 0.50) {
        console.log('\n🍒 Encontraste frutas y agua fresca.');
        jugador.comer();
        return 'comida';
    } else if (evento < 0.60) {
        console.log('\n⛈️ ¡Una tormenta repentina te golpea! Recibes danio por el clima.');
        const danoClima = Math.floor(Math.random() * 15) + 5;
        jugador.recibirDanio(danoClima);
        if (jugador.energia <= 0) {
            jugador.perderVida();
            if (jugador.vidas <= 0) return 'derrota_total';
        }
        return 'clima_malo';
    } else if (evento < 0.65) {
        console.log('\n💎 ¡Descubriste un tesoro escondido! Recuperas energia y ganas un bonus de ataque.');
        jugador.energia = 100;
        jugador.ataque += 2;
        return 'tesoro';
    } else {
        const enemigo = crearEnemigoAleatorio();
        return combate(jugador, enemigo);
    }
}

// ================================
// INICIO DEL JUEGO
// ================================
console.log('\n================================================');
console.log('      🌳 AVENTURA EN EL BOSQUE INFINITO 🌳');
console.log('================================================');
console.log('🎯 Objetivo: sobrevivir y ganar 3 exploraciones exitosas.\n');

console.log('Elige tu personaje:');
console.log('🦊 5. El Zorro Astuto');
console.log('🐅 4. El Tigre Feroz');
console.log('🐻 3. El Oso Fuerte');
console.log('🐰 2. El Conejo Veloz');
console.log('🐒 1. El Mono Agil');
console.log('🚪 0. Salir');

const opcionPersonaje = readline.question('\nIngresa una opcion: ');

if (opcionPersonaje === '0') {
    console.log('\n👋 Decidiste no entrar al bosque. Hasta luego.');
    process.exit();
}

let jugador;
if (opcionPersonaje === '1') jugador = new Mono('George');
else if (opcionPersonaje === '2') jugador = new Conejo('Bugs');
else if (opcionPersonaje === '3') jugador = new Oso('Banjo');
else if (opcionPersonaje === '4') jugador = new Tigre('Terry');
else if (opcionPersonaje === '5') jugador = new Zorro('Jake');
else {
    console.log('\n🚫 Opcion invalida. El juego se cerrara.');
    process.exit();
}

let exploracionesGanadas = 0;
const metaExploraciones = 5;

console.log(`\n🎉 ¡Bienvenido al bosque, ${jugador.nombre}!`);
jugador.mostrarEstado();

// ================================
// BUCLE PRINCIPAL
// ================================
while (jugador.vidas > 0) {
    console.log('\n============== 🏕️ MENU PRINCIPAL ==============');
    console.log('🌲 1. Explorar el bosque');
    console.log('💤 2. Descansar');
    console.log('🍎 3. Buscar comida');
    console.log('📊 4. Ver estado');
    console.log('🚪 0. Salir del juego');
    console.log('==============================================');

    const accion = readline.question('Que deseas hacer ahora? ');

    if (accion === '1') {
        const resultado = explorar(jugador);

        if (['victoria', 'sin_evento', 'comida', 'huida', 'trampa', 'tesoro'].includes(resultado)) {
            exploracionesGanadas++;
            console.log(`\n📈 [PROGRESO] Exploraciones superadas: ${exploracionesGanadas} de ${metaExploraciones}`);
        }

        if (resultado === 'derrota_total') {
            console.log('\n💀 Has perdido todas tus vidas.');
            console.log('🎬 FIN DEL JUEGO.');
            break;
        }

        if (exploracionesGanadas >= metaExploraciones) {
            console.log('\n==========================================');
            console.log(`👑 ¡FELICIDADES, ${jugador.nombre}!`);
            console.log('🌟 Has sobrevivido al bosque infinito.');
            console.log('🏆 GANASTE EL JUEGO.');
            console.log('==========================================\n');
            break;
        }

    } else if (accion === '2') {

        if (Math.random() < 0.30) {
            console.log('\n⚠️ ¡Oh no! Bajaste la guardia para dormir y un enemigo te encontro.');
            const enemigo = crearEnemigoAleatorio();
            combate(jugador, enemigo);
        } else {
            jugador.descansar();
        }
    } else if (accion === '3') {
        // 40% de probabilidad de emboscada al hacer ruido buscando comida
        if (Math.random() < 0.40) {
            console.log('\n⚠️ ¡Cuidado! Mientras hurgabas en los arbustos buscando comida, fuiste emboscado.');
            const enemigo = crearEnemigoAleatorio();
            combate(jugador, enemigo);
        } else {
            jugador.comer();
        }
    } else if (accion === '4') {
        jugador.mostrarEstado();
    } else if (accion === '0') {
        console.log(`\n🏠 ${jugador.nombre} decidio salir del bosque y volver a casa a salvo.`);
        break;
    } else {
        console.log('\n🚫 Opcion invalida. Intenta de nuevo.');
    }
}

console.log('\n================================================');
console.log('           🎮 GRACIAS POR JUGAR 🎮');
console.log('================================================\n');