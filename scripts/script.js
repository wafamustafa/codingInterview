/*

- The top right “Crown” icon should only be displayed if the employee is featured
- Each “role” is given a corresponding color
- Images for employees can be found in
http://sandbox.bittsdevelopment.com/code1/employeepics/{id}.jpg

*/
//get all html element where info will be inputted
var employeeContainer = document.getElementById('employee');


//didnt use the api call
const apiRole = "http://sandbox.bittsdevelopment.com/code1/fetchroles.php"

//making the api call
//using fetch method (FYI not compatiable on all broswers. Check MDN web docs)
//summary:: initiating fetch using api -> get response -> if response is OK -> convert to JSON data -> take the JSON data in a function where the info from the respone will be used to display info
//because the response is JSON object, use Object() method to push in an array ->start appending the info in the appropriate div
fetch('http://sandbox.bittsdevelopment.com/code1/fetchemployees.php')
    .then(response => {
        return response.json();
    }).then(function(data) {
    //noticed index starts at 1 so start loop at 1
    for (var i = 1; i <= Object.keys(data).length; i++) {
        //check to see if employee is featured use nested function 
        function featuredEmp(feat){
            if (feat == 1) {
                //code ref::https://www.w3schools.com/charsets/ref_emoji.asp
                return "&#128081;";
            } else {
                return "";
            }
        }
        //getting the image
        var empPic = "http://sandbox.bittsdevelopment.com/code1/employeepics/" + data[i].employeeid + ".jpg";
        //employee first and last name
        var empFname = data[i].employeefname;
        var empLname = data[i].employeelname;
        //employee bio
        var empBio = data[i].employeebio;
            //start appending to employee container 
            //featured employee
            employeeContainer.innerHTML += 
                '<div class="container">' +
                '<div class="featuredIcon" id="featIcon">' + 
                    featuredEmp(data[i].employeeisfeatured) + 
                '</div>' +
                '<div class="employeePic" id="empPic">' + 
                    '<img src="' + empPic + '" alt="profile picture for employee" />' +
                '</div>' +
                '<h1 id="empName">' + empFname + ' ' + empLname + '</h1>' +
                '<h3 id="empBio">' + empBio + '</h3>' +
                //employee role
                //ref:: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
                data[i].roles.map(function(empRole){
                    return '<div class="role" id="empRole">' + 
                        '<p style= "background-color:' + empRole.rolecolor + '">' +empRole.rolename + '</p>'
                }).join("  ") + 
                '</div></div>';
    }
});

//I would extend the style a bit and add a show more info for employees with big bios. 