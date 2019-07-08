var HOLD_TIME=1000;
var IMAGE_WIDTH=400;
var TRANSITION_SPEED=0.2; 

var new_index=0;
var current_index=0;
var current_margin_left=0;

var image_roll=document.getElementById("slider");
var images=image_roll.children;
var number_of_images=images.length;

image_roll.style.width=(number_of_images*IMAGE_WIDTH)+"px";
image_roll.style.marginLeft=0+"px";

/* Create slide indicators */

var slider_wrapper=document.getElementById("slider-wrapper");

var slider_indicator=document.createElement("div");
slider_indicator.id="slider_indicator";

var indicator_ul = document.createElement("ul");
indicator_ul.className='clearfix';
indicator_ul.id='box';

slider_indicator.appendChild(indicator_ul);

slider_wrapper.appendChild(slider_indicator);

var indicators=[];

for(var j=0;j<number_of_images;j++){
	var pointer=document.createElement("li");
	var clickable=document.createElement("a");
	clickable.className='indi';
	clickable.href="#";
	clickable.id=j;
	indicator_ul.appendChild(pointer);
	pointer.appendChild(clickable);
	indicators.push(clickable);
}

/* Create control buttons */

var buttons_overlay=document.createElement("div");
buttons_overlay.className="buttons_overlay";
slider_wrapper.appendChild(buttons_overlay);

var left_slide_button=document.createElement("a");
left_slide_button.id="left_slide_button";
left_slide_button.innerHTML="<";
left_slide_button.href="#";

var right_slide_button=document.createElement("a");
right_slide_button.id="right_slide_button";
right_slide_button.innerHTML=">";

right_slide_button.href="#";
buttons_overlay.appendChild(left_slide_button);
buttons_overlay.appendChild(right_slide_button);

/* Handle control buttons */

buttons_overlay.addEventListener('click',function(e){
	var target=e.target.id;
	if(target=='left_slide_button' || target=='right_slide_button' ){
		var move=1;
		if(target=='left_slide_button'){
			move=-1;
		}
		clearTimeout(timeout);
		new_index=current_index+move;
		if(new_index==-1){
			new_index=number_of_images-1;
		}else if(new_index==number_of_images){
			new_index=0;
		}
		slideImage(current_index,new_index);
	}
})

function toggleButtons(flag){
	if(flag==true){
		left_slide_button.style.pointerEvents='auto';
		right_slide_button.style.pointerEvents='auto';
		indicators.forEach(function(box){
			box.style.pointerEvents='auto';
		})
	}else{
		left_slide_button.style.pointerEvents='none';
		right_slide_button.style.pointerEvents='none';
		indicators.forEach(function(box){
			box.style.pointerEvents='none';
		})		
	}				
}

function slideImage(current_index,new_index){
	var transition=setInterval(function(){
			toggleButtons(false);
			current_margin_left=current_margin_left+((IMAGE_WIDTH*(current_index-new_index))/(TRANSITION_SPEED*1000));
			console.log(Math.ceil(Math.abs(current_margin_left)));
			if(((Math.ceil(Math.abs(current_margin_left)))==(new_index*IMAGE_WIDTH)) || ((Math.floor(Math.abs(current_margin_left)))==(new_index*IMAGE_WIDTH))){
				current_margin_left=Math.ceil(current_margin_left);
				image_roll.style.marginLeft=current_margin_left+"px";
				toggleButtons(true);
				clearInterval(transition);
				runSlider();
			}
			image_roll.style.marginLeft=current_margin_left+ "px";		
	},1);
}

function runSlider(){
	indicators[current_index].style.backgroundColor='white';
	timeout=setTimeout(function(){slideImage(current_index,new_index)},HOLD_TIME);	
	indicators[current_index].style.backgroundColor='black';
	indicators[new_index].style.backgroundColor='white';
	current_index=new_index;
	new_index=current_index+1;
	if(new_index==number_of_images){
		new_index=0;
	}
}

/* handler slide indicators */

var indicator=document.getElementById("slider_indicator");
indicator.addEventListener('click',function(e){
	if(e.target.className=='indi'){
		clearTimeout(timeout);
		new_index=Number(e.target.id);
		slideImage(current_index,new_index);
	}
})

runSlider();