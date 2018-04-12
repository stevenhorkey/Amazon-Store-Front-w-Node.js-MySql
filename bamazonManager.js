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
                'Add New Product',
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
    conn.query("SELECT * FROM products WHERE `stock_quantity` <= 100;", function(err, res) {
        if (err){
            throw err;
        }
        console.log('\n#########################');        
        console.log('ITEMS WITH LOW INVENTORY!');
        console.log('#########################');
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
function addInventory(){
    conn.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log('\n###############');        
        console.log('ITEMS!');
        console.log('###############');
        for(var i = 0;i<res.length;i++){
            console.log('===========================');
            console.log('\nID: '+res[i].item_id);
            console.log('Item: '+res[i].product_name);       
            console.log('Price: $'+res[i].price);
            console.log('Units: '+res[i].stock_quantity);
            console.log('\n===========================') 
        };  
    })
    setTimeout(function(){
        inquirer.prompt([
            {
                type: "input",
                name: "idChoice",
                message: "Enter the ID of the product you would like to update: ",
            },
            {
                type: "input",
                name: "quantity",
                message: "Enter the quantity you would like to add: ",
            }
        ]).then(function(data) {
        
            console.log(data.idChoice)
            conn.query("SELECT * FROM products WHERE item_id = "+data.idChoice+";", function(err, res) {
                var stockNum = res[0].stock_quantity;
                if (err) throw err;
                var sum = parseInt(stockNum) + parseInt(data.quantity);
                var id = parseInt(data.idChoice);
                
                conn.query("UPDATE products SET ? WHERE ?",
                [
                    {
                    stock_quantity: sum
                    },
                    {
                    item_id: data.idChoice
                    }
                ],
                function(err,res){});
                console.log('UPDATED-INVENTORY: '+sum.toString());
                console.log('Thank YOU!')
                console.log('===========================\n')
                setTimeout(function(){prompt()},500);
            })
        });
    },700)
    
};
function newProduct(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the name of the product you would like to add: ",
        },
        {
            type: "input",
            name: "price",
            message: "Enter the price of the product: ",
        },
        {
            type: "input",
            name: "department",
            message: "Enter the department of the product: ",
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter the quantity of the product: ",
        }
    ]).then(function(data) {
        
        var sql = "INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES ?";

        var values = [
            [0, data.name, data.department, parseInt(data.price),parseInt(data.quantity)]
        ];

        conn.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows+'\n');
            console.log('===========================\n');
            setTimeout(function(){prompt()},500);
        });
    });
};
function exit(){
    conn.end();
    process.exit()
}