const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

function merge(...objects) {
    const result = {}

    for (const currentObject of objects) {
        if (currentObject && typeof currentObject === 'object') { // Ваша оригинальная проверка
            for (const key in currentObject) {
                if (!result.hasOwnProperty(key)) {
                    result[key] = currentObject[key];
                }
            }
        }
    }

    return result
}


async function getUserInputAndMerge() {
    const rl = readline.createInterface({ input, output });
    const objectsToMerge = [];

    console.log("--- Ввод объектов для объединения ---");

    try {
        const numObjectsStr = await rl.question('Сколько объектов вы хотите объединить? ');
        const numObjects = parseInt(numObjectsStr, 10);

        if (isNaN(numObjects) || numObjects <= 0) {
            console.log("Некорректное количество объектов. Введите положительное число.");
            if (numObjects === 0) {
                const mergedResult = merge(...objectsToMerge);
                console.log("\nРезультат объединения (0 объектов):");
                console.log(mergedResult);
            }
            return;
        }

        for (let i = 0; i < numObjects; i++) {
            const jsonString = await rl.question(`Введите объект ${i + 1} в формате JSON (например, {"a": 1, "b": "hello"}): `);
            try {
                const obj = JSON.parse(jsonString);
                if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                    objectsToMerge.push(obj);
                } else {
                    console.log(`Ввод для объекта ${i + 1} не является корректным JSON-объектом (это может быть массив, null или примитив). Пропускаем.`);
                }
            } catch (error) {
                console.error(`Ошибка парсинга JSON для объекта ${i + 1}: ${error.message}. Этот объект будет пропущен.`);
            }
        }

        if (objectsToMerge.length > 0) {
            const mergedResult = merge(...objectsToMerge);
            console.log("\nРезультат объединения введенных объектов:");
            console.log(mergedResult);
        } else if (numObjects > 0) { // Если ожидали объекты, но ни одного корректного не ввели
            console.log("\nНе было введено корректных объектов для объединения.");
            const mergedResult = merge(); // Вызовем merge() для консистентности, вернет {}
            console.log("Результат merge() без аргументов:", mergedResult);
        }

    } catch (error) {
        console.error("Произошла ошибка во время процесса ввода:", error);
    } finally {
        rl.close();
        runOriginalExamples();
    }
}

function runOriginalExamples() {
    console.log("\n--- Примеры работы функции merge---");
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

    const merged7 = merge({ a: 1 }, null, { b: 2 }, undefined, "строка", { a: 3, c: 4 });
    console.log("Пример 7 (с null/undefined/string):", merged7);
}


getUserInputAndMerge();