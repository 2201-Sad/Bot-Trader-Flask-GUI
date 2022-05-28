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


    //deleting the outcome
    let deleteOutcomeButtons = document.querySelectorAll(".delete-outcome-button");
    for (let i = 0; i < deleteOutcomeButtons.length; i++) {
        let button = deleteOutcomeButtons[i];
        button.addEventListener("click", function () {
            let outcomeID = button.classList[1];
            console.log(outcomeID)
                let deleteOutcomeConfirm = confirm("Delete the outcome?");
                if (deleteOutcomeConfirm === true) {
                    deleteOutcome(editedTree, editedTree["outcomes"], outcomeID);
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
            let editedInputs = this.parentElement.parentElement.querySelectorAll(".schema-path-input, .discriminant-input");
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
        let operationInput = editedDropdowns[1];
        let pathInput;
        let discriminantInput;
        for (let input of editedInputs) {
            if (input.classList.contains("discriminant-input")) {
                discriminantInput = input;
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
                if (child["discriminator"] === "SCHEMA" || child["discriminator"] === "TIME_SERIES") {
                    child["operation"] = operationInput.value;
                    child["discriminator"] = discriminatorInput.value;
                    child["discriminant"] = discriminantInput.value;
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
    let outcomesView = document.querySelector(".outcomes-view")
    //removing the old tree
    while (treeView.childNodes.length > 1) {
       for (let child of treeView.childNodes) {
         if (child.id !== "root") {
              treeView.removeChild(child);
          }
        }
    }

    while (outcomesView.childNodes.length > 0) {
       for (let outcome of outcomesView.childNodes) {
          outcomesView.removeChild(outcome);
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

function deleteOutcome(tree, outcomes, id) {
    for (let outcome of outcomes) {
            if (outcome["id"] === id) {
                let outcomeIndex = outcomes.indexOf(outcome);
                outcomes.splice(outcomeIndex, 1);
                let treeView = document.querySelector(".tree-view")
                removeAndPrint(treeView, tree);
                break;
            }
        }
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
    let newOperation = document.querySelector("#new-schema-operation");
    let newDiscriminant = document.querySelector("#new-discriminant");
    let newSchemaPath = document.querySelector("#new-schema-path");
    let modalSubmit = document.querySelector("#modal-submit");
    newBranchTypeInput.addEventListener("change", function() {
        if (this.value === "SCHEMA" || this.value === "TIME_SERIES") {
            document.querySelector("#schema-form").style.display = "block";
        } else {
            document.querySelector("#schema-form").style.display = "none"
        }
    })

    modalSubmit.addEventListener("click", function () {
        addBranch(tree, root, parentID, newBranchTypeInput.value, newSchemaPath.value, newOperation.value, newDiscriminant.value )
        modal.style.display = "none";
    })
}


function addBranch(tree, root, parentID, branchType, newSchemaPath, newOperation, newDiscriminant) {
    let treeView = document.querySelector(".tree-view")
    let newBranch = {
        "children": [],
        "discriminator": branchType,
        //@TODO: automatically assigning ID to the new branch
        "id": "765544332",
        "operation": newOperation,
        "schema_path": newSchemaPath,
        "discriminant": newDiscriminant
    }

    if (root["children"].length > 0) {
        for (let child of root["children"]) {
            if (child["id"] === parentID) {
                console.log("parent found")
                child["children"].push(newBranch);
                removeAndPrint(treeView, tree);
                break;
            } else {
                addBranch(tree, child, parentID, branchType, newSchemaPath, newOperation, newDiscriminant)
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