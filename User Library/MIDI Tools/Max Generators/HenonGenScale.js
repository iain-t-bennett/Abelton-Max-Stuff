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


class HenonGen {

  constructor(init_a, init_octave, init_maxstep, init_durrat, init_fillrat) {
    this.octave = init_octave;
    this.a = init_a;
    this.maxstep = init_maxstep;
    this.durrat = init_durrat;
    this.fillrat = init_fillrat;
  }  

  buildScaleNotes(scale) {
    const basePitch = (1 + this.octave) * 12;
    return scale.scale_intervals.map(
      (interval) => basePitch + scale.root_note + interval
    );
  }

  henonStep(xold, yold) {
    const x = 1 + yold - this.a * xold * xold;
    const y = 0.3 * xold;
    return { x, y };
  }

  generateNotes({ clip, scale, grid }) {
    const notes = [];
    const scaleNotes = this.buildScaleNotes(scale);
    const lenScale = scaleNotes.length;
    let startTime = clip.time_selection_start;
    let xold = 0;
    let yold = 0;
    let step = 0;

    while (startTime < clip.time_selection_end) {
      if (step === this.maxstep) {
        step = 0;
        xold = 0;
        yold = 0;
      }

      const { x, y } = this.henonStep(xold, yold);
      xold = x;
      yold = y;

      const selIndex = Math.max(
        0,
        Math.min(lenScale - 1, Math.round(((x + 2) * 0.25 * lenScale)))
      );

      notes.push({
        pitch: scaleNotes[selIndex],
        start_time: startTime,
        duration: grid.interval * this.durrat,
      });

      startTime += grid.interval*this.fillrat;
      step += 1;
    }

    return notes;
  }

  
}



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