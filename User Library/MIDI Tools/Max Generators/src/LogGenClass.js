
class LogGenScale {

  constructor(init_r, init_x0, init_octave, init_maxstep, init_durrat, init_fillrat) {
    this.octave = init_octave;
    this.r = init_r;
    this.x0 = init_x0;
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

  logmapStep(xold) {
    const x = this.r * xold * (1 - xold);
    post(`x: ${x}\n`);
    return { x };
  }

  generateNotes({ clip, scale, grid }) {
    const notes = [];
    const scaleNotes = this.buildScaleNotes(scale);
    const lenScale = scaleNotes.length;
    let startTime = clip.time_selection_start;
    let xold = this.x0;
  
    let step = 0;

    while (startTime < clip.time_selection_end) {
      if (step === this.maxstep) {
        step = 0;
        xold = this.x0;
        
      }

      const { x} = this.logmapStep(xold);
      xold = x;
      

      const selIndex = Math.max(
        0,
        Math.min(lenScale - 1, Math.round(x * lenScale))
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
