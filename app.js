// Assignment approach: 
// i) create barchart() then bubblechart() then metadata table,
// ii) create dropdown(this.value), 
// iii) connect charts to dropdown;

// Connect to data sample.json file and use GoLive Server to comply with CORS policy
// d3.json("samples.json").then(function(data) {
//   samples = data.samples
//   console.log(samples[0].id)
//   console.log(samples[0].otu_ids)
//   console.log(samples[0].sample_values)
// })

// Creating function barchart()
function create_barchart(x) {
    d3.json("samples.json").then(function (data) {
        samples = data.samples
        filtered_data = samples.filter(value => value.id === x)

        console.log(filtered_data)

        otu_ids = filtered_data[0].otu_ids
        otu_ids = otu_ids.map(x => `OTU ${x}`)

        console.log(otu_ids)

        var tracebar = 
            {
                y: otu_ids.slice(0, 10),
                x: filtered_data[0].sample_values.slice(0, 10),
                type: 'bar',
                orientation: 'h',
                text: filtered_data[0].otu_labels.slice(0, 10),
            };
        var bardata = [tracebar]
        var barlayout = {
            title: 'Top 10 OTUs Found in Subject ID',
            showlegend: false,
            height: 400,
            width: 500
        };
        Plotly.newPlot('bar', bardata, barlayout);

        var tracebubble =
        {
            y: filtered_data[0].sample_values.slice(0, 10),
            x: filtered_data[0].otu_ids.slice(0, 10),
            text: otu_ids.slice(0, 10),
            mode: 'markers',
            marker: 
            {
                size: filtered_data[0].sample_values.slice(0, 10),
                color: filtered_data[0].otu_ids.slice(0, 10)
            },
            text: filtered_data[0].otu_labels.slice(0, 10)
        };
        var bubbledata = [tracebubble]
        var layout = {
            title: 'Top 10 OTUs Found in Test Subject ID No, Selected',
            showlegend: false,
            height: 600,
            width: 1200
        };
        Plotly.newPlot('bubble', bubbledata, layout);

    })
}

function populate_selecttag() {
    d3.json("samples.json").then(function (data) {
        samples = data.samples
        otu_ids = samples.map(x => x.id)
        select_tag = d3.select("#selDataset")
        for (var i = 0; i < otu_ids.length; i++) {
            select_tag.append("option")
                .text(otu_ids[i])
                .property("value", otu_ids[i])
        }
    })
}
populate_selecttag()

function optionChanged(x) {
    create_barchart(x)
} 