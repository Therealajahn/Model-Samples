//initialize midi
    let midi = new MIDI("WORLDE   ","output-2");
    midi.requestMIDIaccess();
    //TODO: get midi data from MIDI to Worlde 
//organize Data from keyboard
    let worlde = new WorldeSampler(midi.controllerMidi);

