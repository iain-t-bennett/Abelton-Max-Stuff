# Abelton-Max-Stuff

Following tutorial at https://adammurray.link/max-for-live/v8-in-live/getting-started/

## HenonGenScale

Uses $x$ variable of a Henon map (https://en.wikipedia.org/wiki/H%C3%A9non_map) to generate a sequence of notes within a scale.

### Parameters exposed to ableton
$a$ - lower values tend to periodic, higher to aperiodic, default 1.4
$octave$ - value from 1 to 6 - default 3
$maxstep$ - value from 1 to 64 - defualt 16 - sets where pattern resets
### Parameters read from ableton
$scale$ - base note and relative increments 
$clip$ - length and grid/step size