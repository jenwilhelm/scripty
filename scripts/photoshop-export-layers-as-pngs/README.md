Photoshop Export Layers as PNGs
=======

## Description

Saves each layer in the active document as a PNG. The PNGs will be named after their respective layer (ie, if your layer is named background_color, your PNG will be background_color.png). All resulting PNGs will be saved in the same directory that your PSD resides in.

If a folder or layer starts with an asterisk (*), its child layers will be saved as separate images.

<img src="https://raw.githubusercontent.com/jenwilhelm/scripty/master/scripts/photoshop-export-layers-as-pngs/asterisk.jpg" alt="Asterisk">

If a folder itself does not start with an asterisk, its child layers will be saved as a single combined image. 

<img src="https://raw.githubusercontent.com/jenwilhelm/scripty/master/scripts/photoshop-export-layers-as-pngs/no-asterisk.jpg" alt="No asterisk">

If a layer or a folder starts with a pound symbol (#), that layer or folder will be ignored and will not export a PNG. 

Modified from: [https://github.com/jwa107/Photoshop-Export-Layers-as-Images](https://github.com/jwa107/Photoshop-Export-Layers-as-Images)

## Example

### Using astericks

Any folder or layer that begins with an * symbol will be saved as separate images:



## Requirements

Adobe Photoshop CS2 or higher

## How to Use

1. Save SaveLayers.jsx to your computer
2. Launch Photoshop and open a PSD file
3. File -> Scripts -> Browse...
4. Browse to where you saved SaveLayers.jsx and open it
5. Wait for export process to finish

The resulting PNGs will be saved in the same directory that your PSD resides in.