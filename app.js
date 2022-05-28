//Connect all using a dropdown
//function barchart()
//function bublechart
//function Metadata
//function looksdropdown(this.value)
// {
// barchart(this.value)
// bublechart(this.value)
// Metadata(this.value)
// }

// d3.json("samples.json").then(function(data) {
//   samples = data.samples
//   console.log(samples[0].id)
//   console.log(samples[0].otu_ids)
//   console.log(samples[0].sample_values)


//function barchart()
function create_barchart(x) {
    d3.json("samples.json").then(function (data) {
        samples = data.samples
        filtered_data = samples.filter(value => value.id === x)

        console.log(filtered_data)

        otu_ids = filtered_data[0].otu_ids
        otu_ids = otu_ids.map(x => `OTU ${x}`)

        console.log(otu_ids)

        var data = [
            {
                y: otu_ids.slice(0, 10),
                x: filtered_data[0].sample_values.slice(0, 10),
                type: 'bar',
                orientation: 'h',
            },
        ];
        Plotly.newPlot('bar', data);
    })
}

//function bublechart()
// function create_barchart(x) {
//     d3.json("samples.json").then(function (data) {
//         samples = data.samples
//         filtered_data = samples.filter(value => value.id === x)

//         console.log(filtered_data)

//         otu_ids = filtered_data[0].otu_ids
//         otu_ids = otu_ids.map(x => `OTU ${x}`)

//         console.log(otu_ids)

//         var trace1 = {
//             y: filtered_data[0].sample_values.slice(0, 10),
//             x: filtered_data[0].otu_ids.slice(0, 10),
//             text: otu_ids.slice(0, 10),
//             mode: 'markers',
//             marker: {
//                 size: filtered_data[0].sample_values.slice(0, 10)
//             }
//             var data = [trace1]
//             var layout = {
//                 title: 'Marker Size',
//                 showlegend: false,
//                 height: 600,
//                 width: 600
//             };
//             Plotly.newPlot('bubble', data, layout);
//         };
//     })
// }


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