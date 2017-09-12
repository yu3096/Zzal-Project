// 최초 초기화 함수
$(document).ready(function(){
   $("#template #_empty").load("../html/folder-empty.html");
    $("#template #_have").load("../html/folder-have.html");
});

//폴더 생성 함수
function makeFolder(type, drawType, key){
    var dom;
    if( type === "empty" ){
        dom = $("#template #_empty>.select-area").clone();
    }else if( type === "have" ){
        dom = $("#template #_have>.select-area").clone();
    }else {
        dom = "올바르지 않은 폴더 타입입니다.";
    }

    dom.find(".title").val(key);
    $("#object-container").append(dom);

    if( drawType === "NEW" ){
        dom.find(".title").prop("readonly", false).focus();
    }else{
        dom.find("input.title").prop("defaultValue", key);
        dom.find("input.selector").attr("id", key);
        dom.find("label.folder").prop("for", key);
    }
}

//이름 바꾸기 함수
function rename(){
    $("#object-container").find("input[type=radio][name=selector]:checked").parent().find("input[type=text].title").prop("readonly", false).focus();
}

//삭제 함수
function remove(){
    $("#object-container").find("input[type=radio][name=selector]:checked").parent().remove();
}