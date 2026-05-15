

var def_a = 1.4;
declareattribute("def_a",
  { type: "float", min: 0.5, max: 1.5, default: 1.4 });

var def_octave = 3;
declareattribute("def_octave",
  { type: "long", min: 1, max: 6, default: 3 });

var def_maxstep = 16;
declareattribute("def_maxstep",
  { type: "long", min: 1, max: 64, default: 16 });

function msg_dictionary({ clip, scale, grid }) {
 
  const notes = [];
  let pitch = 60;
  let base_pitch = (1 + def_octave) * 12;
  let duration = grid.interval;
  
  let i = 0;
  
  let scale_notes = [];
 
  
  let len_scale =scale.scale_intervals.length;
  
  while (i < len_scale){
      // post("\n i, base, root, intervals: ", i, base_pitch, scale.root_note, scale.scale_intervals);
      scale_notes[i] = base_pitch + scale.root_note + scale.scale_intervals[i];
      i+=1;
      }
   
  // post("\n Notes: ", scale_notes);

  let a = def_a;
  let b = 0.3;
  let x = 0;
  let y = 0;
  let xold = 0;
  let yold = 0;

   
  let start_time = clip.time_selection_start;
  
  i = 0;

  while (start_time < clip.time_selection_end) {
    
    if (i == def_maxstep){
        i = 0;
        yold = 0;
        xold = 0;
    }

   i+=1;
   
   x = 1 + yold - a * xold * xold;
   y = b * xold;
    
   xold = x;
   yold = y;
   
   let sel_note = (x + 2) * 0.25 * len_scale;
   sel_note = Math.round(sel_note);
   
   pitch = scale_notes[sel_note];  
    
   
    notes.push({
      pitch,
      start_time,
      duration,
    });
    start_time += grid.interval;
  }

  outlet_dictionary(0, { notes });
}