import { 
	Component, 
	OnInit, 
	Injector, 
	SimpleChanges,
	Input
} from '@angular/core';
import { BaseComponent } from '../BaseComponent';

declare let $: any;
declare let window: any;
@Component({
	selector: 'app-sidebar',
  	templateUrl: './sidebar.component.html'
})
export class SidebarComponent extends BaseComponent implements OnInit {
	
	constructor(public injector: Injector) { super(injector) }

	public scrollbarDisableOnMobile = false;	
	@Input() currentState;
	public routerState;
	ngOnInit() {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			this.scrollbarDisableOnMobile = true;
		} else if (window.innerWidth <= 767) {
			this.scrollbarDisableOnMobile = true;
		}
		window.onresize	=	() => {
			if (window.innerWidth <= 767){
				this.scrollbarDisableOnMobile = true;
			} else {
				this.scrollbarDisableOnMobile = false;
			}
		}

		setTimeout(function(){
			if (window.innerWidth <= 1024 && window.innerWidth >= 768){
				$(".sub-menu.toggled").each(function (i, e) {
					$(e).find('ul:first').find("a.sub").css("visibility", "hidden");
					$(e).toggleClass("toggled");
					$(e).addClass("toggled-hidden");
					$(e).find('ul:first').slideToggle('fast');
				});
			}
		}, 100)
	}
	ngOnChanges(changes: SimpleChanges) {
		if (changes.currentState.currentValue !== undefined){
			this.routerState	=	changes.currentState.currentValue;
		}
	}
	public expandNav(ev){
		$("aside, footer, .overlay").toggleClass("active");

		if (!$("aside").hasClass("active")){
			this.collapseSpandedNav(true);
		} else {
			this.collapseSpandedNav(false);
		}
		$(ev.target).toggleClass("active");
		$("main").toggleClass("aside-active");
	}
	public contains(state){
		return this.service.in_array(state, this.routerState);
	}
	public dropHeader() {
		$('.aside-dropdown').slideToggle('fast');
		$('.header-dropdown-icon > i').toggleClass('rotate');
		if ($(".header-dropdown-icon > i").hasClass("rotate")) {
			$('#for-scroll').scrollTop(0);
		}		
	}
}
