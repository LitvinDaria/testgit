function showModalWindows(url, width, height, resizable){
    var options = 'center:yes; help:no; status:no; scroll:no;';
    var top, left;
    if (!!width)  {
        options += 'dialogWidth:' + width + 'px;';
        //left = + screen.width/2 - width;
    }
    if (!!height) {options += 'dialogHeight:' + height + 'px;';
       // top = screen.height/2 - height;
    }
    if (!!resizable) options += 'resizable:yes;';
    //options += 'dialogTop:'+ top + ';';
    //options += 'dialogLeft:'+ left +';';
    return window.showModalDialog(url, window, options);
}
function showFullModal(url, resizable){
    var options = 'center:yes; help:no; status:no; scroll:no;';
    options += 'dialogWidth:100%;';
    options += 'dialogHeight:100%;';
    if (!!resizable) options += 'resizable:yes;';
    return window.showModalDialog (url, window, options);
}
function closeWindow(){
    window.returnValue="true";
    window.close();
}