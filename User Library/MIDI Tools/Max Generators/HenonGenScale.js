include("./src/HenonGenClass.js");

// config for the M4L patch

def_a = 1.4;
def_octave = 3;
def_maxstep = 16;
def_durrat = 1;
def_fillrat = 1;

declareattribute("def_a", {
      type: "float",
      min: 1,
      max: 1.5,
      default: 1.4,
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
    const henon = new HenonGen(
        def_a,
        def_octave,
        def_maxstep,
        def_durrat,
        def_fillrat
    );
    const notes = henon.generateNotes(message);
    outlet_dictionary(0, { notes });
  }