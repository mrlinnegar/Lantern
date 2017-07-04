

export default class Observable {
   constructor(){
     this.observers = new Map();
   }

   addObserver(label, callback) {
     if(!this.observers.has(label)){
       this.observers.set(label, []);
     }

     this.observers.get(label).push(callback);
   }

   emit(label, event){
     const observers = this.observers.get(label);

     if(observers && observers.length) {
       observers.forEach((observer)=>{
         observer(event);
       });
     }
   }
}
