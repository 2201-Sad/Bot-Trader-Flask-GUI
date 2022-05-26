export class branchClass {
    constructor(discriminant, discriminator, id, operation, schema_path, children) {
        this.discriminant = discriminant;
        this.discriminator = discriminator;
        this.id = id;
        this.operation = operation;
        this.schema_path = schema_path;
        this.children = children;
    }

    printBranch(parentContainer) {
        let branchContainer = document.createElement("div");
        branchContainer.classList.add("branch-container");

        let branchSign = document.createElement("div");
        branchSign.classList.add("branch-sign");
        branchContainer.append(branchSign);
        let branchDataContainer = document.createElement("div")
        branchDataContainer.classList.add("branch-data-container")
        branchContainer.append(branchDataContainer);
        let branchData = document.createElement("div");
        branchData.append(this.discriminator.toUpperCase() + " BRANCH");
        branchData.classList.add("accordion");
        branchDataContainer.append(branchData);
        let branchInfo = document.createElement("div");

        //branch ID
        let idContainer = document.createElement("div");
        idContainer.classList.add("branch-info-container");
        let idLabel = document.createElement("p")
        idLabel.append("Branch ID: ")
        idLabel.classList.add("branch-info-label");
        let idInput = document.createElement("input");
        idInput.classList.add("id-input");
        idInput.type = "text";
        idInput.value = this.id;
        idInput.disabled = true;
        idContainer.append(idLabel);
        idContainer.append(idInput);
        branchInfo.appendChild(idContainer);

        //branch discriminator
        let discriminatorContainer = document.createElement("div");
        discriminatorContainer.classList.add("branch-info-container");
        let discriminatorLabel = document.createElement("p")
        discriminatorLabel.append("Discriminator: ")
        discriminatorLabel.classList.add("branch-info-label");
        let discriminatorInput = document.createElement("select");
        discriminatorInput.classList.add("discriminator-select", this.id);
        let discriminators = ["and", "or", "schema"];

        for (let i = 0; i < discriminators.length; i++) {
            let option = document.createElement("option");
            option.value = discriminators[i];
            option.innerText = discriminators[i];
            if (discriminators[i] === this.discriminator) {
                option.selected = true;
            }
            discriminatorInput.appendChild(option);

            //making sure that AND and OR branches don't have option to be changed to Schema
            if (this.discriminator !== "schema" && i == 1) {
                break;
            }
        }
        discriminatorInput.disabled = true;
        discriminatorContainer.append(discriminatorLabel);
        discriminatorContainer.append(discriminatorInput);
        branchInfo.appendChild(discriminatorContainer);


        //Schema branch info
        if (this.discriminator === "schema") {
            let schemaContainer = document.createElement("div");
            schemaContainer.classList.add("schema-container");

            //schema path
            let schemaPathContainer = document.createElement("div");
            schemaPathContainer.classList.add("branch-info-container");
            let schemaPathLabel = document.createElement("p")
            schemaPathLabel.append("Schema path: ")
            schemaPathLabel.classList.add("branch-info-label");
            let schemaPathInput = document.createElement("input");
            schemaPathInput.classList.add("schema-path-input", this.id)
            schemaPathInput.type = "text";
            schemaPathInput.value = this.schema_path;
            schemaPathInput.disabled = true;
            schemaContainer.append(schemaPathLabel);
            schemaContainer.append(schemaPathInput);
            schemaContainer.append(schemaPathContainer);

            //schema operation
            let schemaOperationContainer = document.createElement("div");
            schemaOperationContainer.classList.add("branch-info-container");
            let schemaOperationLabel = document.createElement("p")
            schemaOperationLabel.append("Operation: ")
            schemaOperationLabel.classList.add("branch-info-label");
            let schemaOperationInput = document.createElement("input");
            schemaOperationInput.classList.add("schema-operation-input", this.id)
            schemaOperationInput.type = "text";
            schemaOperationInput.value = this.operation;
            schemaOperationInput.disabled = true;
            schemaContainer.append(schemaOperationContainer);
            schemaContainer.append(schemaOperationLabel);
            schemaContainer.append(schemaOperationInput);
            branchInfo.append(schemaContainer);
        }

        //buttons to edit and delete a branch, and add new branch
        let editContainer = document.createElement("div");
        editContainer.classList.add("edit-container");
        let editButton = document.createElement("p");
        editButton.classList.add(this.id, "edit-button");
        editButton.innerText = "Edit branch";
        let deleteButton = document.createElement("p");
        deleteButton.innerText = "Delete branch";
        deleteButton.classList.add("delete-button", this.id);
        let addButton = document.createElement("p");
        addButton.innerText = "Add child";
        addButton.classList.add("add-button", this.id);
        editContainer.append(editButton);
        editContainer.append(deleteButton);
        editContainer.append(addButton);
        branchInfo.append(editContainer);
        branchInfo.classList.add("panel");
        branchDataContainer.append(branchInfo);

        branchContainer.append(branchDataContainer)
        parentContainer.append(branchContainer);

    }


    printChildren() {
        let children = this.children;

        let childrenContainer = document.createElement("div");
        childrenContainer.classList.add("children-container");
        let rootContainer = Array.from(document.querySelectorAll('.branch-container')).pop();

        rootContainer.append(childrenContainer);
        rootContainer = childrenContainer;

        for (let counter = 0; counter < Object.keys(children).length; counter ++) {
            let temp = new branchClass(children[counter]["discriminant"],
                           children[counter]["discriminator"],
                           children[counter]["id"],
                           children[counter]["operation"],
                           children[counter]["schema_path"],
                           children[counter]["children"]);

            temp.printBranch(rootContainer);

            if (Object.keys(temp.children).length > 0) {
                temp.printChildren(rootContainer)
            }

        }

    }
}


