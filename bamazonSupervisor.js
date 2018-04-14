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
        if(data.choice === 'View Product Sales by Department'){
            viewSales();
        } else if(data.choice === 'Exit'){
            exit();
        }
    });
};


function viewSales(){
    conn.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        var departments = [];
        for(var i = 0;i<res.length;i++){
            if(!departments.includes(res[i].department_name)){
                departments.push(res[i].department_name)      
            }; 
        };
        console.log(departments);

        function sales(item,index){
            conn.query("SELECT * FROM products WHERE department_name = '"+item+"';", function(err, res){

                var sales = 0;
                for(var i = 0; i<res.length;i++){
                    sales = sales +res[i].product_sales;
                }

                for(var i = 0;i<res.length;i++){
                    console.log('===========================');
                    console.log('\nDepartment: '+res[i].department_name);
                    console.log('Sales: '+sales.toString());       
                    console.log('\n===========================') 
                };  
            });
        };
        console.log('\n###############');     
        console.log('SALES BY DEPARTMENT');
        console.log('###############');
        departments.forEach(sales);
        
        
        setTimeout(function(){prompt()},500);   
    });
};