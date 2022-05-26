import {tree} from "./print-tree.js";
import {printTree} from "./print-tree.js";

export function editTree() {
    let editButtons = document.querySelectorAll(".edit-button");
    let discriminatorSelects = document.querySelectorAll(".discriminator-select");
    console.log(tree);
    let editedTree = tree

//     //changing discriminator
//     for (let i = 0; i < discriminatorSelects.length; i++) {
//         let select = discriminatorSelects[i];
//         let branchId = select.classList[1];
//         select.addEventListener("change", function() {
//             editedTree = changeDiscriminator(editedTree, editedTree["child"], branchId, select.value);
//             console.log(editedTree);
//         });
//
// }

    //deleting the branch
    let deleteButtons = document.querySelectorAll(".delete-button");
    console.log(deleteButtons)
    for (let i = 0; i < deleteButtons.length; i++) {
        let button = deleteButtons[i];
        button.addEventListener("click", function () {
            let branchId = button.classList[1];
            let editConfirm = confirm("Delete the branch with all children?");
            if (editConfirm === true) {
                deleteBranch(editedTree, editedTree["child"], branchId);
            }
        })
    }


    //when edit/save button is pressed
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

function saveBranch(tree, root, branchID, editedInputs, editedDropdowns) {
        let discriminatorInput = editedDropdowns[0];
        let operationInput;
        let pathInput;
        console.log(editedInputs)
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
                console.log("branch found")
                if (child["discriminator"] === "schema") {
                    console.log("schema branch identified")
                    child["operation"] = operationInput.value;
                    console.log(child["operation"]);
                    child["discriminator"] = discriminatorInput.value;
                    console.log(child["discriminator"]);
                    child["schema_path"] = pathInput.value;
                    console.log(child["schema_path"]);
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

// function changeDiscriminator(tree, root, branchID, newDiscriminator) {
//     if (root["children"].length > 0) {
//          if (root["id"] === branchID) {
//                 root["discriminator"] = newDiscriminator;
//                 return tree;
//          }
//         for (let child of root["children"]) {
//             if (child["id"] === branchID) {
//                 if (child["discriminator" === "schema"]) {
//                     child["operation"] = null;
//                     child["discriminant"] = null;
//                     child["schema_path"] = null;
//                 }
//
//                 child["discriminator"] = newDiscriminator;
//
//                 break;
//             } else {
//                 changeDiscriminator(tree, child, branchID, newDiscriminator)
//             }
//         }
//     }
//     return tree;
// }

function deleteBranch(tree, root, branchID) {
    console.log("function triggered")
    if (root["children"].length > 0) {
         if (root["id"] === branchID) {
                root["discriminator"] = newDiscriminator;
                return tree;
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