function showMenus(){
    if(document.getElementById("bar-menus").style.visibility == "visible"){
        document.getElementById("bar-menus").style.visibility = "hidden";
        document.getElementById("bar-menus").style.transform = "translateY(-100%)";
    }else{
        document.getElementById("bar-menus").style.visibility = "visible";
        document.getElementById("bar-menus").style.transform = "translateY(20%)";
        
    }

}