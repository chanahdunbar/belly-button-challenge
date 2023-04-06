// Use the D3 library to read in samples.json from URL
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data) {
    console.log(data)
})

// Dropdown Portion
function init() {
    d3.json(url).then(function(data) {
        let dropdown = d3.select("#selDataset");
        let names = data.names;
        names.forEach((id)=>{
            console.log(id);
            dropdown.append('option').text(id).property('value', id);
        });

        let sampleReset = names[0];
        console.log(sampleReset);

        buildMetadata(sampleReset)
        buildBar(sampleReset)
        buildBubble(sampleReset)
    })
};

function buildMetadata(sampId) {
    d3.json(url).then(function(data) {
        let metadata2 = data.metadata;
        let value = metadata2.filter(result => result.id == sampId);
        console.log(value)
        let firstValue = value[0]
        
        d3.select('#sample-metadata').html('');
        Object.entries(kvPair).forEach(([key, value])=> {
            console.log(key, value);
            d3.select('#sample-metadata').append('h5').text('${key}: ${values}');
        });
    });
}

function buildBar(sampId) {
    d3.json(url).then(function(data) {
        let sample2 = data.samples;
        let value = sample2.filter(result => result.id == sampId);
        let firstValue = value[0]

        let otu_ids = firstValue.otu_ids;
        let otu_labels = firstValue.otu_labels;
        let sample_values = firstValue.sample_values;
        console.log(otu_ids, otu_labels, sample_values);

        var trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(id => 'OTU ${id}').reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'};

        var layout = {
            title: 'Top 10 OTUs'
        };

        var data = [trace1]
        Plotly.newPlot('bar', data, layout);
    });
 }

 function buildBubble(sampId) {
    d3.json(url).then(function(data) {
        let sample2 = data.samples;
        let value = sample2.filter(result => result.id == sampId);
        let firstValue = value[0];

        let otu_ids = firstValue.otu_ids;
        let otu_labels = firstValue.otu_labels;
        let sample_values = firstValue.sample_values;

        let trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        }
        var layout = {
            xaxis:{title: 'OTU ID'},
            hovermode: 'closest'
        };

        var data = [trace2]
        Plotly.newPlot('bubble', data, layout)
    })
 }

 function optionChanged(updatedSamp) {
    buildBar(updatedSamp)
    buildBubble(updatedSamp)
    buildMetadata(updatedSamp)
 }

 init();
