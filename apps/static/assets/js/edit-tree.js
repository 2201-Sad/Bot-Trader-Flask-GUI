import {tree} from "./print-tree.js";
import {printTree} from "./print-tree.js";

export function editTree() {
    let editButtons = document.querySelectorAll(".edit-button");
    let editedTree = tree

    //deleting the branch
    let deleteButtons = document.querySelectorAll(".delete-button");
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i];
        button.addEventListener("click", function () {
            let branchId = button.classList[1];
            if(branchId === editedTree["child"]["id"]) {
                let deleteTreeConfirm = confirm("Would you like to delete the tree?");
                if (deleteTreeConfirm === true) {
                    deleteTree(editedTree["id"]);
                    }
                } else {
                let deleteBranchConfirm = confirm("Delete the branch with all children?");
                if (deleteBranchConfirm === true) {
                    deleteBranch(editedTree, editedTree["child"], branchId);
                }
            }
        })
    }

    //adding a child
    let addButtons = document.querySelectorAll(".add-button");
    for (let i = 0; i < addButtons.length; i++) {
        let button = addButtons[i];
        button.addEventListener("click", function () {
            modalForm(editedTree, editedTree["child"], this.classList[1]);
        });
    }

    //when edit/save button is clicked
    for (let i = 0; i < editButtons.length; i++) {
        let button = editButtons[i];

        button.addEventListener("click", function () {
            let editedInputs = this.parentElement.parentElement.querySelectorAll(".schema-path-input, .schema-operation-input");
            let editedDropdown = this.parentElement.parentElement.querySelectorAll("select");
            //if editing is not in progress
            if (!this.classList.contains("save_button")) {
                this.classList.add("save_button");
                changeState(1, this, editedInputs, editedDropdown);
            } else {
                //if editing is in progress - saving the results
                let editConfirm = confirm("Save the changes?");
                if (editConfirm === true) {
                    //saving input data
                    let branchId = this.classList[0]
                    saveBranch(editedTree, editedTree["child"], branchId, editedInputs, editedDropdown);


                    let treeView = document.querySelector(".tree-view")
                    removeAndPrint(treeView, editedTree);
                }
            }
        })
    }
}


function saveBranch(tree, root, branchID, editedInputs, editedDropdowns) {
        let discriminatorInput = editedDropdowns[0];
        let operationInput;
        let pathInput;
        for (let input of editedInputs) {
            if (input.classList.contains("schema-operation-input")) {
                operationInput = input;
            } else if (input.classList.contains("schema-path-input")) {
                pathInput = input;
            }
        }

        if (root["children"].length > 0) {
         if (root["id"] === branchID) {
                root["discriminator"] = discriminatorInput.value;
                return tree;
         }
        for (let child of root["children"]) {
            if (child["id"] === branchID) {
                if (child["discriminator"] === "schema") {
                    child["operation"] = operationInput.value;
                    child["discriminator"] = discriminatorInput.value;
                    child["schema_path"] = pathInput.value;
                } else {
                    child["discriminator"] = discriminatorInput.value;
                }
                break;
            } else {
                saveBranch(tree, child, branchID, editedInputs, editedDropdowns)
            }
        }
    }
    return tree;
    }


function removeAndPrint(treeView, newTree) {
    //removing the old tree
    while (treeView.childNodes.length > 1) {
       for (let child of treeView.childNodes) {
         if (child.id !== "root") {
              treeView.removeChild(child);
          }
        }
    }
    // Printing a new tree
    printTree(newTree);
    editTree();
}


function deleteBranch(tree, root, branchID) {
    if (root["children"].length > 0) {
         if (root["id"] === branchID) {
         }
        for (let child of root["children"]) {
            if (child["id"] === branchID) {
                let childIndex = root["children"].indexOf(child);
                root["children"].splice(childIndex, 1);
                let treeView = document.querySelector(".tree-view")
                removeAndPrint(treeView, tree);
                break;
            } else {
                deleteBranch(tree, child, branchID)
            }
        }}
}

function deleteTree(treeTitle) {
    console.log(treeTitle + " is deleted")
}

function modalForm(tree, root, parentID) {
    console.log("modal triggered")
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
    modal.style.display = "none";
    }

    let newBranchTypeInput = document.querySelector("#branch-type");
    let modalSubmit = document.querySelector("#modal-submit");
    newBranchTypeInput.addEventListener("change", function() {
        if (this.value === "schema") {
            document.querySelector("#schema-form").style.display = "block";
        } else {
            document.querySelector("#schema-form").style.display = "none"
        }
    })

    modalSubmit.addEventListener("click", function () {
        addBranch(tree, root, parentID, newBranchTypeInput.value, null, null)
        modal.style.display = "none";
    })


}


function addBranch(tree, root, parentID, branchType, newSchemaPath, newOperation) {
    let treeView = document.querySelector(".tree-view")
    let newBranch = {
        "children": [],
        "discriminant": null,
        "discriminator": branchType,
        //@TODO: automatically assigning ID to the new branch
        "id": "765544332",
        "operation": newOperation,
        "schema_path": newSchemaPath,
    }
    console.log(parentID)

    if (root["children"].length > 0) {
        for (let child of root["children"]) {
            if (child["id"] === parentID) {
                console.log("parent found")
                child["children"].push(newBranch);
                removeAndPrint(treeView, tree);
                break;
            } else {
                addBranch(tree, child, parentID, branchType, newSchemaPath, newOperation)
            }
        }}

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

    for (let branchInput of inputs) {
        branchInput.disabled = states[toState]["inputsDisabled"];
    }

    if (toState === 0) {
        button.classList.remove("save_button");
    } else if (toState === 1) {
        button.classList.add("save_button");
    }
}


