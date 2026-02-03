"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Pending"] = 0] = "Pending";
    TaskStatus[TaskStatus["Completed"] = 1] = "Completed";
})(TaskStatus || (TaskStatus = {}));
const tasks = [];
let id = 1;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function showMenu() {
    console.log(`
1. Add task
2. List tasks
3. Complete task
4. Completed tasks
5. Pending tasks
6. Exit
`);
}
function ask() {
    showMenu();
    rl.question("Choose: ", (choice) => {
        if (choice === "1") {
            rl.question("Title: ", (title) => {
                tasks.push({ id: id++, title, status: TaskStatus.Pending });
                console.log("Added");
                ask();
            });
        }
        else if (choice === "2") {
            if (tasks.length === 0) {
                console.log("No tasks");
            }
            else {
                tasks.forEach(t => console.log(`${t.id}. ${t.title} - ${TaskStatus[t.status]}`));
            }
            ask();
        }
        else if (choice === "3") {
            rl.question("Task id: ", (num) => {
                const task = tasks.find(t => t.id === Number(num));
                if (task) {
                    task.status = TaskStatus.Completed;
                    console.log("Completed");
                }
                else {
                    console.log("Not found");
                }
                ask();
            });
        }
        else if (choice === "4") {
            tasks
                .filter(t => t.status === TaskStatus.Completed)
                .forEach(t => console.log(`${t.id}. ${t.title}`));
            ask();
        }
        else if (choice === "5") {
            tasks
                .filter(t => t.status === TaskStatus.Pending)
                .forEach(t => console.log(`${t.id}. ${t.title}`));
            ask();
        }
        else if (choice === "6") {
            rl.close();
        }
        else {
            console.log("Invalid");
            ask();
        }
    });
}
ask();
