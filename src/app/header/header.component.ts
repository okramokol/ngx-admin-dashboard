import { Component, OnInit, Injector } from '@angular/core';

import { BaseComponent } from '../BaseComponent';

declare let $:any;
@Component({
	selector: 'app-header',
  	templateUrl: './header.component.html',
  	styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

	constructor(public injector: Injector) { super(injector); }
	
	ngOnInit() {
		/* Script for seach */
		$(".main-search-menu-input").on("click", function(){
			$(this).parents(".seach-container").find(".main-search-menu-dropdown").css("display", "block");
			$(".seach-container").css({
				"border-bottom-left-radius": 0,
				"border-bottom-right-radius": 0,
			});
		});
		$(".main-search-menu-input").on("blur", function(event){
			var self = $(this);
			if(!event.relatedTarget || !hasClasses(event.relatedTarget, ["prevent-main-search-hide", "search-footer"])){
				setTimeout(function(){
					self.parents(".seach-container").find('.main-search-menu-dropdown').css('display','none');
					$(".seach-container").removeAttr("style");
				},300);				
			}
		});
		$(".main-search-menu-input").on("keypress", function(event){
			var self = $(this);
			if(event.keyCode == 38 || event.keyCode == 40){
				var li			=	self.parents(".seach-container").find('.search-scroll').find('ul > li');
				var liActive	=	self.parents(".seach-container").find('.search-scroll').find('ul > li.active');
				if(li.length > 0){
					if(liActive.length == 0){
						li[0].classList.add('active'); 
						$('.search-scroll').scrollTop(0);
					}
					else{
						$('.search-scroll').scrollTop($('.search-scroll li.active').index() * $('.search-scroll li.active').outerHeight() - 100);
						liActive[0].classList.remove('active');
						//Arrow Down
						if(event.keyCode == 40){
							var nextElemToActive;
							if(liActive.next().length == 0){
								$('.search-scroll').scrollTop(0);
								nextElemToActive = li[0];
							}
							else{  nextElemToActive = liActive.next()[0]; }
							
							nextElemToActive.classList.add("active");							
							//return false;		       
						}
						//Arrow Up
						else if(event.keyCode == 38){
							var nextElemToActive;
							if(liActive.prev().length == 0){		        					
								$('.search-scroll').scrollTop($('.search-scroll')[0].scrollHeight);
								nextElemToActive = li[li.length - 1];
							}
							else{  nextElemToActive =  liActive.prev()[0]; }

							nextElemToActive.classList.add("active");
							//return false;
						}
					}
				}
			}
		});
		$(".prevent-main-search-hide, .search-footer").on("click", function(){
			$(".main-search-menu-dropdown").css("display", "block");
			$(".main-search-menu-input").focus();
			$(".seach-container").css({
				"border-bottom-left-radius": 0,
				"border-bottom-right-radius": 0,
			});
		});
		function hasClasses(ele, classes){
			for(let i = 0; i < classes.length; i++){			
				if (ele.classList.contains(classes[i])) { 
					return true;
				}
			}
			return false;
		}
		/* End Script for search */
	}
	public 	currentSkin = "primary";
	public	skinList = [
		'primary',
		'lightblue',
		'bluegray',
		'cyan',
		'teal',
		'green',
		'orange',
		'blue',
		'purple'
	]
	public messageList = [
		{
			title: "Rowel de Guzman",
			message: "Sample Message for Rowel de Guzman",
			image: "1.jpg"
		}, {
			title: "Albert Magat",
			message: "Sample Message for Albert Magat",
			image: "2.jpg"
		}, {
			title: "Daryl Abalos",
			message: "Sample Message for Daryl Abalos",
			image: "3.jpg"
		}, {
			title: "Jonathan Poquiz",
			message: "Sample Message for Jonathan Poquiz",
			image: "4.jpg"
		}
	];
	public testExpress(event){
		this.service.notify(event.target.text, "inverse", {
			from: 'top',
			align: 'center'
		}, {
			enter: 'animated bounceIn',
			exit: 'animated bounceOut'
		})
	}

	public changeLayout(ev){
		if (ev.target.checked){
			$("body").addClass("full-layout");
		} else {
			$("body").removeClass("full-layout");
		}
	}
	public skinSwitch(color) {
		this.currentSkin = color;
	}
}
