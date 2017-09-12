$(document)
    .on("contextmenu", function(e){
        e.preventDefault();
        if( $(e.target).parent()[0].id === "context-menu" ) {
            contextMenuActions(e.target.dataset.event);
        }else{
            settingContextMenu(findIconType($(e.target)), e.pageX, e.pageY);
            autoSelectedRadioBox($(e.target));
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
        $("#object-container").find("input[type=radio][name=selector]").prop("checked", false);
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
            makeFolder("empty", "NEW");
            break;
        case "delete" : //삭제
            remove();
            break;
        case "open" : //열기
            alert("개발중");
            break;
        case "rename" : //이름 바꾸기
            rename();
            break;
    }

    settingContextMenu();
}

//input태그 foucs out // enter
$(document).on("focusout", ".title", function(){
    var val = $(this).val();
    if( val.trim() === "" ){
        //alert("폴더 / 파일 명은 공백일 수 없습니다.");
        $(this).focus();

        return;
    }else {
        if( $("input[type=radio][id='" + val + "']").length > 0 ){
            //alert("폴더 / 파일 명은 중복될 수 없습니다.");
            $(this).focus();

            return;
        }else{
            $(this).parent().prop("for", val);
            $(this).parent().prev().prop("id", val);

            $(this).prop("readonly", true);
        }
    }
});
