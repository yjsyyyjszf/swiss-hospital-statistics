define([
    'View', 'views/BoxPlot'
], function (
    View, BoxPlot
) {

    function BoxPlotVisualisation(_width, _height) {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var boxPlot = new BoxPlot(_width, _height);

        _this.initialize = function () {
            this.append(content);
            _this.class('boxPlotContainer');
        };

        // add is being overridden by content.add...
        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        _this.removeFromContent = function() {
            $(_this).remove();
        };

        /**
         * Creates this visualisation from the data provided.
         * @param data the data to update this visualisation with
         */
        _this.visualise = function (data){
            var datasets = data.codes.icd.codes;
            // TODO: think of a new helper JS
            if(datasets.length > 0) {
                // datasets[0].codes gives you the C341 code
                var code = datasets[0].code;
                // This is the short textual description of the specific code from data
                var description = datasets[0].description;
                var intervals = [];

                // get total number of cases
                var sum = 0;
                for (var i = 0; i < datasets.length; i++) {
                    sum += datasets[i].categorised_data.categories.interval[0].n;
                }

                // TODO what happens if some data is missing?
                for (var i = 0; i < datasets.length; i++) {
                    var interval = datasets[i].categorised_data.categories.interval[0];
                    var min = interval.min;
                    var max = interval.max;
                    var specificN = interval.n;
                    var lowerQuartil = interval.categories.percentile[2];
                    var median = interval.categories.percentile[3];
                    var higherQuartil = interval.categories.percentile[4];

                    var from = interval.interval.from;
                    var to = interval.interval.to;

                    // TODO maybe you want to put all boxplots into a chart???
                    var textInterval;
                    if (_.isUndefined(to)) {
                        textInterval = from + "+";
                    } else {
                        textInterval = from + " - " + to;
                    }

                    // Pushing data per age interval into an array.
                    intervals.push([{key: textInterval, value: 100 * (interval.n) / sum},
                        {key: "summe", value: sum},
                        {key: "min", value: min},
                        {key: "max", value: max},
                        {key: "specificN", value: specificN},
                        {key: "lowerQuartil", value: lowerQuartil.amount},
                        {key: "median", value: median.amount},
                        {key: "higherQuartil", value: higherQuartil.amount}]);
                }
                console.log(interval);
                boxPlot.setData(intervals);

                /*
                 boxPlot = new BoxPlot().transformed(function (v) {
                 return v.toPrecision(3)
                 })
                 .labeled(function (value) {
                 return (value ) + '%'
                 })
                 .openOn(intervals);

                 content.empty();
                 */
                content.add('<h3>' + code + ": " + description + '</h3>');
                content.add(boxPlot);

                // TODO think of something else for a Legend
                /*
                 var key = '<div id="key"><ul>';
                 $.each(intervals, function(index, value){
                 key += '<li style="background-color:' + colors[index] + '">' + value.key + '   Jahre</li>';
                 });
                 key += '</ul></div>';
                 content.add(key);
                 }
                 */
            }

            return _this;
        };

        _this.initialize();

        return _this;
    }

    return BoxPlotVisualisation;
});