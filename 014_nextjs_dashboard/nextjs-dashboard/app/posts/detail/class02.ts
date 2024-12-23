interface Animal {
    names: string; // 属性
    sounds: string; // 属性
    makeSounds(): void; // 方法
}

class Monkey implements Animal {
    private _names: string;

    constructor(name: string) {
        this._names = name;
    }

    // 实现 names 属性的 getter
    get names(): string {
        return this._names;
    }

    // 实现 sounds 属性的 getter
    get sounds(): string {
        return '吱吱吱!';
    }

    // 实现 makeSounds 方法
    makeSounds(): void {
        console.log(this.sounds);
    }
}

// 测试代码
const monkey = new Monkey('校长');
console.log(monkey.names); // 校长
monkey.makeSounds(); // 吱吱吱!