"use strict";

var lastDeletedItem;

window.onload=function() {
    lastDeletedItem = null;

    const list = document.querySelector('.taskList');
    list.addEventListener('click', function(event) {
      if (event.target.tagName === 'LI') {
        let taskList = document.getElementById("doneTasks")
        event.target.classList.toggle('clicked');
        const dt = new Date();
        const dateElement = document.createElement('li');
        let taskName = event.target.textContent;
        taskName = taskName.substring(0, taskName.length-1)

        if(event.target.classList.contains('clicked')){
            dateElement.innerHTML = "Task \"" + taskName + "\" done at " + dt.toLocaleString();
            dateElement.classList.add("completion-date");
        } else {
            dateElement.innerHTML = "Task \"" + taskName + "\" restared at " + dt.toLocaleString();
            
        }

        taskList.appendChild(dateElement);
      }
    }, false);

 }

const undoDelete = () => {
    if (lastDeletedItem !== null){
        lastDeletedItem.style.display = "block"
    }

}


const newTask = () => {

    const newListElement = document.createElement("li");
    newListElement.classList.add("mainList")
    const inputValue = document.getElementById("taskInput").value;
    const text = document.createTextNode(inputValue);
    newListElement.appendChild(text);

    if (inputValue === '') {
      alert("Text box can't be empty");
    } else {
      document.getElementById("taskList").appendChild(newListElement);
    }

    document.getElementById("taskInput").value = "";

    
    $(".mainList").append($('<span/>',{html:'\u00D7', class:'close'}));

    let i = 0;
    for (i = 0; i < document.getElementsByClassName("close").length; i++) {
        document.getElementsByClassName("close")[i].onclick = function() {
            const div = this.parentElement;
            $("#modal").fadeIn("medium");
    
            $(".noButton").click(function (){
                $("#modal").fadeOut("medium");
            });
    
            $(".yesButton").click(function(){
                div.style.display = "none";
                lastDeletedItem = div;
                $("#modal").fadeOut("medium");
            })
        }
    }
} 