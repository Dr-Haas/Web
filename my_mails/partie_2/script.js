actu_mess = function(){
  document.getElementById("count").textContent = document.getElementsByClassName("text").length;
}

var  i = 0;
for(;i < document.getElementsByClassName('trash').length;)
{
  document.getElementsByClassName("trash")[i].addEventListener("click",
   function(){
     this.parentNode.remove();
    console.log(this);
    actu_mess();
   }
  );
  actu_mess();

  i++;
}
