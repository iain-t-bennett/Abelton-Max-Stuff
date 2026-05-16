require("Math");

var def_a = 1.4;
declareattribute("def_a",
  { type: "float", min: 1, max: 2, default: 1.4 });

var def_octave = 3;
declareattribute("def_octave",
  { type: "long", min: 1, max: 7, default: 3 });

function msg_dictionary({ clip, scale, grid }) {
 
  const notes = [];
  let pitch = 1;
  let base_pitch = 12 * (def_octave + 1);
  let duration = grid.interval;
  base_pitch = base_pitch + scale.root_note;
  
  let i = 0;
  
  let scale_notes = scale.scale_intervals;
 
  
  let len_scale =scale_notes.length;
  
  while (i < len_scale){
      scale_notes[i] = scale_notes[i] + base_pitch;
      i+=1;
      }

  let a = def_a;
  let b = 0.3;
  let x = 0;
  let y = 0;
  let xold = 0;
  let yold = 0;

  let start_time = clip.time_selection_start;
  while (start_time < clip.time_selection_end) {
    
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