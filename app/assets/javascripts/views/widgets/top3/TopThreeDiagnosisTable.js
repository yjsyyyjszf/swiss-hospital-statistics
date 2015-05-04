define([
    'd3',
    'views/ResponsiveSvg',
    'views/ui/HospitalTypeButtonBar'
], function (
    d3,
    ResponsiveSvg,
    HospitalTypeButtonBar
){

    function TopThreeDiagnosisTable(_width, _height){

        //Expected JSON-format: {"interval": val, "total": val, "male": val, "female": val}

        var _this = new ResponsiveSvg(_width, _height);

        var TRANSITION_TIME = 1000;
        var titleFontSize = _height / 20;
        var chartHeight = _height - titleFontSize;

        var hospitalTypeButtons = new HospitalTypeButtonBar();

        _this.append(hospitalTypeButtons);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        var xScale = d3.scale.ordinal().rangeBands([0, _width]);
        var yScale = d3.scale.ordinal().rangeBands([0, _height]);

        _this.initialize = function(){
            _this.svg().append("text")
                .attr("id", "title")
                .attr("y", 35)
                .style("font-size", titleFontSize + "px");

            _this.setTitle("Three majestic black squares in their natural habitat");
        };

        _this.setTitle = function(text){
            _this.svg().select("#title")
                .transition()
                .duration(TRANSITION_TIME)
                .text(text);

            return _this;
        };


        /* ----------------------------- UNSAFE --------------------------------------------- */
        _this.randomBarStuff = function(data){
            var boxDimension = _height/3;

            var xDomain = [0,1,2];
            xScale.domain(xDomain);

            var bar = _this.svg().selectAll("g")
                .data(data)
                .enter().append("g");
                //.attr("transform", function(d, i) { return "translate(" + i * boxDimension + ",0)"; });

            bar.append("rect")
                .attr("x", function(d, i) { console.log(d + ", " + i + ", " + xScale(i)); return xScale(i)})
                .attr("y", function(d) { return 200/*yScale(d.value);*/})
                .attr("height", function(d) { return boxDimension; })
                .attr("width", boxDimension)
                .style("fill", function(d) { return "black"; });

            /*bar.append("text")
                .attr("x", boxDimension / 2)
                .attr("y", function(d) { return yScale(d.value) + 3; })
                .attr("dy", ".75em")
                .text(function(d) { return d.value; });*/
        };
         /* ---------------------------------------------------------------------------------- */



        _this.initialize();
        return _this;
    }

    return TopThreeDiagnosisTable;

});
