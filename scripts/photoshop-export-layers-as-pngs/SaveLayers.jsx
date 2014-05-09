// NAME: 
//  SaveLayers

// DESCRIPTION: 
//  Saves each layer in the active document to a PNG.
//  If a folder start with an asterisk, the child layers will be saved as separate images.
//  If a folder does not start with an asterisk, the child layers will be saved as a single combined image.
//  These files will be created in the current document folder (same as working PSD).

// REQUIRES: 
//  Adobe Photoshop CS2 or higher

//Available at: https://github.com/jhurt/Photoshop-Export-Layers-as-Images
//Modified from: https://github.com/jwa107/Photoshop-Export-Layers-as-Images

// enable double-clicking from Finder/Explorer (CS2 and higher)
#target photoshop
app.bringToFront();

function main() {
    if (!okDocument()) {
        alert("Document must be saved and be a layered PSD.");
        return;
    }

    var ok = confirm("Note: All layers will be saved in same directory as your PSD.\nThis document contains " + activeDocument.layers.length + " top level layers.\nBe aware that large numbers of layers may take some time!\nContinue?");
    if (!ok) {
        return;
    }

    // user preferences
    prefs = {};
    prefs.fileType = "png";
    prefs.fileQuality = 24;
    prefs.filePath = app.activeDocument.path;
    prefs.count = 0;

    //start all groups to visible
    makeGroupsVisible(activeDocument);
    //hide all non group layers
    hideNonGroups(activeDocument);
    //begin saving the document layers
    saveLayers(activeDocument);
    alert("Saved " + prefs.count + " files.");
}

function isGroup(ref) {
    return ref.typename == 'LayerSet';
}

function hideNonGroups(ref) {
    for (var i = 0; i < ref.layers.length; i++) {
        var layer = ref.layers[i];
        if(isGroup(layer)) {
            hideNonGroups(layer);
        }
        else {
            layer.visible = false;
        }
    }
}

function makeGroupsVisible(ref) {
    for (var i = 0; i < ref.layers.length; i++) {
        var layer = ref.layers[i];
        if(layer.name[0] == '#') {
            layer.visible = false;
        }
        else if(isGroup(layer)) {
            makeGroupsVisible(layer);
            layer.visible = true;
        }
    }
}

function saveChildren(layer, isSingleImage) {
    if(layer.name[0] == '#') {
        layer.visible = false;
        return;
    }

    var j, childLayer;
    for (j = 0; j < layer.layers.length; j++) {
        childLayer = layer.layers[j];
        if(childLayer.name[0] == '#') {
            childLayer.visible = false;    
        }
        else if(!isGroup(childLayer)) {
            if(isSingleImage) {
                childLayer.visible = true;
            }
            else {
                childLayer.visible = true;
                saveImage(childLayer.name);
                childLayer.visible = false;
            }
        }
    }

    if(isSingleImage) {
        saveImage(layer.name);
        for (j = 0; j < layer.layers.length; j++) {
            childLayer = layer.layers[j];
            if (!isGroup(childLayer)) {
                childLayer.visible = false;
            }
        }
    }
}

function saveLayers(parent) {
    for (var i = 0; i < parent.layers.length; i++) {
        var layer = parent.layers[i];
        if (isGroup(layer)) {
            if(layer.name[0] == '#') {
                //no op
            }
            else if (layer.name[0] == '*') {
                saveChildren(layer, false);
                //recurse
                saveLayers(layer);
            }
            else {
                saveChildren(layer, true);
                //recurse
                saveLayers(layer);
            }
        }
    }
}

function saveImage(layerName) {
    var fileName = layerName.replace(/[\\\*\/\?:"\|<> ]/g,'');
    if(fileName.length == 0) {
      fileName = "autoname";
    }
    var handle = getUniqueName(prefs.filePath + "/" + fileName);
    prefs.count++;

    SavePNG24(handle);
}

function getUniqueName(fileroot) {
    var filename = fileroot;
    var handle = new File(filename + "." + prefs.fileType);
    // var i = 0;
    // while(handle.exists) {
    //     filename = fileroot + '_' + i;
    //     handle = new File(filename + "." + prefs.fileType);
    //     i += 1;
    // }
    return handle;
}

function SavePNG24(saveFile) {
    var duplicate = activeDocument.duplicate("temp");
    duplicate.trim(TrimType.TRANSPARENT);
    duplicate.exportDocument(saveFile, ExportType.SAVEFORWEB, new ExportOptionsSaveForWeb());
    duplicate.close(SaveOptions.DONOTSAVECHANGES);
}

function okDocument() {
    // check that we have a valid document

    if (!documents.length) {
        return false;
    }

    var thisDoc = app.activeDocument;
    var fileExt = decodeURI(thisDoc.name).replace(/^.*\./, '');
    return fileExt.toLowerCase() == 'psd';
}

function wrapper() {
    function showError(err) {
        alert(err + ': on line ' + err.line, 'Script Error', true);
    }

    try {
        // suspend history for CS3 or higher
        if (parseInt(version, 10) >= 10) {
            activeDocument.suspendHistory('Save Layers', 'main()');
        }
        else {
            main();
        }
    }
    catch (e) {
        // report errors unless the user cancelled
        if (e.number != 8007) {
            showError(e);
        }
    }
}

wrapper();