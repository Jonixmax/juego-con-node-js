// ================================
// ARCHIVO: clases/personajes.js
// ================================

class Animal {
    constructor(nombre) {
        this.nombre = nombre;
        this.energia = 80; 
        this.vidas = 2;   
        this.ataque = 8;   
    }

    descansar() {
        this.energia += 20;
        
        if (this.energia > 80) this.energia = 80; 
        console.log(`\n💤 [DESCANSO] ${this.nombre} tomo una siesta y recupero energia. Energia actual: ⚡ ${this.energia}`);
    }

    comer() {
        const comidaEncontrada = Math.floor(Math.random() * 21) + 10;
        this.energia += comidaEncontrada;
      
        if (this.energia > 80) this.energia = 80;
        console.log(`\n🍎 [COMIDA] ${this.nombre} encontro algo de comer y recupero ${comidaEncontrada} de energia.`);
        console.log(`Energia actual: ⚡ ${this.energia}`);
    }

    recibirDanio(cantidad) {
        this.energia -= cantidad;
        if (this.energia < 0) this.energia = 0;
        console.log(`💥 [DANIO] ${this.nombre} recibio ${cantidad} de danio. Energia restante: ⚡ ${this.energia}`);
    }

    perderVida() {
        this.vidas--;
        this.energia = 40; 

        if (this.vidas > 0) {
            console.log(`\n💔 [VIDA PERDIDA] ${this.nombre} perdio una vida.`);
            console.log(`Vidas restantes: ❤️ ${this.vidas}`);
            console.log(`La energia se restablecio a ⚡ ${this.energia}.`);
        }
    }

    mostrarEstado() {
        console.log('\n========== 📊 ESTADO DEL PERSONAJE ==========');
        console.log(`🏷️  Nombre  : ${this.nombre}`);
        console.log(`⚡ Energia : ${this.energia} / 80`);
        console.log(`❤️  Vidas   : ${this.vidas}`);
        console.log(`🗡️  Ataque  : ${this.ataque}`);
        console.log('=============================================');
    }
}


class Mono extends Animal {
    constructor(nombre) { super(`🐒 ${nombre}`); this.ataque = 10; }
    habilidadEspecial() {
        this.energia -= 15;
        if (this.energia < 0) this.energia = 0;
        console.log(`🤸 [ACCION] ${this.nombre} trepo agilmente a un arbol y avanzo por el bosque. Energia: ⚡ ${this.energia}`);
    }
}

class Oso extends Animal {
    constructor(nombre) { super(`🐻 ${nombre}`); this.ataque = 14; }
    habilidadEspecial() {
        this.energia -= 18;
        if (this.energia < 0) this.energia = 0;
        console.log(`🐾 [ACCION] ${this.nombre} mueve arboles caidos y se abre camino por el bosque. Energia: ⚡ ${this.energia}`);
    }
}

class Tigre extends Animal {
    constructor(nombre) { super(`🐅 ${nombre}`); this.ataque = 16; }
    habilidadEspecial() {
        this.energia -= 17;
        if (this.energia < 0) this.energia = 0;
        console.log(`🐾 [ACCION] ${this.nombre} da zarpazos a ramas y arbustos, abriendose camino. Energia: ⚡ ${this.energia}`);
    }
}

class Zorro extends Animal {
    constructor(nombre) { super(`🦊 ${nombre}`); this.ataque = 8; }
    habilidadEspecial() {
        this.energia -= 10;
        if (this.energia < 0) this.energia = 0;
        console.log(`🍃 [ACCION] ${this.nombre} se escabulle rapidamente entre los arbustos. Energia: ⚡ ${this.energia}`);
    }
}

class Conejo extends Animal {
    constructor(nombre) { super(`🐰 ${nombre}`); this.ataque = 8; }
    habilidadEspecial() {
        this.energia -= 10;
        if (this.energia < 0) this.energia = 0;
        console.log(`💨 [ACCION] ${this.nombre} dio un gran salto entre los arbustos. Energia: ⚡ ${this.energia}`);
    }
}

class Enemigo {
    constructor(nombre, energia, ataque) {
        this.nombre = nombre;
        this.energia = energia;
        this.ataque = ataque;
    }
    recibirDanio(cantidad) {
        this.energia -= cantidad;
        if (this.energia < 0) this.energia = 0;
    }
}

module.exports = {
    Animal,
    Mono,
    Oso,
    Tigre,
    Zorro,
    Conejo,
    Enemigo
};