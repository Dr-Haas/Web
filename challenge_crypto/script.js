// actu_mess = function(){
//   console.log(document.getElementById("count").textContent = document.getElementsByClassName("crypto_container").length);
// }
//
//  actu_mess();


 actu_crypto = function(){
     $("#count").text($("crypto_container").length);
 }

actu_crypto();
