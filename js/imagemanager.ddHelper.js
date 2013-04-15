/*
 * Project: Image Manager.
 * Module: Drag & Drop Helper
 * Author: Georgy Bunin (bunin.co.il@gmail.com)
 * */

window.ImageManager = window.ImageManager || {};

ImageManager.ddHelper = {

    dragEnter: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var dropArea = $(".dropArea");
        if (!dropArea.hasClass('green')) {
            dropArea.addClass('green');
        }
    },

    dragExit: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var dropArea = $(".dropArea");
        if (dropArea.hasClass('green')) {
            dropArea.removeClass('green');
        }
    },

    dragLeave: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var dropArea = $(".dropArea");
        if (dropArea.hasClass('green')) {
            dropArea.removeClass('green');
        }
    },

    dragOver: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

    },

    drop: function(evt) {
        var that = ImageManager.ddHelper;

        evt.stopPropagation();
        evt.preventDefault();

        evt.dataTransfer = evt.dataTransfer || undefined;
        evt.dataTransfer = evt.dataTransfer || evt.target.files;

        if (evt.dataTransfer != undefined) {
            var files = evt.dataTransfer.files || evt.dataTransfer;
            var count = files.length;
            if (count > 0) that.handleFiles(files);
        }

        var dropArea = $(".dropArea");
        if (dropArea.hasClass('green')) {
            dropArea.removeClass('green');
        }
    },

    handleFiles: function (files) {
        var that = ImageManager.ddHelper;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();
            reader.CustomFileName = file.name;
            reader.onprogress = that.handleReaderProgress;
            reader.onloadend = that.handleReaderLoadEnd;
            reader.readAsDataURL(file);
        }
    },

    handleReaderProgress: function(evt) {
        evt.lengthComputable = evt.lengthComputable || undefined;
    },

    handleReaderLoadEnd: function(evt) {
        ImageManager.dbHelper.CreateImage(this.CustomFileName, evt.target.result);
    }
};
