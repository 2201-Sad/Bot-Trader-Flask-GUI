//authorization
const login = "username";
const password = "password";
const basicAuthToken =  btoa(`${login}:${password}`)


export const createNewUser = async (newlogin, newpassword) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/create-user", {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                "name": newlogin,
                "password": newpassword
            })
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log("Error: ", e);
    }
}


//fetching a list of trees
export const fetchTrees = async () => {
    console.log(basicAuthToken)
    try {
        const response = await fetch("http://127.0.0.1:5000/api/trade_tree/user", {
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic' + basicAuthToken
            },
            method: "GET"
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log("Error: ", e);
    }
}


//create a tree
export const createTree = async (tree) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/trade_tree", {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Basic' + basicAuthToken
            },
            method: "POST",
            body: JSON.stringify(tree)
        });
        const data = await response.json();
        console.log(data);
    } catch (e) {
        console.log("Error: ", e);
    }
}


//update a tree
export const updateTree = async (treeID, updatedTree) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/api/trade_tree", {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Basic' + basicAuthToken
            },
            method: "PUT",
            body: JSON.stringify(updatedTree)
        });
        const data = await response.json();
        console.log(data);
    } catch (e) {
        console.log("Error: ", e);
    }
}

//fetch a tree
export const fetchTree = async (treeID) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/trade_tree/${treeID}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic' + basicAuthToken
            },
            method: "GET"
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log("Error: ", e);
    }
}


//evaluate a tree
export const evaluateTree = async (treeID) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/trade_tree/evaluate/${treeID}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic' + basicAuthToken
            },
            method: "GET"
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log("Error: ", e);
    }
}


//delete a tree
export const deleteTree = async (treeID) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/trade_tree/${treeID}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic' + basicAuthToken
            },
            method: "DELETE"
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log("Error: ", e);
    }
}



