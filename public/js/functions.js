//폴더 생성 함수
function makeFolder(type){
    function drawFolder(dom){
        dom = $(dom);
        dom.find(".title").val("");
        dom.appendTo("#object-container").find(".title").prop("readonly", false).focus();
    }

    var url = null;
    if( type === "empty" ){
        url = "../html/folder-empty.html";
    }else{
        url = "../html/folder-have.html";
    }

    $.ajax({
        method: "GET",
        url: url,
        dataType: "html",
        success: drawFolder,
        error: alert("DOM객체 로드 중 오류가 발생하였습니다.")
    });
}

//이름 바꾸기 함수
function rename(){
    $("#object-container").find("input[type=radio][name=selector]:checked").parent().find("input[type=text].title").prop("readonly", false).focus();
}

//삭제 함수
function remove(){
    $("#object-container").find("input[type=radio][name=selector]:checked").parent().remove();
}