function vypocitej_otacky(prumer, rychlost) {
    return (rychlost * 1000) / (prumer * Math.PI);
}
function vypocitej_rychlost(prumer, otacky) {
    return (prumer * otacky * Math.PI) / 1000;
}
var PRUMER = "prumer";
var OTACKY = "otacky";
var RYCHLOST = "rychlost";
var VELICINY = [
    PRUMER,
    OTACKY,
    RYCHLOST,
];
var RangeTextController = /** @class */ (function () {
    function RangeTextController(id, range_input, number_input) {
        var _this = this;
        this.id = id;
        this.range_input = range_input;
        this.number_input = number_input;
        range_input.addEventListener("input", function (ev) {
            _this.value = +range_input.value;
        });
        range_input.addEventListener("change", function (ev) { return _this.update_all(); });
        number_input.addEventListener("change", function (ev) {
            _this.range_input.value = _this.number_input.value;
        });
        number_input.addEventListener("focusout", function (ev) { return _this.number_input.value = _this.range_input.value; });
        this.value = +range_input.value;
        RangeTextController.controllers[id] = this;
    }
    Object.defineProperty(RangeTextController.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            value = Math.round(value * 100) / 100;
            this.range_input.value = this.number_input.value = value.toString();
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    RangeTextController.prototype.update_all = function () {
        if (this.id === RYCHLOST) {
            var otacky = vypocitej_otacky(RangeTextController.controllers[PRUMER].value, RangeTextController.controllers[RYCHLOST].value);
            RangeTextController.controllers[OTACKY].value = otacky;
        }
        else {
            var rychlost = vypocitej_rychlost(RangeTextController.controllers[PRUMER].value, RangeTextController.controllers[OTACKY].value);
            RangeTextController.controllers[RYCHLOST].value = rychlost;
        }
    };
    RangeTextController.controllers = {};
    return RangeTextController;
}());
function main() {
    for (var _i = 0, VELICINY_1 = VELICINY; _i < VELICINY_1.length; _i++) {
        var nazev_veliciny = VELICINY_1[_i];
        var elm_div = document.getElementById(nazev_veliciny).children;
        var range = elm_div[1];
        var text = elm_div[2];
        text.value = range.value;
        new RangeTextController(nazev_veliciny, range, text);
    }
}
