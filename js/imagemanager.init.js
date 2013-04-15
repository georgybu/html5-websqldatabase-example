/*
* Project: Image Manager.
* Module: Initialization
* Author: Georgy Bunin (bunin.co.il@gmail.com)
* */

window.ImageManager = window.ImageManager || {};

$(document).ready(function() {

    $(".dropArea").each(function(i,e) {
        e.addEventListener("dragenter", ImageManager.ddHelper.dragEnter, false);
        e.addEventListener("dragexit", ImageManager.ddHelper.dragExit, false);
        e.addEventListener("dragover", ImageManager.ddHelper.dragOver, false);
        e.addEventListener("drop", ImageManager.ddHelper.drop, false);
        e.addEventListener("dragleave", ImageManager.ddHelper.dragLeave, false);
    });

    document.body.addEventListener("drop", ImageManager.ddHelper.drop, false);

    function handleFileSelect(evt) { ImageManager.ddHelper.drop(evt); }
    document.getElementById('files').addEventListener('change', handleFileSelect, false);

    ImageManager.dbHelper.Init();
    ImageManager.dbHelper.GetImages();

    // ------------------------------------------------------------------------
    // Filter Favorites (bind events)

    $("#FilterAll").click(function() {
        var allObj = $("#FilterAll");
        var favObj = $("#FilterFavorite");

        if (!allObj.hasClass("green")) {
            allObj.addClass("green").removeClass("black");
            favObj.addClass("black").removeClass("green");
            ImageManager.dbHelper.currentFilter = allObj.attr('id');
            ImageManager.dbHelper.GetImages();
        }
    });

    $("#FilterFavorite").click(function() {
        var allObj = $("#FilterAll");
        var favObj = $("#FilterFavorite");

        if (!favObj.hasClass("green")) {
            favObj.addClass("green").removeClass("black");
            allObj.addClass("black").removeClass("green");
            ImageManager.dbHelper.currentFilter = favObj.attr('id');
            ImageManager.dbHelper.GetImages(true);
        }
    });

    document.addEventListener("message", function(e){
        console.log("receive:");
        console.log(e.domain);
        console.log(e.data);
        /*
        document.getElementById("test").textContent =
            e.domain + " said: " + e.data;
        */
    }, false);

    //postMessage( { action: 'send' } );
    var messageToSend = {
        jsonrpc: "2.0",
        result: ""
    };
    window.parent.postMessage(JSON.stringify(messageToSend), "file://");

});

// public aliases
window.DelImg = ImageManager.dbHelper.RemoveImage;
window.FavImg = ImageManager.dbHelper.ToggleFavorite;

//window.postMessage = window.postMessage || function() {};