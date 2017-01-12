import { Component } from "@angular/core";
var imagepickerModule = require("nativescript-imagepicker");
import {takePicture} from "nativescript-camera";
var fs = require('file-system');
import {Page} from "ui/page";
import {Image} from "ui/image";
import {ObservableArray} from "data/observable-array";
import { ImageSource, fromNativeSource } from "image-source";
import {ListView} from "ui/list-view";


@Component({
    selector: "my-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    public imagesArray:ObservableArray<any>;
    public counter = 0;
    public uploadTask;
    public imgsrc: ImageSource;
    constructor(private page:Page){
        this.imagesArray=new ObservableArray();
        this.imgsrc = new ImageSource();
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
                        console.log( "In startSelection, v = " + v );
                        this.imagesArray.push({imgsource:v});
                    });

                });
            })
            .catch(function (e) {
                console.log(e);
            });
    }

     takePhoto() {
         var that =this;
        console.log("In takePhoto");
        takePicture({
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true
        }).
            then((imageAsset) => {
              
                //this.imagesArray.push({imgsource:imageAsset});
                // setTimeout(()=>{
                //     var listview:ListView =<ListView> this.page.getViewById("listviewid");
                //     listview.refresh();
                // }, 1000)
                imageAsset.getImageAsync((image) => {
                    this.imagesArray.push({imgsource:image});
                })

                
                

            }).catch((err) => {
                console.log("Error -> " + err.message);
            });
    }

    
}