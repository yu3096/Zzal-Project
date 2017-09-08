$(document)
    .on("contextmenu", function(e){
        e.preventDefault();
        if( $(e.target).parent().id === "context-menu" ) {

        }else{
            settingContextMenu(findIconType($(e.target)), e.pageX, e.pageY);
        }
    })
    .on("click", function(e){
        e.preventDefault();
        if( $(e.target).parent()[0].id === "context-menu" ) {
            contextMenuActions(e.target.dataset.event);
        }else{
            autoSelectedRadioBox($(e.target));
            settingContextMenu();
        }
    })
;

//우클릭 시, 상황에 맞는 context menu를 노출한다.
function settingContextMenu( type, clientX, clientY ){
    var contextMenu = $("#context-menu");
    if( type || "none" !== "none" ){
        contextMenu.children("." + type).css("display", "block");
        contextMenu.children().not("." + type).css("display", "none");

        contextMenu.css({
            "left": clientX+"px",
            "top": clientY+"px",
            "display": "inline-block"
        });
    }else{
        contextMenu.css("display", "none");
    }
}

//선택 한 Icon의 label Class를 Return한다.
function findIconType(target){
    if( target.is($("html")) ){
        return "container";
    }else{
        if( target[0].tagName.toLowerCase() === "label" ){
            return target[0].className;
        }else{
            return findIconType(target.parent());
        }
    }
}

//선택한 가장 가까운 부모객체의 radiobox를 선택한다.
//없을 시, form reset
function autoSelectedRadioBox(target){
    if( target.is($("html")) ) {
        $("#object-container").each(function(){
           this.reset();
        });
    }else{
        if( target.hasClass("select-area") ) {
            target.children("input[type=radio]").prop("checked", true);
        } else {
            autoSelectedRadioBox(target.parent());
        }
    }
};

//context-menu를 눌렀을 때 발생하는 Action
function contextMenuActions(action) {
    switch (action) {
        case "new" : //새 폴더
            makeFolder("empty");
            break;
        case "delete" : //삭제

            break;
        case "open" : //열기
            break;
    }

    settingContextMenu();
}
