define(['d3', 'views/abstract/AbstractPieChart'], function (d3, AbstractPieChart) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class PieChart
     */
    function PieChart(_width, _height){
        var _this = new AbstractPieChart(_width, _height);
        var manSema = true, womanSema = true;


        var scripting = {
            colorLogic: d3.scale.category20(),
            displayLogic: function (entity) { return entity; },
            transformedLogic: function(value) { return value },
            labelLogic: function (value) { return value.toString() },
            keySymbol: 'key',
            valueSymbol: 'value'
        };

        _this._keyOf = function (d) { return d.data[scripting.keySymbol] };
        _this._valueOf = function (d) { return scripting.transformedLogic(d.data[scripting.valueSymbol]) };
        _this._labelOf = function(value, d) { return scripting.labelLogic(value, d.data) };
        _this._keySymbol = function() { return scripting.keySymbol };
        _this._valueSymbol = function() { return scripting.valueSymbol };

        /* ------------ S C R I P T I N G   A P I ------------ */
        _this.openOn = function (entity, chartIdentifier) {
            _this.setData(scripting.displayLogic(entity), chartIdentifier);
            if(chartIdentifier == 1 && manSema) {
                manSema = false;
                _this.setGenderMan(["Man"]);
            }
            if(chartIdentifier == 2 && womanSema) {
                womanSema = false;
                _this.setGenderWoman(["Woman"]);
            }
            return _this;
        };

        _this.display = function (displayLogic) {
            scripting.displayLogic = displayLogic;
            return _this;
        };

        _this.labeled = function (_labelLogic) {
            scripting.labelLogic = _labelLogic;
            return _this;
        };

        _this.key = function (keySymbol) {
            scripting.keySymbol = keySymbol;
            return _this;
        };

        _this.value = function (valueSymbol) {
            scripting.valueSymbol = valueSymbol;
            return _this;
        };

        _this.colored = function (_function) {
            scripting.colorLogic = _function;
            return _this;
        };

        _this.transformed = function (_function) {
            scripting.transformedLogic = _function;
            return _this;
        };

        return _this;
    }

    return PieChart;

});