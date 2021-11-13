/**
 * @param {number} prumer - Řezný průměr v mm
 * @param {number} rychlost - Řezná rychlost v 1/min 
 * @returns {number} otacky v 1/min  
 */
function vypocitej_otacky(prumer: number, rychlost: number): number {
    return (rychlost * 1_000) / (prumer * Math.PI)
}

function vypocitej_rychlost(prumer: number, otacky: number): number {
    return (prumer * otacky * Math.PI) / 1000
}

const PRUMER = "prumer"
const OTACKY = "otacky"
const RYCHLOST = "rychlost"

const VELICINY = [
    PRUMER,
    OTACKY,
    RYCHLOST,
]

interface IController { [id: string]: RangeTextController }

class RangeTextController {
    private static controllers: IController = {}
    private _value: number

    public get value(): number {
        return this._value
    }
    public set value(value: number) {
        this.range_input.value = this.number_input.value = value.toString();
        this._value = value
    }

    constructor(
        private id: string,
        private range_input: HTMLInputElement,
        private number_input: HTMLInputElement) {
        range_input.addEventListener(
            "input", (ev) => {
                this.value = +range_input.value;
                this.update_all();
            }
        );
        number_input.addEventListener("input",
            (ev) => {
                range_input.value = number_input.value;
                number_input.value = range_input.value;
                this.value = +range_input.value;
            });
        this.value = +range_input.value;
        RangeTextController.controllers[id] = this;
    }

    private update_all() {
        console.log(
            RangeTextController.controllers[PRUMER].value,
            RangeTextController.controllers[OTACKY].value,
            RangeTextController.controllers[RYCHLOST].value,
        );

        if (this.id === RYCHLOST) {

            let otacky = vypocitej_otacky(
                RangeTextController.controllers[PRUMER].value,
                RangeTextController.controllers[RYCHLOST].value,
            );
            console.log(otacky);

            RangeTextController.controllers[OTACKY].value = otacky;

        }
        else {
            let rychlost = vypocitej_rychlost(
                RangeTextController.controllers[PRUMER].value,
                RangeTextController.controllers[OTACKY].value,
            );
            RangeTextController.controllers[RYCHLOST].value = rychlost;

        }
    }
}


function main() {

    for (let nazev_veliciny of VELICINY) {
        let elm_div = document.getElementById(nazev_veliciny).children;
        let range = elm_div[1] as HTMLInputElement;
        let text = elm_div[2] as HTMLInputElement;
        text.value = range.value;
        new RangeTextController(nazev_veliciny, range, text)

        document.body.addEventListener("input", (e) => {
            let a = (e.target as HTMLInputElement).parentElement as HTMLDivElement;
        });
    }



}




