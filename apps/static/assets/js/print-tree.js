import {branchClass} from "./branch-class.js";
import {editTree} from "./edit-tree.js";


export let tree = {
    "child": {
        "children": [
            {
                "children": [
                    {
                        "children": [],
                        "discriminant": "1",
                        "discriminator": "SCHEMA",
                        "id": "82003c8d-f7b5-4a91-ad0e-73e1f124f45c",
                        "operation": "numeric_Equal_Comparison",
                        "schema_path": "value"
                    },
                    {
                        "children": [],
                        "discriminant": "bar",
                        "discriminator": "SCHEMA",
                        "id": "0b4a8bae-beb6-44a8-86fd-75c750e4b053",
                        "operation": "STRING_EQUAL_COMPARISON",
                        "schema_path": "foo"
                    }
                ],
                "discriminant": null,
                "discriminator": "and",
                "id": "8d56a6b4-6c43-4e39-90d3-8c207e9500ed",
                "operation": null,
                "schema_path": null
            },
            {
                "children": [],
                "discriminant": "1",
                "discriminator": "SCHEMA",
                "id": "fbac2ac2-68ea-4c3a-ada1-8f763b0b9fab",
                "operation": "numeric_Equal_Comparison",
                "schema_path": "bug.value"
            }
        ],
        "discriminant": null,
        "discriminator": "and",
        "id": "ec8a775e-4f7f-491a-9492-1b67df6fc7cf",
        "operation": null,
        "parent": null,
        "schema_path": null
    },
    "createdAt": "Mon, 25 Apr 2022 12:43:57 GMT",
    "id": "dc9b75d8-88fd-4ae8-8f81-b9180a78e826",
    "isActive": true,
    "outcomes": [
        {
            "id": "3b859960-c74c-46e2-8c44-ade732741336",
            "operand": 1,
            "operation": "open_position",
            "target": "BTC"
        },
        {
            "id": "2759b2f2-2dd0-4c9e-822d-12648571306d",
            "operand": 1,
            "operation": "close_position",
            "target": "ETH"
        }
    ],
    "title": "Titlee",
    "updatedAt": "Mon, 25 Apr 2022 12:43:57 GMT"
}

document.querySelector("body").onload = async function() {
  await printTree(tree);
  editTree()
};

export function printTree(tree) {

//showing tree info
    let rootTitle = document.querySelector("#root-title");
    let rootStatus = document.getElementById("root-is-active");
    let rootCreated = document.getElementById("root-created-at");
    let rootUpdated = document.getElementById("root-updated-at");

    rootTitle.innerText = "Title: " + tree["title"];

    if (tree["isActive"]) {
        rootStatus.innerText = "Status: Active";
    } else {
        rootStatus.innerText = "Status: Not active";
    }

    rootCreated.innerText = "Created on: " + tree["createdAt"];
    rootUpdated.innerText = "Updated on: " + tree["updatedAt"];


// Printing tree
    let treeView = document.querySelector(".tree-view")
    let root = new branchClass(tree["child"]["discriminant"],
        tree["child"]["discriminator"],
        tree["child"]["id"],
        tree["child"]["operation"],
        tree["child"]["schema_path"],
        tree["child"]["children"]);

    root.printBranch(treeView);
    root.printChildren();

//script to toggle accordion
    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}
