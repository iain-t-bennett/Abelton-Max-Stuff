include("./src/LogGenClass.js");

// config for the M4L patch

def_r = 3;
def_x0 = 0.5;
def_octave = 3;
def_maxstep = 16;
def_durrat = 1;
def_fillrat = 1;

declareattribute("def_r", {
      type: "float",
      min: 0,
      max: 4,
      default: 3,
    });
declareattribute("def_x0", {
      type: "float",
      min: 0,
      max: 1,
      default: 0.5,
    });
    
declareattribute("def_octave", {
      type: "long",
      min: 1,
      max: 6,
      default: 3,
    });

declareattribute("def_maxstep", {
      type: "long",
      min: 1,
      max: 64,
      default: 16,
    });

declareattribute("def_fillrat", {
      type: "long",
      min: 1,
      max: 8,
      default: 1,
    });

declareattribute("def_durrat", {
      type: "long",
      min: 1,
      max: 8,
      default: 1,
    });

// message handler
// triggered by a bang 


function msg_dictionary(message) {
    const myGen = new LogGenScale(
        def_r,
        def_x0,
        def_octave,
        def_maxstep,
        def_durrat,
        def_fillrat
    );
    const notes = myGen.generateNotes(message);
    outlet_dictionary(0, { notes });
  }