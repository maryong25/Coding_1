
// Create a new list item when clicking on the "Add" button
function newElement() {
    var ul = document.getElementById('ul'); //ul
    var li = document.createElement('li');//li
    var text = document.getElementById('texto');
    let count = 0;
    

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = "id";
    //checkbox.onclick = myFunction();
    //checkbox.checked= false;

    

    if (text.value === '') {
            alert("You must write something!");
        } else {
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(text.value));
            ul.appendChild(li); 

            count = +1;
            console.log (count);

    

        }

}







var button = document.getElementById('btn');
    button.onclick = newElement 




    





    




