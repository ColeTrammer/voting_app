$(document).ready(() => {
    const width = 400,
          height = 400,
          svg = d3.select("#pollResults")
                  .attr("height", height)
                  .attr("width", width),
          radius = width / 2,
          g = svg.append("g")
                .attr("transform", `translate(${[width/2, height/2]})`);

    const color = d3.scaleOrdinal(d3.schemeDark2);


    const textArea = svg.append("g")
        .style("display", "none");
    const textBox = textArea.append("path")
        .attr("d", boxPath(150, 100, 10, 0, -30))
        .attr("id", "textBox");
    const text = textArea.append("text")
        .attr("x", 0)
        .attr("y", 0);

    const pie = d3.pie()
        .sort((a, b) => a - b)
        .value((d) => d.votes);

    const path = d3.arc()
        .outerRadius(radius - 1)
        .innerRadius(0);

    const label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    $.getJSON(`/api/polls/${POLL_INDEX}`, (data) => {
        if (data.filter((x) => x.votes > 0).length) {
            totalVotes = data.reduce((acc, d) => {
                return acc + d.votes;
            }, 0);
            color.domain(shuffle(data.map((d) => d.option)));
            const arc = g.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                    .attr("class", "arc");

            arc.append("path")
                .attr("d", path)
                .attr("fill", (d) => color(d.data.option))
                .on("mouseover", (d) => {
                    textArea.style("display", "")
                        .attr("transform", `translate(${offset(d3.mouse(document.getElementById("pollResults")), 25, 25, true)})`);
                    text.html(`<tspan x="0" dy="0em">Option: ${d.data.option}</tspan>
                               <tspan x="0" dy="1.2em">Votes: ${d.data.votes}</tspan>
                               <tspan x="0" dy="1.2em">Percentage: ${d3.format(".2%")(d.data.votes / totalVotes)}</tspan>`);
                })
                .on("mouseout", (d) => {
                    textArea.style("display", "none");
                });

            arc.append("text")
                .attr("transform", (d) => `translate(${offset(label.centroid(d), d.endAngle > Math.PI ? 25 : -15, 0, false)})`)
                .attr("dy", "0.15em")
                .text((d) => d.data.votes ? d.data.option : "");
        } else {
            $("body").append("<p>No one has voted yet.</p>");
        }
    });
});

function offset(arr, x, y, b) {
    arr[0] += x;
    arr[1] += y;

    if (b) {
        if (arr[0] + 150 > 400) {
            arr[0] -= 200;
        }
        if (arr[1] + 100 > 400) {
            arr[1] -= 150;
        }
    }
    return arr;
}

function boxPath(w, h, r, x, y) {
  return `M${[x,y]} h${w} a${[r,r]} 0 0 1 ${[r,r]} v${h} a${[r,r]} 0 0 1 ${[-r,r]} h${-w} a${[r,r]} 0 0 1 ${[-r,-r]} v${-h} a${[r,r]} 0 0 1 ${[r,-r]} z`;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
