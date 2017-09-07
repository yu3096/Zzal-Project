// 마우스 우 클릭
document.addEventListener("contextmenu", function(e){
   if( e ){
       e.preventDefault();

       var contextMenu = document.getElementById("context-menu");
       var li = contextMenu.querySelectorAll("li");
       var targetClassName = findIconType(e.target);

       li.forEach(function (t) {
           if( t.className.indexOf(targetClassName) > -1 ){
               t.style.display = "block";
           }else{
               t.style.display = "none";
           }
       });

       contextMenu.style.top = e.clientY + "px";
       contextMenu.style.left = e.clientX + "px";

       contextMenu.style.display = "inline-block";
   }else{
       event.keyCode = 0;
       event.returnValue = false;
   }
});

//마우스 좌 클릭
document.addEventListener("click", function(e){
    var targetClassName = findIconType(e.target);
    console.log(targetClassName);

    if( targetClassName === "container" ){
        document.getElementById("object-container").reset();
    }
});

function findIconType(target){
    var iconType = target.className || "container";

    if( iconType !== "container" ){
        if( target.className.indexOf("-area") > 0){
            iconType = target.className.split("-area")[0];
        }else{
            iconType = findIconType(target.offsetParent);
        }
    }
    return iconType;
}