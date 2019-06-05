function buildMetadata(sample) {
    var url='metadata/<sample>';
    d3.json(url).then(function(response){
    var data=response;
    var sampleData=d3.select("#sample-metadata");
    sample.html("");
    Object.entries(data).forEach(([key,value])=>{
        sample.append("s").text(`{key}:{value}`);
    });
    });
}

function buildCharts(sample) {
    var url='/samples/<sample>';
    d3.json(url).then(function(response){
      var xValues=response["otu_id"];
      var yValues=response["sample"];
      var bubble=document.getElementById('#bubble');
      var trace1={
        x: xValues,
        y:yValues,
        "type":"bubble", 
        mode:"markers",
        marker:{
          color:"otu_id",
          size:"sample_values"
          
        }
          
        
      }
      var data1=[trace1];
      Plotly.newplot(bubble, data1);
      
      var pie=document.getElementById('#pie');
      var trace2={
        labels=[xValues].splice(0,10),
        values=[yValues].splice(0,10),
        "type":"pie"
  
      }
      var data2=[trace2];
      Plotly.newplot(pie, data2);
    });
    
}

function init() { 
    var selector = d3.select("#selDataset");
  
    
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {7
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  

  init();
  