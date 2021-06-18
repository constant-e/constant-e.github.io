function getText() {
    var url = "http://entitybugmcserver.free.idcfengye.com/docs/Notification.txt";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function () {
        console.log(request.status)
        if (request.readyState !== 4) return;
        document.append(request.responseText)
    }
    request.send(null);
}