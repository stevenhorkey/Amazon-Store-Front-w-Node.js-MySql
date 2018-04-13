var mysql = require('mysql');
var inquirer = require('inquirer');

var conn = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

conn.connect(function(err){
    if (err){
        throw err
    };
    console.log('connected as id ' + conn.threadId + '\n');

    prompt();
    
});

function prompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View Product Sales by Department',
                'Create New Department',
                'Exit'
            ]
        },
    ]).then(function(data) {
        console.log(data)
        if(data.choice === 'View Products for Sale'){
            viewItems();
        } else if(data.choice === 'View Low Inventory'){
            lowInventory();
        } else if(data.choice === 'Add to Inventory'){
            addInventory();
        } else if(data.choice === 'Add New Product'){
            newProduct();
        } else if(data.choice === 'Exit'){
            exit();
        };
    });
};