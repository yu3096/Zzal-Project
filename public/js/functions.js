//폴더 생성 함수
function makeFolder(type){
    function drawFolder(dom){
        $("#object-container").append(dom);
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