var mysql = require('mysql');
var inquirer = require('inquirer');

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
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
    
})


function prompt(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product'
            ]
        },
    ]).then(function(data) {
        var choice = data.choice;
        if(choice = 'View Products for Sale'){
            viewItems();
        } else if(choice = 'View Low Inventory'){
            lowInventory();
        } else if(choice = 'Add to Inventory'){
            addInventory();
        } else if(choice = 'Add New Product'){
            newProduct();
        };
    });
}

function viewItems(){
    conn.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log('\n###############');        
        console.log('ITEMS FOR SALE!');
        console.log('###############');
        for(var i = 0;i<res.length;i++){
            console.log('===========================');
            console.log('\nID: '+res[i].item_id);
            console.log('Item: '+res[i].product_name);       
            console.log('Price: $'+res[i].price);
            console.log('Units: '+res[i].stock_quantity);
            console.log('\n===========================') 
        };  
        setTimeout(function(){prompt()},500);   
    })
};
function lowInventory(){

};
function addInventory(){

};
function newProduct(){

}