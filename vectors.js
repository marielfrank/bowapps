
var trainingDocs = [];
var trainingCounts = {};
var testCounts = {};
var userInput = "";

function setup(){
  addToTrainingDocs("Five fantastic fish flew off to find faraway functions.")
  addToTrainingDocs("Maybe find another five fantastic fish?")
  updateTrainingDisplay()
}

function updateTrainingDisplay(){
  $(".vectorCounts").empty()
  $(".vectorWords").empty()

  var nchild = 0

  for(key in trainingCounts){
    var keyBlock = $("<span class='trainingWord'>"+key+"</span>")
    $(".vectorWords").append(keyBlock)    

    if(key in testCounts){
      var countBlock = $("<span class='vectorCount'>"+testCounts[key]+"</span>")
    }
    else{
      var countBlock = $("<span class='vectorCount'>0</span>")
    }
    $(".vectorCounts").append(countBlock);

    countBlock.offset({left: $(".trainingWord").eq(nchild).offset().left});

    nchild = nchild + 1
  }
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

function createTrainingCounts(){
  trainingCounts = {};
  trainingDocs.forEach(function(doc){
    var words = doc.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase().split(/\s/);
    words.forEach(function(w) {
      if (!trainingCounts[w]) {
        trainingCounts[w] = 0;
      }
      trainingCounts[w] += 1;
    });
  })
}

function createTestCounts(){
  testCounts = {};

  var words = userInput.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase().split(/\s/);
  words.forEach(function(w) {
    if (!testCounts[w]) {
      testCounts[w] = 0;
    }
    testCounts[w] += 1;
  });
}

function addToTrainingDocs(doc){
  trainingDocs.push(doc)
  var trainingSentence = $("<div class='trainingDoc' data-text='"+doc+"'><span>"+doc+"</span><button class='remove' data-doc='"+doc+"'>X</button></></div>")
  $(".trainingText").prepend(trainingSentence)
  createTrainingCounts()
}

$(document).ready(function(){
  setup();

  $(".submit").on('click',function(){
    userInput = $(".userInput").val()
    createTestCounts()
    updateTrainingDisplay()
  })

  $(".add").on('click',function(){
    var trainDoc = $(".trainingInput").val()
    addToTrainingDocs(trainDoc)
    updateTrainingDisplay()
  })

  $(".remove").on('click', function(){
    var docToRemove = $(this).attr("data-doc")
    var toRemove = $("div").find("[data-text='" + docToRemove + "']"); 
    toRemove.remove()
    trainingDocs.pop(trainingDocs.indexOf(docToRemove));
    createTrainingCounts()
    updateTrainingDisplay()
  })
})
