//separate all the outputs so that they can referred to by name and assigned configurations
//switches keyboard to function mode to control:
    //first sixteen keys to turn off or on steps
    //must work no matter what octave keys are in.

class WorldeSampler {
   constructor(rawMidi){
        this.rawMidi = rawMidi;
        
   }
   printMidi(){
        console.log('this.rawMidi', this.rawMidi)
   }
}