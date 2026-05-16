include("./src/LogGenClass.js");


// config for the M4L patch

def_r0 = 3.5;
def_r1 = 3.6;
def_r2 = 3.9;
def_r3 = 3.2;

def_note0 = 36;
def_note1 = 37;
def_note2 = 38;
def_note3 = 39;

def_thresh0 = 0.6;
def_thresh1 = 0.6;
def_thresh2 = 0.6;
def_thresh3 = 0.6;

declareattribute("def_r0", {
      type: "float",
      min: 0,
      max: 4,
      default: 3.5,
    });

declareattribute("def_r1", {
      type: "float",
      min: 0,
      max: 4,
      default: 2,
    });

declareattribute("def_r2", {
      type: "float",    
      min: 0,
      max: 4,
      default: 1,
    });

declareattribute("def_r3", {
      type: "float",
      min: 0,
      max: 4,
      default: 4,
    }); 

    declareattribute("def_thresh0", {
      type: "float",
      min: 0,
      max: 1,
      default: 0.5,
    });

    declareattribute("def_thresh1", {
      type: "float",
      min: 0,
      max: 1,
      default: 0.5,
    });

    declareattribute("def_thresh2", {
      type: "float",
      min: 0,
      max: 1,
      default: 0.5,
    });
    
    declareattribute("def_thresh3", {
      type: "float",
      min: 0,
      max: 1,
      default: 0.5,
    });


declareattribute("def_note0", {
      type: "int",
      min: 0,
      max: 127,
      default: 32,
    });

declareattribute("def_note1", {
      type: "int",
      min: 0,
      max: 127,
      default: 33,
    });

    declareattribute("def_note2", {
      type: "int",
      min: 0,
      max: 127,
      default: 34,
    });

    declareattribute("def_note3", {
      type: "int",
      min: 0,
      max: 127,
      default: 35,
    });


// message handler
// triggered by a bang

function msg_dictionary(message) {
    const myGen = new LogGenBeat();
    notes = [];
    // note 1
    myGen.reinit(def_r0, def_note0, def_thresh0);
    notes = myGen.generateNotes(message);      

    // note 2
    myGen.reinit(def_r1, def_note1, def_thresh1);
    new_notes = myGen.generateNotes(message);
    notes.push(...new_notes);

    // note 3
    myGen.reinit(def_r2, def_note2, def_thresh2);
    new_notes = myGen.generateNotes(message);
    notes.push(...new_notes);

    // note 4
    myGen.reinit(def_r3, def_note3, def_thresh3);
    new_notes = myGen.generateNotes(message);
    notes.push(...new_notes);
    
    //notes.push(myGen.generateNotes(message));
     outlet_dictionary(0, { notes });
  }