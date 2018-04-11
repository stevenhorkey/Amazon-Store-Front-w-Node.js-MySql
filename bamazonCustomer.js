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

    conn.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log('###############')        
        console.log('ITEMS FOR SALE!')
        console.log('###############')
        for(var i = 0;i<res.length;i++){
            console.log('===========================')
            console.log('\nID: '+res[i].item_id);
            console.log('Item: '+res[i].product_name);       
            console.log('Price: $'+res[i].price)
            console.log('\n===========================') 
        }
    
        prompt();
    })
})

function prompt(){
    inquirer.prompt([
        {
            type: "input",
            name: "idChoice",
            message: "Enter the ID of the product you would like to buy: ",
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter the quantity you would like to buy: ",
        }
    ]).then(function(data) {
    
        console.log(data.idChoice)
        conn.query("SELECT * FROM products WHERE item_id = "+data.idChoice+";", function(err, res) {
            if (err) throw err;
            if(res.stock_quantity >= data.quantity){
                var diff = res.stock_quantity - data.quantity;
                diff = diff.toString();
                
                conn.query("UPDATE products SET stock_quantity = "+diff+" WHERE id = "+data.idChoice+";",function(err,res){

                });
            } else{
                console.log('Insufficient quantity!')
                return
            }
            
        })
    
    });
}

// This function adds products to the database
// function createProduct() {
//     console.log("Inserting a new product...\n");
//     var query = conn.query(
//         "INSERT INTO products (item_id,product_name, department_name, price, stock_quantity) VALUES (?)",
//         {
//         item_id: 0,
//         product_name: 'Twister',
//         department_name: 'Games',
//         price: '12',
//         stock_quantity: 10000,
//         },
//         function(err, res) {
//         console.log(res.affectedRows + " product inserted!\n");
//         }
//     );
//     // logs the actual query being run
//     console.log(query.sql);
// }

// console.log("Selecting all products...\n");
//   conn.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });