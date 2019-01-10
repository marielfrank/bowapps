
var color = "mediumaquamarine";
var values = make_freq_dict("Another five fish find another faraway fish")
var groups = make_d3_dict(values)

var width = 500,
    height = 400;

var padding = 30;
createGraph(groups)

function createGraph(groups){
  var maxFreq = d3.max(groups, function (d) { return d.freq});

  var svg = d3
    .select('.graphContainer')
    .append('svg')
    .attr('width', width + 100)
    .attr('height', height)
    .append('g');

  var barHeight = height / groups.length - padding;

  var yScale = d3.scale.linear()
      .domain([0, groups.length])
      .range([0, height]);

  var xScale = d3.scale.linear()
      .domain([0, maxFreq])
      .range([0, width]);

  var bars = svg.selectAll('.bar')
    .data(groups)
    .enter().append('g');

  bars
      .append('rect')
      .attr('x', 0)
      .attr('y', function (d, i) { return yScale(i); })
      .attr("width", function (d) { return xScale(d.freq); })
      .attr("height", barHeight)
      .attr('fill','steel');

  bars.append('text')
      .text(function (d) { return d.word; })
      .attr('x', function (d) { return 10 + xScale(d.freq); })
      .attr('y', function (d, i) { return yScale(i); })
      .attr('dy', '1em');


  var xAxis = d3.svg.axis().tickFormat(d3.format("d")).scale(xScale);

  svg.append("g")
    .attr("id", "xaxis")
    .attr("transform", "translate(0, " + (height-30) + ")")
    .call(xAxis);  
  
  const zero = $('#xaxis').find('text').first()
  zero.attr('x', '5')
  }

/*
* Adding refresh method to reload new data
*/
function refresh(values){
  // var values = d3.range(1000).map(d3.random.normal(20, 5));
  // var data = d3.layout.histogram()
  //   .bins(x.ticks(20))
  //   (values);
  // Reset y domain using new data
  d3.selectAll("svg").remove();

  var groups = make_d3_dict(values)
  createGraph(groups)
}

function make_freq_dict(sentence){
  var freq_dict = {};
  var words = sentence.replace(/[.]/g, '').toLowerCase().split(/\s/);
  words.forEach(function(w) {
    if (!freq_dict[w]) {
      freq_dict[w] = 0;
    }
    freq_dict[w] += 1;
  });

  return freq_dict;
}

function make_d3_dict(freq_dict){
  var data_list = [];
  for(var key in freq_dict){
    data_list.push({"word": key, "freq": freq_dict[key]});
  }

  return data_list;
}

// Calling refresh repeatedly.

$(document).ready(function(){
  $(".sentence").val("Another five fish find another faraway fish")

  $('.sentence').keypress(function(e){
    if(e.keyCode==13){
      $('.submit').click();
    }
  });
  $(".submit").on('click', function(){
    var input_sentence = $(".sentence").val();
    var freqs = make_freq_dict(input_sentence)
    refresh(freqs);  
  });
})
