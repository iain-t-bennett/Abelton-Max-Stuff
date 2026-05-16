
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
