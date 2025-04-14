
function merge(...objects) {
    const result = {}

    for (const currentObject of objects) {
        if (currentObject && typeof currentObject === 'object') {
            for (const key in currentObject) {
                if (!result.hasOwnProperty(key)) {
                    result[key] = currentObject[key];
                }
            }
        }
    }

    return result
}

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { b: 4, d: 5 }; // 'b' уже есть в obj1
const obj3 = { a: 6, e: 7, f: 8 }; // 'a' уже есть в obj1

const merged1 = merge(obj1, obj2, obj3);
console.log("Пример 1:", merged1);

const merged2 = merge({ x: 'hello' }, { y: 'world' });
console.log("Пример 2:", merged2);

const merged3 = merge({ val: 10 }, { val: 20 }, { other: 30 });
console.log("Пример 3:", merged3);

const merged4 = merge({}, { a: 1 }, { b: 2 });
console.log("Пример 4:", merged4);

const merged5 = merge({ z: 100 });
console.log("Пример 5:", merged5);

const merged6 = merge();
console.log("Пример 6 (без аргументов):", merged6);

// Пример с null или другими типами (функция должна их игнорировать)
const merged7 = merge({ a: 1 }, null, { b: 2 }, undefined, "строка", { a: 3, c: 4 });
console.log("Пример 7 (с null/undefined/string):", merged7);