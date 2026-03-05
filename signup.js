const form = document.getElementById("entry-form");
const btn =document.getElementsByClassName("btn");
form.addEventListener("submit", async(e)=>{
    e.preventDefault();

    console.log("submit handler called");

    const formData = new FormData(form);
    const data = {
     full_name: formData.get("full_name"),
     e_mail: formData.get("e_mail"),
     password: formData.get("password"),
     phone_number: formData.get("phone_number"),
     date_of_birth: formData.get("date_of_birth"),
     city: formData.get("city"),
     age: formData.get("age"),
    };

    try{
        const response = await fetch("http://localhost:5000/signup",
            {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
    });
    const result = await response.json();
    alert(result.message);
    window.location.href="index.html";
    } catch(err){
        alert("Error in detail submition");
        console.error(err);
    }
});
