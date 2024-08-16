const { log } = require("console");
const fs = require("fs")

console.log(process.argv);

let [,,command]= process.argv;

if (command == "create") {
  let [, , , title] = process.argv;
  let todo = JSON.parse(fs.readFileSync("./todo.json", "utf8"));
  todo.push({ title: title });
  fs.writeFileSync("./todo.json", JSON.stringify(todo));
} else if (command == "list") {
  console.log(JSON.parse(fs.readFileSync("./todo.json", "utf8")));
} 
else if(command == "update"){
  let todo = JSON.parse(fs.readFileSync("./todo.json", "utf8"));
  let [, , , search] = process.argv;
  for(let i =0; i<todo.length; i++){
    if(todo[i].title == search){
     todo[i].title= process.argv[4];
    }
  }
  fs.writeFileSync("./todo.json", JSON.stringify(todo));
} else if(command=="delete"){
  let todo = JSON.parse(fs.readFileSync("./todo.json", "utf8"));
  let [, , , search] = process.argv;
  let new_todo=[];
  for(let i =0; i<todo.length; i++){
    if(!(todo[i].title == search)){
       new_todo.push(todo[i]);
    }
  }
  fs.writeFileSync("./todo.json", JSON.stringify(new_todo));
}
