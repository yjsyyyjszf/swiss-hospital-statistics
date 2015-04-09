define([], function(){

    /**
     * Creates a new converter that will convert several ICD, DRG or CHOP datasets
     * to data that can be visualized by extracting the information about the number
     * of cases per diagnosis from the datasets.
     * @param datasets the datasets to be converted, the datasets that are returned by an API call
     * @constructor
     */
    function NumberByAgeDatasetConverter(datasets){
        var _this = {};
        var textIntervals = [];
        var totalNumber = 0;

        /**
         * Counts total number of cases and parses intervals to interval name tags (text)
         */
        _this.initialize = function (){

            var intervals = [];

            // get total number of cases
            for (var i = 0; i < datasets.length; i++) {
                totalNumber += datasets[i].categorised_data.categories.interval[0].n;
            }

            /* go through each data set (i.e. interval), read "from" and "to" and store it as formatted text,
               e.g. "15 - 36" or "70+" */
            for (var i = 0; i < datasets.length; i++) {
                var interval = datasets[i].categorised_data.categories.interval[0];
                var from = interval.interval.from;
                var to = interval.interval.to;

                var textInterval;
                if (_.isUndefined(to)) {
                    textInterval = from + "+";
                } else {
                    textInterval = from + " - " + to;
                }

                textIntervals.push(textInterval);
            }
        };

        /**
         * Converts the datasets using absolute values.
         * @returns array of data set objects {interval: val, amount: val}
         */
        _this.asAbsoluteData = function(){
            return _.map(datasets, function(dataset, index){
                var interval = dataset.categorised_data.categories.interval[0];
                return {interval: textIntervals[index], amount: interval.n};
            })
        };

        /**
         * Converts the datasets using percent values.
         * @returns array of data set objects {interval: val, amount: val}
         */
        _this.asPercentData = function () {
            return _.map(datasets, function(dataset, index){
                var interval = dataset.categorised_data.categories.interval[0];
                return {interval: textIntervals[i], amount: 100 * (interval.n) / totalNumber};
            })
        };

        _this.initialize();

        return _this;
    }

    return NumberByAgeDatasetConverter;

});