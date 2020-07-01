class MIDI{
    constructor(inputName, outputPort){
        this.inputName = inputName;
        this.outputPort = outputPort;
        this.allInputs = [];
        this.allOutputs = [];
        this.controllerMidi =[];
    }
    requestMIDIaccess(){
       
      
        //request midi from navigator object
            navigator.requestMIDIAccess()
        //use then to get promise from it, bind to this(reseach why this works, I just guessed)   
            .then(this.ifMIDIsucceeds.bind(this), this.ifMIDIFails)
    }
   
    ifMIDIsucceeds(access){
       
        this.getMIDIInputs(access);
        this.testMIDIOutputs(access);

       
        //from onstechage from it console log the events port: name, manufacturer, state  
            access.onstatechange = (e)=>{
                console.log(e.port.name, e.port.manufacturer, e.port.state);
            }
    }
    
    getMIDIInputs(access){
        //get inputs from it
        const inputs = access.inputs.values();
        //loop over midi access values, adding a listener to each that matches our desired controller
            for (let input of inputs){
            //callback for when message detected
                console.log("INPUT:",input.manufacturer, input.name);
                this.allOutputs.push(`${input.manufacturer}${input.name}`);
                
                if(input.name == this.inputName){
                   
                    input.onmidimessage = getMIDIMessage;
                }        
                   
            }
            
            function getMIDIMessage(midiMessage){
                console.log('midiData', midiMessage.data);
                //data is three values [noteOnOff, note#(1-127), velocity(1-127)]
                this.controllerMidi = midiMessage;
            } 
   }

   get controllerMidi(){
       return this.controllerMidi;
   }
   testMIDIOutputs(access){
         //get outputs from it
         const outputs = access.outputs.values();
         for (let output of outputs){
            console.log("OUTPUT:",output.manufacturer, output.name);
         }

         function sendMiddleC(portID) {
             let noteOn = [144, 53, 11];
             let noteOff = [128, 53, 0]    // note on, middle C, full velocity
             let output = access.outputs.get(portID);
             output.send( noteOn );  //omitting the timestamp means send immediately.
             output.send( noteOff, window.performance.now() + 1000.0 ); // Inlined array creation- note off, middle C,  
                                                                                 // release velocity = 64, timestamp = now + 1000ms.
           }
         sendMiddleC(this.outputPort);
        }
    ifMIDIFails(){
        console.log('Midi Failed');
    }

}