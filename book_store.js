const readLine = require("readline-sync");

let bookStore = [{
    Book_ID: 101,
	Name: "book1",
	Price: 200,
	Status: "available",
	Quantity: 10
},
{
    Book_ID: 102,
	Name: "book2",
	Price: 250,
	Status: "available",
	Quantity: 5
},
{
    Book_ID: 103,
	Name: "book3",
	Price: 150,
	Status: "available",
	Quantity: 15
},
{
    Book_ID: 104,
	Name: "book4",
	Price: 300,
	Status: "available",
	Quantity: 10
},
{
    Book_ID: 105,
	Name: "book5",
	Price: 400,
	Status: "available",
	Quantity: 3
},
{
    Book_ID: 106,
	Name: "book6",
	Price: 500,
	Status: "available",
	Quantity: 8
},
{
    Book_ID: 107,
	Name: "book7",
	Price: 350,
	Status: "available",
	Quantity: 5
},
{
    Book_ID: 108,
	Name: "book8",
	Price: 450,
	Status: "available",
	Quantity: 15
},
{
    Book_ID: 109,
	Name: "book9",
	Price: 500,
	Status: "available",
	Quantity: 15
},
{
    Book_ID: 110,
	Name: "book10",
	Price: 450,
	Status: "available",
	Quantity: 5
},
{
    Book_ID: 111,
	Name: "book11",
	Price: 700,
	Status: "available",
	Quantity: 10
},
{
    Book_ID: 112,
	Name: "book12",
	Price: 550,
	Status: "available",
	Quantity: 12
},
{
    Book_ID: 113,
	Name: "book13",
	Price: 650,
	Status: "available",
	Quantity: 14
},
{
    Book_ID: 114,
	Name: "book14",
	Price: 760,
	Status: "available",
	Quantity: 7
},
{
    Book_ID: 115,
	Name: "book15",
	Price: 300,
	Status: "available",
	Quantity: 3
}
]


let cart = [];


let choice = true;
while(choice){
      console.log("Please select option from the below operations:\n1. view available books\n2. add book to cart\n3. show cart\n4. update cart\n5. exit ");
      let input = readLine.question("Enter your choice : ")
    if(input == 1){
        showAvailableBooks();
    }
    if(input == 2){
        addBook();
    }
    if(input == 3){
        showCart();
    }
    if(input == 4){
        updateCart()
    }
    if(input == 5){
        console.log("\nThankyou for visiting Our BookStore \n");
        choice = false;
    }
}

function showAvailableBooks(){
    console.table(bookStore,["Book_ID","Name","Price","Status","Quantity"])    
}


    function addBook(){
        let userInput = readLine.questionInt(`enter the book id between ${bookStore[0].Book_ID} and ${bookStore[bookStore.length-1].Book_ID}: \n`);
        const bookIndex = bookStore.findIndex(book => book.Book_ID == userInput)
        
        if(bookIndex == -1){
            console.log("\nplease enter valid book id\n");
            
            return
        }

        if(userInput <0){
            console.log("the book quantity must be positive");
        }

        let bookQuantity = readLine.questionInt("enter the quantity: \n");
          let  book = {}
            const existingCartBook = cart.find(book => book.Book_ID == userInput)
            if(existingCartBook){
                if(bookStore[bookIndex].Quantity >= bookQuantity){
                    bookStore[bookIndex].Quantity -= bookQuantity
                    existingCartBook.Quantity += bookQuantity
                    console.log("\nthe book added to the cart\n");
                }
                else{
                    console.log(`\nsorry you cannot add the books, because available quantity is only ${bookStore[bookIndex].Quantity}\n`); 
                }
            }
            else{
                if(bookStore[bookIndex].Quantity >= bookQuantity){
                    book.Name = bookStore[bookIndex].Name;
                    book.Book_ID = bookStore[bookIndex].Book_ID;
                    book.Price = bookStore[bookIndex].Price;
                    book.Status = bookStore[bookIndex].Status;
                    book.Quantity = bookQuantity
                    bookStore[bookIndex].Quantity -= bookQuantity

                    cart.push(book)
                    console.log("\nthe book added to the cart\n");
                    
                }
                else{

                    console.log(`\nsorry you cannot add the books, because available quantity is only ${bookStore[bookIndex].Quantity}\n`); 
                }
            }

            if(bookStore[bookIndex].Quantity == 0){
                bookStore[bookIndex].Status = "unavailable"
            }
  
            }
        
    
function showCart(){

    if(cart.length == 0){
        console.log("\ncart is empty, add items first\n");
        return;
    }
    
    let totalCartValue = 0;
    let totalBookvalue = 0;
    
    cart.forEach((book)=>{
        totalBookvalue = book.Price * book.Quantity;
        book.eachBookPrice = totalBookvalue;
        totalCartValue += book.eachBookPrice;
    })

    console.table(cart,["Name","Book_ID","Price","Quantity","eachBookPrice"]);
    console.log(`\nTotal cart value is ${totalCartValue}\n`);
}


function updateCart(){
    if(cart.length ==0 ){
        console.log("\nPlease add some books in the cart\n");
        return
     }
    console.log("please select one operation below: \n1. removeItems from cart\n2. update the quantity in the cart\n3. return to the main menu\n")
    const userInput = readLine.question("Enter your choice : ")
    if(userInput == 1){
        removeItems()
    }
    
    else if(userInput == 2){
        updateQuantity()
    }
    
    else if(userInput == 3){
        return
    }
 
}

function removeItems(){
 const userBookId = readLine.questionInt(`enter the book id between ${bookStore[0].Book_ID} and ${bookStore[bookStore.length-1].Book_ID}: \n`);
 let removedQuantity = 0


 
for( let book of cart ){
    if(book.Book_ID == userBookId){
        console.log("\nplease select the operation below : \n1. remove entire book from cart\n2. remove some quantity of book");
        const userInput = readLine.question("Enter your choice : ")
        
        if(userInput == 1){
            let bookIndex = cart.indexOf(book)
            removedQuantity = book.Quantity
            cart.splice(bookIndex,1)
            console.log("\n the book is removed from the cart\n");

        }
        if(userInput == 2){
            let bookQuantity = readLine.question("Please enter the quantity of book : ")
            if(book.Quantity<bookQuantity){
                console.log(`\nsorry you cannot remove the books, because available quantity is only ${book.Quantity}\n`)
            }
            else if(book.Quantity == bookQuantity){
                let bookIndex = cart.indexOf(book)
                removedQuantity = book.Quantity
                cart.splice(bookIndex,1)
                console.log(`\n ${bookQuantity}books from ${book.Book_ID} book_id is removed from the cart\n`);
            }
            else{
                book.Quantity -= bookQuantity
                removedQuantity = parseInt(bookQuantity)
                console.log(`\n ${bookQuantity}books from ${book.Book_ID} book_id is removed from the cart\n`);
            }
        }
 
        }
        else{
            console.log("\nPlease enter the correct book_id \n ");
            removeItems()
    }
}

        for(let obj of bookStore){
            if(obj.Book_ID == userBookId){
                if(obj.Quantity == 0){
                    obj.Status = "available"
                    obj.Quantity += removedQuantity
                }
                else if(obj.Quantity>0){
                    obj.Quantity += removedQuantity
                }
            }
        }

}

function updateQuantity(){
    const userBookId = readLine.questionInt(`enter the book id between ${bookStore[0].Book_ID} and ${bookStore[bookStore.length-1].Book_ID}: \n`);

    let cartBook = cart.find(book => book.Book_ID == userBookId)
    if(cartBook){
        let bookQuantity = readLine.question("Please enter the quantity of book : ")
        if(bookQuantity<0){
            console.log("\n the book Quantity must be positive");
        }
        let mainBook = bookStore.find(book => book.Book_ID == userBookId)
        if(mainBook.Quantity < bookQuantity){
            console.log(`\nsorry you cannot add the books, because available quantity is only ${mainBook.Quantity}\n`)
        }
        if(mainBook.Quantity >= bookQuantity){
            cartBook.Quantity += parseInt(bookQuantity)
            mainBook.Quantity -= parseInt(bookQuantity)
            console.log("\n the book added to the cart \n");
        }
        if(mainBook.Quantity == 0){
            mainBook.Status = "unavailable"
        }
    }
    else{
        console.log("\n Please enter the valid book_id");
    }
}