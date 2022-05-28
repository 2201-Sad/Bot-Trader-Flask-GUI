export class outcomeClass {
    constructor(id, operand, operation, target) {
        this.id = id;
        this.operand = operand;
        this.operation = operation;
        this.target = target;
    }

    printOutcome(parentContainer) {
        let outcomeContainer = document.createElement("div");
        outcomeContainer.classList.add("outcome-container");

        let outcomeDataContainer = document.createElement("div")
        outcomeDataContainer.classList.add("outcome-data-container")
        outcomeContainer.append(outcomeDataContainer);
        let outcomeData = document.createElement("div");
        outcomeData.append(this.target);
        outcomeData.classList.add("accordion");
        outcomeDataContainer.append(outcomeData);
        let outcomeInfo = document.createElement("div");

        //branch discriminator
        let outcomeOperationContainer = document.createElement("div");
        outcomeOperationContainer.classList.add("outcome-info-container");
        let outcomeOperationLabel = document.createElement("p")
        outcomeOperationLabel.append("Operation: ")
        outcomeOperationLabel.classList.add("outcome-info-label");
        let outcomeOperationInput = document.createElement("select");
        outcomeOperationInput.classList.add("outcome-operation-select");
        let outcomeOperations = ["OPEN_POSITION", "CLOSE_POSITION"];

        for (let i = 0; i < outcomeOperations.length; i++) {
            let option = document.createElement("option");
            option.value = outcomeOperations[i];
            option.innerText = outcomeOperations[i];
            if (outcomeOperations[i] === this.operation) {
                option.selected = true;
            }
            outcomeOperationInput.appendChild(option);

            // //making sure that AND and OR branches don't have option to be changed to Schema
            // if (this.discriminator !== "schema" && i == 1) {
            //     break;
            // }
        }
        outcomeOperationInput.disabled = true;
        outcomeOperationContainer.append(outcomeOperationLabel);
        outcomeOperationContainer.append(outcomeOperationInput);
        outcomeInfo.appendChild(outcomeOperationContainer);


        //outcome operand
        let outcomeOperandContainer = document.createElement("div");
        outcomeOperandContainer.classList.add("outcome-operand-container");
        let outcomeOperandLabel = document.createElement("p")
        outcomeOperandLabel.append("Operand: ")
        outcomeOperandLabel.classList.add("outcome-operand-label");
        let outcomeOperandInput = document.createElement("input");
        outcomeOperandInput.classList.add("outcome-operand-input")
        outcomeOperandInput.type = "text";
        outcomeOperandInput.value = this.operand;
        outcomeOperandInput.disabled = true;
        outcomeOperandContainer.append(outcomeOperandLabel);
        outcomeOperandContainer.append(outcomeOperandInput);
        outcomeInfo.append(outcomeOperandContainer);

        //outcome target
        let outcomeTargetContainer = document.createElement("div");
        outcomeTargetContainer.classList.add("outcome-target-container");
        let outcomeTargetLabel = document.createElement("p")
        outcomeTargetLabel.append("Target: ")
        outcomeTargetLabel.classList.add("outcome-target-label");
        let outcomeTargetInput = document.createElement("input");
        outcomeTargetInput.classList.add("outcome-target-input")
        outcomeTargetInput.type = "text";
        outcomeTargetInput.value = this.target;
        outcomeTargetInput.disabled = true;
        outcomeTargetContainer.append(outcomeTargetLabel);
        outcomeTargetContainer.append(outcomeTargetInput);
        outcomeInfo.append(outcomeTargetContainer);

        //buttons to add new and delete an outcome
        let editContainer = document.createElement("div");
        editContainer.classList.add("edit-container");
        let deleteButton = document.createElement("p");
        deleteButton.innerText = "Delete outcome";
        deleteButton.classList.add("delete-outcome-button");
        let addButton = document.createElement("p");
        addButton.innerText = "Add outcome";
        addButton.classList.add("add-outcome-button");
        editContainer.append(deleteButton);
        editContainer.append(addButton);
        outcomeInfo.append(editContainer);
        outcomeInfo.classList.add("panel");
        outcomeDataContainer.append(outcomeInfo);

        outcomeContainer.append(outcomeDataContainer)
        parentContainer.append(outcomeContainer);

    }
}



