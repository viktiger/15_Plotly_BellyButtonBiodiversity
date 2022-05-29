// **Assignment approach:**
// i) create barchart() 
// ii) create bubblechart() 
// iii) create metadata table()
// iv) create dropdown(this.value), 
// v) connect charts and table to dropdown;
// vi) BONUS: create gauge chart()
// ---------------------------------------------------------------------------------------------------- //

// ---------------------------------------------------------------------------------------------------- //
// // Understanding dataset by connecting & printing data form sample.json file; Used GoLive Server to comply with CORS policy
// d3.json("samples.json").then(function (data) {
//     console.log(data)                     // All the data in the samples.json file

//     metadata = data.metadata
//     console.log(metadata[0].id)            // 1st set data in the samples.json file in the metadata array in the id dictionary
//     console.log(metadata[0].ethnicity)     // 1st set data in the samples.json file in the metadata array in the ethnicity dictionary

//     samples = data.samples
//     console.log(samples)                  // All the data in the samples.json file in the samples array
//     console.log(samples[0].id)            // 1st set data in the samples.json file in the samples array in the id dictionary
//     console.log(samples[0].otu_ids)       // 1st set data in the samples.json file in the samples array in the otu_ids dictionary
//     console.log(samples[0].sample_values) // 1st set data in the samples.json file in the samples array in the sample_values dictionary
// })
// ---------------------------------------------------------------------------------------------------- //

// ---------------------------------------------------------------------------------------------------- //
// iv) Populating the dropdown menu options
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
// ---------------------------------------------------------------------------------------------------- //

// ---------------------------------------------------------------------------------------------------- //
// i) & ii) Creating bar & bubble charts()
function create_charts(x) {
    d3.json("samples.json").then(function (data) {
        var samples = data.samples
        var filtered_data = samples.filter(value => value.id === x)

        console.log(filtered_data)

        otu_ids = filtered_data[0].otu_ids
        otu_ids = otu_ids.map(x => `OTU ${x}`)

        console.log(otu_ids)

        // Bar Chart - Create trace and Define Plot
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
            width: 400
        };
        Plotly.newPlot('bar', bardata, barlayout);

        // Bubble Chart - Create trace and Define Plot
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

    }) // Ends d3.json
} // Ends creating chart function
// ---------------------------------------------------------------------------------------------------- //

// ---------------------------------------------------------------------------------------------------- //
// iii) Creating Metadata Table()
function create_metatable(x) {
    d3.json("samples.json").then(function (data) {
        var metadata = data.metadata
        console.log(metadata)

        // filter meta data info by id
        var filtered_metadata = metadata.filter(meta => meta.id.toString() === x)[0];
        // select demographic panel to put data
        var metadatatable = d3.select("#sample-metadata");

        // empty the demographic info panel each time before getting new id info
        metadatatable.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(filtered_metadata).forEach((key) => {
            metadatatable.append("h5").text(key[0] + ": " + key[1] + "\n");
        });
    }); // Ends d3.json
} // Ends creating metadata table function
// ---------------------------------------------------------------------------------------------------- //

// ---------------------------------------------------------------------------------------------------- //
// // vi) BONUS: Creating Gauge Chart()
function create_gaugechart(id) {
    d3.json("samples.json").then(function (data) {
        // Filter for the selected ID
        var metadataSamples = data.metadata.filter(x => x.id === +id)[0];

        // Get the wash frequency for the current ID            
        var wFreq = metadataSamples.wfreq;
        var wFreqDeg = wFreq * 20;

        // Calculations for gauge pointer
        var degrees = 180 - wFreqDeg;
        var radius = 0.5;
        var x = radius * Math.cos(degrees * Math.PI / 180);
        var y = radius * Math.sin(degrees * Math.PI / 180);

        // Path for gauge pointer
        var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
        var mainPath = path1,
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);

        // Create trace for gauge plot
        var dataGauge = [
            {
                type: "scatter",
                x: [0],
                y: [0],
                marker: { size: 12, color: "850000" },
                showlegend: false,
                name: "Freq",
                text: wFreq,
                hoverinfo: "text+name"
            },
            {
                values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
                rotation: 90,
                text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
                textinfo: "text",
                textposition: "inside",
                marker: {
                    colors: [
                        "rgba(0, 105, 11, .5)",
                        "rgba(10, 120, 22, .5)",
                        "rgba(14, 127, 0, .5)",
                        "rgba(110, 154, 22, .5)",
                        "rgba(170, 202, 42, .5)",
                        "rgba(202, 209, 95, .5)",
                        "rgba(210, 206, 145, .5)",
                        "rgba(232, 226, 202, .5)",
                        "rgba(240, 230, 215, .5)",
                        "rgba(255, 255, 255, 0)"
                    ]
                },
                labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
                hoverinfo: "label",
                hole: 0.5,
                type: "pie",
                showlegend: false
            }
        ];
        // Create layout for gauge plot
        var layoutGauge = {
            shapes: [
                {
                    type: "path",
                    path: path,
                    fillcolor: "850000",
                    line: {
                        color: "850000"
                    }
                }
            ],
            title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
            // height: 500,
            // width: 500,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            }
        };
        var config = { responsive: true }

        // Plot the new gauge chart
        Plotly.newPlot('gauge', dataGauge, layoutGauge, config);

    }); // Ends d3.json
} // Ends creating metadata table function
// ---------------------------------------------------------------------------------------------------- //

// ---------------------------------------------------------------------------------------------------- //
// v) Connecting charts and table to dropdown; using x to denote test subject id number
function optionChanged(x) {
    create_charts(x)
    create_metatable(x)
    create_gaugechart(x)
} 