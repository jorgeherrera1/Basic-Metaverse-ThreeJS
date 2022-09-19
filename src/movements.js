class KeyMovements {
    constructor() {
        this.movement = {};

        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
    }

    onKeyPressed(keyCode) {
        return this.movement[keyCode] ? this.movement[keyCode] : false;
    }

    keyDown(e) {
        if (this.movement[e.keyCode]) return;

        this.movement[e.keyCode] = true;

        console.log("key down: ", e.key, " Key Code: ", e.keyCode);
    }

    keyUp(e) {
        this.movement[e.keyCode] = false;

        console.log("key up: ", e.key, " Key Code: ", e.keyCode);
    }
}

const Movements = new KeyMovements();
export default Movements;