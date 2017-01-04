import { Component } from "@angular/core";
var imagepickerModule = require("nativescript-imagepicker");
import {takePicture} from "nativescript-camera";
var fs = require('file-system');
import {Page} from "ui/page";
import {Image} from "ui/image";
import {ObservableArray} from "data/observable-array";


@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public imagesArray:ObservableArray<any>;
    public counter = 0;
    public uploadTask;
    constructor(private page:Page){
        this.imagesArray=new ObservableArray();
    }

    onTap(){
        this.addExistingPhoto();
    }

    addExistingPhoto() {
        let context = imagepickerModule.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    startSelection( context ) {
        var that = this;
        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                selection.map( selected => {
                    console.log("selected map");
                    console.log(selection);
                    selected.getImage().then( v => {
                        var image:Image = <Image>this.page.getViewById("imageid");
                        image.src = v;
                        console.log( "In startSelection, v = " + v );
                        console.dump(v);
                    });

                });
            })
            .catch(function (e) {
                console.log(e);
            });
    }

     takePhoto() {
        console.log("In takePhoto");
        takePicture({
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true
        }).
            then((imageAsset) => {
                var image:Image = <Image>this.page.getViewById("imageid");
                console.log("In camera.takePicture, imageAsset.nativeImage = ");
                console.dump(imageAsset);
                image.src=imageAsset;
                

            }).catch((err) => {
                console.log("Error -> " + err.message);
            });
    }

    
}
