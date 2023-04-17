let count=0;
const app = angular.module("myApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/search", {
            templateUrl:"search.html",
            controller:"appcontroller"
        })
        .when("/contact", {
            templateUrl: "contact.html"
        })
        .when("/search/cart",{
            templateUrl:"cart.html",
            controller:"CartController"
        })
        .when("/search/:pid",{
            templateUrl:"product.html",
            controller:"fetchdetails"
        });
});

  
app.controller("appcontroller", function($scope,$http){
    $http.get("products.txt").then(function(response){
        $scope.items=response.data;
    });
});

app.controller("fetchdetails",function($scope,$http,$routeParams,CartService){
    $http.get('products.txt').then(function(response) {
        var products = response.data;
        var id = $routeParams.pid;
        $scope.product = products.find(function(product) {
          return product.pid == id;
        });
      });
    
    var cart = CartService.getCart();
    $scope.isItemInCart = function(item) {
    for (var i = 0; i < cart.length; i++) {
            if (cart[i].pid === item.pid) {
            return true;
            }
        }
        return false;
    };
      
    $scope.addToCart=function(product) {
        if(!$scope.isItemInCart(product)){
            CartService.addToCart(product);
            alert("Item added to cart");
        }
        else
            alert("Item already in cart")
      };
})
  
app.factory('CartService', function() {
    var cart = [];

    return {
        getCart: function() {
            console.log(cart)
            return cart
        },
        addToCart: function(product) {
        cart.push(product);
        // console.log(cart)
        }
    };
});

app.controller('CartController', function($scope, CartService) {
    $scope.cart = CartService.getCart();
    $scope.total_price=function(){
        var totalPrice = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            totalPrice += $scope.cart[i].price
        }
        return totalPrice;
    }
});
  
/*Validate Contact US*/
function validate(){
    // Get the name, email, and message fields
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Define regular expressions to validate name and email
    var nameRegex = /^[a-zA-Z\s]+$/;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name
    if (!nameRegex.test(name)) {
      alert("Please enter a valid name.");
      return false;
    }

    // Validate email
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Validate message
    if (message.length < 10) {
      alert("Please enter a message that is at least 10 characters long.");
      return false;
    }

    // If all fields are valid, submit the form
    alert("Thank you for your message! We will get back to you soon.");
  }