// Initialize Firebase
var config = {
    apiKey: "AIzaSyAY-JcdfCs4f9ltzrgjXR2cOHcQKVhllYE",
    authDomain: "zzal-storage.firebaseapp.com",
    databaseURL: "https://zzal-storage.firebaseio.com",
    projectId: "zzal-storage",
    storageBucket: "zzal-storage.appspot.com"
};
firebase.initializeApp(config);

//접속 URL에 따른 연결 DB 위치 변경
function getPathParams() {
    var path;
    window.location.search.replace(/(path)=([^&]*)/gi, function(str, key, val){
        path = val;
    });
    return path || "";
}

var database = firebase.database().ref("/PATHS/" + "／" + getPathParams().replace(/\//gi, "／"));
database.once("value", function(snapshot){
    var data = snapshot.val();

    for( var key in data ){
        if( data[key]["_type"] === "dir" ){
            makeFolder(data[key]["_icon"], "", key);
        }
    }
});