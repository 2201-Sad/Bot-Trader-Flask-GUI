import {tree} from "./print-tree.js";
import {branchClass} from "./branch-class.js";
// import {printTree} from "./print-tree.js";


let editButtons = document.querySelectorAll(".edit-button");
let deleteButtons = document.querySelectorAll(".delete-button");
let discriminatorSelects = document.querySelectorAll(".discriminator-select");
let editedTree = tree

//Changing discriminator of the branch
for (let i = 0; i < discriminatorSelects.length; i++) {
    let select = discriminatorSelects[i];
    let branchId = select.classList[1];
    select.addEventListener("change", changeDiscriminator(editedTree["child"], branchId, select.value));

}

function changeDiscriminator(root, branchID, newDiscriminator) {
    if (root["children"].length > 0) {
        for (let child of root["children"]) {
            if (child["id"] === branchID) {
                child.discriminator = newDiscriminator;
            } else {
                changeDiscriminator(child, branchID, newDiscriminator)
            }
        }
    }
}


// Edit - Save buttons
for (let i = 0; i < editButtons.length; i++) {
    let button = editButtons[i];

    button.addEventListener("click", function() {
        let editedInputs = this.parentElement.parentElement.querySelectorAll("input");
        let editedDropdown = this.parentElement.parentElement.querySelectorAll("select");
        //if editing is not in progress
        if (!this.classList.contains("save_button")) {
            this.classList.add("save_button");
            changeState (1, this, editedInputs, editedDropdown);
        } else {
        //if editing is in progress - saving the results
            let editConfirm = confirm("Save the changes?");
            if (editConfirm === true) {

                // Printing tree
                let treeView = document.querySelector(".tree-view")
                let root = new branchClass(editedTree["child"]["discriminant"],
                editedTree["child"]["discriminator"],
                editedTree["child"]["id"],
                editedTree["child"]["operation"],
                editedTree["child"]["schema_path"],
                editedTree["child"]["children"]);

                root.printBranch(treeView);
                root.printChildren();
                changeState(0, this, editedInputs, editedDropdown);
            }
        }

    });
}


function changeState(toState, button, inputs, dropdowns) {
    let states = [
        {
            "state": 0,
            "buttonText": "Edit Branch",
            "classAction": "remove",
            "inputsDisabled": true
        },
        {
            "state": 1,
            "buttonText": "Save Branch",
            "classAction": "add",
            "inputsDisabled": false
        }
    ]

    button.innerText = states[toState]["buttonText"]
    for (let branchInput of inputs) {
        if (!button.classList.contains("save_button")) {
            branchInput.disabled = states[toState]["inputsDisabled"];
        }
    }

    for (let branchSelect of dropdowns) {
        branchSelect.disabled = states[toState]["inputsDisabled"];
    }

    if (toState == 0) {
        button.classList.remove("save_button");
    } else if (toState == 1) {
        button.classList.add("save_button");
    }
}
