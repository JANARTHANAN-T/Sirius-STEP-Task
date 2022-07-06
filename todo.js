let todo=prompt("What do you want to do").toLowerCase();
const todos=['hiii','jhjjj'];
while(todo!=="quit"){
    if(todo==="new"){
        let new_todo=prompt("Enter a todo");
        todos.push(new_todo);
        console.log(`${new_todo} is added to the list`)
    }
    else if(todo=="list"){
        console.log("***********");
        for(let i=0;i<todos.length;i++){
            console.log(`${i} ${todos[i]}`);
        }
        console.log("***********");
    }
    else if(todo==="delete"){
        let index=prompt("enter the index of string to be deleted");
        const deleted=todos.splice(index,1);
        console.log(`Deleted todo ${deleted}`);
    }
    todo=prompt("What do you want to do").toLowerCase();
}
console.log("You have quit");