import Observable from '../lib/Observable';
import LightData from './LightData';
import LightInstruction from '../lib/LightInstruction';

export default class Light extends Observable {
    constructor(id, broker) {
        if (!id) {
            throw new Error('Light requires an ID');
        }

        super();
        this.lightData = new LightData(id);
        this.address = `/${id}`;
        this.broker = broker
    }

    update(update = {}) {
        this.lightData = Object.assign(
            new LightData(this.getId()),
            this.lightData,
            update);

        this.broker.publish(this.address, this.getInstruction());

        this.emit('LIGHT_UPDATE', this);
    }


    getData() {
        let object = Object.assign({}, this.lightData);
        return object;
    }

    getId() {
        return this.lightData.id;
    }


    getInstruction() {
        let instruction = '';

        switch(this.lightData.status){
            case 1:
                break;
            case 2:
                break;
            default:
                break;
        }

        if (this.lightData.status == 1) {
            const lightData = this.getData();
            instruction = LightInstruction.animate(lightData.data, lightData.fps, lightData.loop);
        } else if (this.lightData.status == 2) {
            instruction = LightInstruction.pause();
        } else {
            instruction = LightInstruction.off();
        }

        return instruction;
    }

    getLastSeen() {
        return this.lightData.lastSeen;
    }

    setLastSeen(date, memory, status) {
        const update = {
            lastSeen: date,
            memory: memory,
            status: status
        };

        this.lightData = Object.assign(
            new LightData(this.getId()),
            this.lightData,
            update);

        this.emit('LIGHT_UPDATE', this);
    }

}
