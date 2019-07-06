var new_index=0;
var hold_time=1000;
var image_width=400;
var current_index=0;
var transition_speed=0.1;
var current_margin_left=0;

var slider_wrapper=document.getElementById("slider-wrapper");

var buttons_overlay=document.createElement("div");
buttons_overlay.className="buttons_overlay";

slider_wrapper.appendChild(buttons_overlay);

var left_slide_button=document.createElement("a");
left_slide_button.id="left_slide_button";
left_slide_button.href="#";

var right_slide_button=document.createElement("a");
right_slide_button.id="right_slide_button";
right_slide_button.href="#";


left_slide_button.onclick=function(){
	new_index=new_index-1;
	slideImage(current_index,new_index);
}

buttons_overlay.appendChild(left_slide_button);
buttons_overlay.appendChild(right_slide_button);

var image_roll=document.getElementById("slider");

var images=image_roll.children;

var boxes=document.getElementById("box").children;
for(var l=0;l<boxes.length;l++){
	boxes[l].style.backgroundColor='black';
}

var number_of_images=images.length;

image_roll.style.marginLeft=0+"px";

function slideImage(current_index,new_index){
	var transition=setInterval(function(){
			current_margin_left=current_margin_left+((image_width*(current_index-new_index))/(transition_speed*1000));
			if(Math.ceil(Math.abs(current_margin_left))==(new_index*image_width)){
				current_margin_left=Math.ceil(current_margin_left);
				image_roll.style.marginLeft=current_margin_left+"px";
				clearInterval(transition);
				runSlider();
			}
			image_roll.style.marginLeft=current_margin_left+ "px";		
	},1);
}

function runSlider(){

	boxes[current_index].style.backgroundColor='white';
	
	setTimeout(function(){slideImage(current_index,new_index)},hold_time);	

	boxes[current_index].style.backgroundColor='black';
	boxes[new_index].style.backgroundColor='white';
	
	current_index=new_index;
	new_index=current_index+1;
	if(new_index==number_of_images){
		new_index=0;
	}
}

var indicator=document.getElementById("slider_indicator");
indicator.addEventListener('click',function(e){
	if(e.target.className=='indi'){
		console.log("CLicked");
		console.log(e.target);
	}
})

runSlider();



