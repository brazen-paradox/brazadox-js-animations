/*eslint-env es6*/
/*eslint-env browser*/

class DiagonalCutTwinSlider{
    
    constructor(dom_id){
        this.right_slider_contents = null;
        this.left_slider_contents = null;
        this.dom_id = dom_id;
        this.iteration_count = 0;
        
        //content_type can be either image or text
        
        this.right_slider_content_type = "image";
        this.left_slider_content_type = "image";
    }
    
    add_contents_to_left_slider(contents){
        this.left_slider_contents = contents;
    }
    
    add_contents_to_right_slider(contents){
        this.right_slider_contents = contents;
    }
    
    change_left_slider_content(){
        var left_slider_content = document.getElementById(this.dom_id+"left_slider_content");
        var index = (Math.round(this.iteration_count / 2) % this.left_slider_contents.length);
        console.log("left slider index " + index);
        if(this.left_slider_content_type == "text"){
            left_slider_content.innerHTML = this.left_slider_contents[index];
        }
        else{
            left_slider_content.src = this.left_slider_contents[index];
        }
    }
    
    change_right_slider_content(){
        var right_slider_content = document.getElementById(this.dom_id+"right_slider_content");
        var index = (Math.round(this.iteration_count / 2) % this.right_slider_contents.length);
        console.log("right slider index " + index);
        if(this.right_slider_content_type == "text"){
            right_slider_content.innerHTML = this.right_slider_contents[index];
        }
        else{
            right_slider_content.src = this.right_slider_contents[index];
        }
    }
    
    build_slider_div_for_image(){
        var image_slider = document.createElement("img");
        image_slider.classList.add("slider-image");
        return image_slider;
    }
    
    build_slider_div_for_text(){
        var text_slider = document.createElement("h3");
        text_slider.classList.add("slider-text");
        return text_slider;
    }



    
    init(){
        //Check if the contents are loaded
        
        if (this.right_slider_contents == null || !Array.isArray(this.right_slider_contents) || this.right_slider_contents.length == 0){
            console.log("Diagonal Image Slider is not initialized since right slider contents are not loaded properly");
            return;
        }
        
        if (this.left_slider_contents == null || !Array.isArray(this.left_slider_contents) || this.left_slider_contents.length == 0){
            console.log("Diagonal Image Slider is not initialized since left slider contents are not loaded properly");
            return;
        }
        
        console.log(this.dom_id);
        var slider_dom=document.getElementById(this.dom_id);
        slider_dom.classList.add("row", "mt-3", "slider-container-div");
        
        var slider_wrapper = document.createElement("div");
        slider_wrapper.classList.add("col-lg-12", "col-md-12", "col-sm-12", "slider-wrapper");
        
        var left_slider = document.createElement("div");
        left_slider.classList.add("left-slider");
        var right_slider = document.createElement("div");
        right_slider.classList.add("right-slider");
        
        
        //Build right slider
        var right_slider_content;
        if(this.right_slider_content_type == "text"){
            right_slider_content = this.build_slider_div_for_text();
            right_slider_content.innerHTML = this.right_slider_contents[0];
        }
        else{
            //content type is image
            right_slider_content = this.build_slider_div_for_image();
            right_slider_content.src = this.right_slider_contents[0];
        }
        right_slider_content.id = this.dom_id +"right_slider_content";
        
        //Build left slider
        var left_slider_content;
        if(this.left_slider_content_type == "text"){
            left_slider_content = this.build_slider_div_for_text();
            left_slider_content.innerHTML = this.left_slider_contents[0]
        }
        else{
            //content type is image
            left_slider_content = this.build_slider_div_for_image();
            left_slider_content.src = this.left_slider_contents[0];
        }
        left_slider_content.id = this.dom_id +"left_slider_content";
        
        
        left_slider.appendChild(left_slider_content);
        right_slider.appendChild(right_slider_content);
        
        slider_wrapper.appendChild(right_slider);
        slider_wrapper.appendChild(left_slider);
        
        slider_dom.appendChild(slider_wrapper);
        
        right_slider.addEventListener("animationiteration", () => {
            this.iteration_count++;
            //console.log(this.iteration_count);
            
            if(this.iteration_count % 2 == 0){
                this.change_left_slider_content();
                this.change_right_slider_content();
            }
        });
        
        
    }
   
}