export default class Program {
    private data : number[];
    
    constructor(data: number[]) {
        this.data = data;
    }

    public read() : number[] {
        return this.data;
    }
}