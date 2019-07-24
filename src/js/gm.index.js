$(document).ready(function(){
	/**-------------------------------------------------------------------------------------------**/
	/**                                       Constantes                                          **/  
	/**-------------------------------------------------------------------------------------------**/
		
		const $pageContainer = $("#PageContainer")
		const $header = $("#shopify-section-header")
		const $footer = $("#shopify-section-footer")

	/**-------------------------------------------------------------------------------------------**/
	/**                                          Menu                                             **/  
	/**-------------------------------------------------------------------------------------------**/
		
		let isOpen = false
		$menu.find(".btn-hamburguesa").click(function(){

			if(isOpen){
				isOpen = false
			}
			else{
				isOpen = true
			}
		})
});


