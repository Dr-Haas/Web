
actu_mess = function(){
  document.getElementById("count").textContent = document.getElementsByClassName("text").length;
}


delete_element = function(){
  var  i = 0;
  for(;i < document.getElementsByClassName('trash').length;)
  {
    document.getElementsByClassName("trash")[i].addEventListener("click", function(){
      this.parentNode.remove();
      console.log(this);
      actu_mess();
    }
    );
    actu_mess();
    i++;
  }
}

actu_mess();
delete_element();

  if (document.getElementById("add_messages").value = ""){

  }
  else{

    document.getElementById("blue_btn").addEventListener("click",
    function(){
        console.log(this);

       var newText = document.getElementById("add_messages").value;

       var creatDiv = document.createElement("div");
       var creath6 = document.createElement("h6");
       var creatDiv2 = document.createElement("div");
       var creatImgA = document.createElement("img");
       var creatPara = document.createElement("p");
       var creatImgT = document.createElement("img");

       creatDiv.className = "row";
       creath6.textContent = "Noel Paganelli";
       creatImgA.className = "avatar";
       creatImgA.src = "img/avatar-1.jpg";
       creatPara.className = "text";
       creatPara.textContent = newText;
       creatImgT.className = "trash";
       creatImgT.src = "img/trash.png";

       document.getElementById("container").appendChild(creatDiv);
       creatDiv.appendChild(creatImgA);
       creatDiv.appendChild(creatDiv2);
       creatDiv2.appendChild(creath6);
       creatDiv2.appendChild(creatPara);
       creatDiv.appendChild(creatImgT);

       delete_element();
       actu_mess();
       document.getElementById("add_messages").value = "";


       console.log(newText);
       console.log(creatDiv);
   })
 };
