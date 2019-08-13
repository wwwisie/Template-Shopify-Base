/**-------------------------------------------------------------------------------------------**/
/**--Funcion de numeros aleatorios en un rango determindado                                   **/  
/**-------------------------------------------------------------------------------------------**/
	
	function randomNumber(min, max){ 
		return ~~(Math.random() * (max - min + 1)) + min 
	}

/**-------------------------------------------------------------------------------------------**/
/**--Funcion para invertir Strings                                                            **/  
/**-------------------------------------------------------------------------------------------**/

	function invertirString(string) {
	  	let $totalCaracteres = string.length;
	  	let $stringInvertida = "";
	 
	  	while ($totalCaracteres >= 0) {
	    	$stringInvertida += string.charAt($totalCaracteres);
	    	$totalCaracteres--;
	  	}
	  	return $stringInvertida;
	}

/**-------------------------------------------------------------------------------------------**/
/**--Funcion para formatear numeros                                                           **/  
/**-------------------------------------------------------------------------------------------**/

	function formatNumber(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;

		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}

/**-------------------------------------------------------------------------------------------**/
/**--Codigo para teclas del Teclado                                                           **/  
/**-------------------------------------------------------------------------------------------**/

	const $keyboard = {
		ESC: 27,
		ENTER: 13,
		SPACE: 32,
		BACKSPACE: 8,

		RIGHT: 39,
		LEFT: 37,
		UP: 38,
		DOWN: 40,

		TAB: 9,
		MAYUS: 20,
		SHIFT: 16,
		CTRL: 17,
		ALT: 18,
		COMMAND: 91, //MAC
	}

/**-------------------------------------------------------------------------------------------**/
/**--Deshabilitar Evento                                                                      **/  
/**-------------------------------------------------------------------------------------------**/
	
	function disableEvent(e){
  		if (e.stopPropagation){
    		e.stopPropagation();
  		} 
  		else if (window.event){
    		window.event.cancelBubble = true;
  		}
  	
  		e.preventDefault();
  
  		return false;
	}

/**-------------------------------------------------------------------------------------------**/
/**--Deshabilitar Click Derecho                                                               **/  
/**-------------------------------------------------------------------------------------------**/
	
	function disableRightClick(disable = false){
		document.oncontextmenu = () => !disable
	}

/**-------------------------------------------------------------------------------------------**/
/**--Lazy-Loading-Imgs                                                                        **/  
/**-------------------------------------------------------------------------------------------**/
		
	function lazyLoading(galeria){
		const $images = document.querySelectorAll(galeria)

		$images.forEach( item => {
			let $dataSrc = item.dataset.src
			item.setAttribute("src", $dataSrc);

			item.onload = () => {
				item.classList.add("visible")
			}
		})
	}

/**-------------------------------------------------------------------------------------------**/
/**--Deshabilitar Drags                                                                       **/  
/**-------------------------------------------------------------------------------------------**/
	
	function disableDraggable(disable = false){
		document.ondragstart = () => !disable
	}

/**-------------------------------------------------------------------------------------------**/
/**--Deshabilitar Selección                                                                   **/  
/**-------------------------------------------------------------------------------------------**/
	
	function disableSelection(disable = false){
		document.onselectstart = () => !disable
	}

/**-------------------------------------------------------------------------------------------**/
/**--Funcion para Callbacks de evento de Windows                                              **/  
/**-------------------------------------------------------------------------------------------**/

	class WindowEvents{
		constructor(args = {}){
			this.props = {
				resize: {
					width: window.innerWidth,
					height: window.innerHeight,
				},
				scroll: {
					top: window.scrollY,
					left: window.scrollX,
				}
			}
			this.$afterResize = args.afterResize || function(){}
			this.$afterScroll = args.afterScroll || function(){}

			this.afterResize()
			this.afterScroll()
		}

		afterResize(){
			let $redimension;
			window.addEventListener("resize", ($event) => {
				this.props.resize.width = window.innerWidth
				this.props.resize.height = window.innerHeight

				clearTimeout($redimension)
				$redimension = setTimeout(() => {
					this.$afterResize(this.props.resize, $event)
				}, 300)
			})
		}
		afterScroll(){
			let $scroll;
			window.addEventListener("scroll", ($event) => {
				this.props.scroll.top = window.scrollY,
				this.props.scroll.left = window.scrollX,

				clearTimeout($scroll)
				$scroll = setTimeout(() => {
					this.$afterScroll(this.props.scroll, $event)
				}, 300)
			})
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**--Animacion para rutas internas (jQuery)                                                   **/  
/**-------------------------------------------------------------------------------------------**/

	function scrollTo(args = {}){

		let $btn = $(args.btn) || ".btn" 
		let $goTo = $(args.irHasta) || ".link"
		let $offSet = args.offset || 100
		let $time = args.time || 300

		$($btn).click(function (){
            $('html, body').animate({
                scrollTop: $($goTo).offset().top - $offSet
            }, $time);

        });
	}

/**-------------------------------------------------------------------------------------------**/
/**--Funciones de Textos en Consola                                                           **/  
/**-------------------------------------------------------------------------------------------**/

	function consola(args = {}){
		const $texto = args.texto || "Esta es la Consola de Desarrolladores"
		const $confirm = args.confirm || true
		const $error = args.error || false


		if($confirm && $error){
			console.log(
				`%cPerdon pero Elige un sola opción para tu mensaje: o es de confirmacion o es de Error`,
				`
					font-size: 12px;
					color: white;
					background-color: red;
					border-radius: 50px;
					padding: 10px;
				`
			)
		}
		else if($confirm){
			console.log(
				`%c${$texto}`,
				`
					font-size: 12px;
					color: white;
					background-color: lightgreen;
					border-radius: 8px;
					padding: 5px;
				`
			)
		}
		else if($error){
			console.log(
				`%c${$texto}`,
				`
					font-size: 12px;
					color: white;
					background-color: red;
					border-radius: 8px;
					padding: 5px;
				`
			)
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**--Funciones para comprobar si existe el objeto en la pagina actual                         **/  
/**-------------------------------------------------------------------------------------------**/

	function existe($selector){
		if(document.querySelectorAll($selector).length){
			return true
		}
		else{
			return false
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**--Funcion para Checar si una imagen es Obscura                                             **/  
/**-------------------------------------------------------------------------------------------**/

	function imagenObscura(imageSrc, callback) {
	    var fuzzy = 0.1;
	    var img = document.createElement("img");
	    img.src = imageSrc;

	    img.onload = function() {
	        // create canvas
	        var canvas = document.createElement("canvas");
	        canvas.width = this.width;
	        canvas.height = this.height;

	        var ctx = canvas.getContext("2d");
	        ctx.drawImage(this,0,0);

	        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	        var data = imageData.data;
	        var r,g,b, max_rgb;
	        var light = 0, dark = 0;

	        for(var x = 0, len = data.length; x < len; x+=4) {
	            r = data[x];
	            g = data[x+1];
	            b = data[x+2];

	            max_rgb = Math.max(Math.max(r, g), b);
	            if (max_rgb < 128)
	                dark++;
	            else
	                light++;
	        }

	        var dl_diff = ((light - dark) / (this.width*this.height));
	        if (dl_diff + fuzzy < 0)
	            callback(true); /* Dark. */
	        else
	            callback(false);  /* Not dark. */
	    }
	}

/**-------------------------------------------------------------------------------------------**/
/**--Funcion para Checar si esta en Mobile y cual es                                          **/  
/**-------------------------------------------------------------------------------------------**/
	
	const Mobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPod/i);
	    },
	    iPad: function () {
	        return navigator.userAgent.match(/iPad/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    Other: function () {
	        return navigator.userAgent.match(/Mobile/i);
	    },
	    Any: function() {
	        return (Mobile.Android() || Mobile.BlackBerry() || Mobile.iOS() || Mobile.iPad() || Mobile.Opera() || Mobile.Windows() || Mobile.Other());
	    }
	};

/**-------------------------------------------------------------------------------------------**/
/**--Funcion para Checar que navegador es                                                     **/  
/**-------------------------------------------------------------------------------------------**/

	const Navigator = {
	    Chrome: function() {
	        return navigator.userAgent.toLowerCase().match("chrome")
	    },
	    Firefox: function() {
	        return navigator.userAgent.toLowerCase().match("firefox")
	    },
	    Safari: function() {
	        return navigator.userAgent.toLowerCase().match("safari") && navigator.userAgent.toLowerCase().match("chrome") == null
	    },
	    Edge: function() {
	        return navigator.userAgent.toLowerCase().match("edge")
	    },
	    IE: function() {
	        return navigator.userAgent.match("MSIE") > -1
	    },
	};

/**-------------------------------------------------------------------------------------------**/
/**--Funcion para Checar que Sistema Operativo es                                             **/  
/**-------------------------------------------------------------------------------------------**/

	const OS = {
		Windows: function() {
			return navigator.appVersion.indexOf("Win") != -1
		},
		MacOS: function() {
			return navigator.appVersion.indexOf("Mac") != -1
		},
		Unix: function() {
			return navigator.appVersion.indexOf("X11") != -1
		},
		Linux: function() {
			return navigator.appVersion.indexOf("Linux") != -1
		},
		Android: function() {
			return navigator.appVersion.indexOf("Android") != -1
		},
	}
	
/**-------------------------------------------------------------------------------------------**/
/**--Detectar Orientacion del Dispositivo                                                     **/  
/**-------------------------------------------------------------------------------------------**/
		
	const deviceOrientation = {
		Landscape: function(){
			return window.innerWidth > window.innerHeight
		},
		Portrait: function(){
			return window.innerWidth < window.innerHeight
		},
		mobileLandscape: function(funcTrue, funcFalse){
			let $mediaQueryLadnscape = window.matchMedia(`(orientation: landscape)`);

			if($mediaQueryLadnscape.matches && Mobile.Any() && $(window).width() > 768) {  
				funcTrue()
			}

			$mediaQueryLadnscape.addListener(function(mediaQuery) {
				if(mediaQuery.matches && Mobile.Any() && $(window).width() > 768) {
					funcTrue()
				}
				else {
					funcFalse()
				}
			});
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**--Manejo de Cookies                                                                        **/  
/**-------------------------------------------------------------------------------------------**/

	function setCookie(cookieName,cookieValue,expirationDays) {
	  	let $fecha = new Date();
	  	$fecha.setTime($fecha.getTime() + (expirationDays*24*60*60*1000));
	  	let $expiracion = `expires=${$fecha.toGMTString()}`;
		document.cookie = `${cookieName}=${cookieValue};${$expiracion};path=/`;
	}

	function getCookie(cookieName) {
	  	let $nombre = cookieName + "=";
	  	let decodedCookie = decodeURIComponent(document.cookie);
	  	let ca = decodedCookie.split(';');
	  	for(let i = 0; i < ca.length; i++) {
	    	let c = ca[i];
	   		while (c.charAt(0) == ' ') {
	      		c = c.substring(1);
    		}
	    	if (c.indexOf($nombre) == 0) {
	      		return c.substring($nombre.length, c.length);
	    	}
	  	}
	  	return "";
	}

	function checkCookie(cookieName) {
		let $resultado = false;
		let $nombre = getCookie(cookieName);
		if ($nombre != "") {
	    	$resultado = true;
		}
		return $resultado;
	}

	function deleteCookie(cookieName) {
		setCookie(cookieName, "", -1)
	}

/**-------------------------------------------------------------------------------------------**/
/**--Funcion para Scroll.                                                                     **/  
/**-------------------------------------------------------------------------------------------**/
	
	function removeScroll($removeScroll = false){
		const $html = document.querySelector("html")
		const $body = document.querySelector("body")
		if($removeScroll == true){
			$html.style.overflow = "hidden"
			$body.style.overflow = "hidden"
		}
		else{
			$html.setAttribute("style", "")
			$body.setAttribute("style", "")
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**--Cascada de Imagenes Plugin                                                              **/  
/**-------------------------------------------------------------------------------------------**/

	function cascadaImg(args = {}){
		args.selectorImg.hide()
		args.selectorImg.css({
			"position": "fixed",
			"top": "unset",
			"left": "unset",
			"right": "unset",
			"bottom": "unset",
			"height": "auto",
			"max-width": "100%",
		})

		args.container.css({
			"overflow": "hidden",
			"transform": "scale(1)",
		})
		
		let $thisRandom = []
		args.selectorImg.each(function($indexImg){
			let $flowTo = args.flowTo || "bottom"

			let $min, $max, $random, $randomMoveX

			let $containerWidth = args.container.width()
			let $containerHeight = args.container.height()
			
			let $imgWidth = $(this).width()
			let $imgHeight = $(this).height()
	
			const $distanciaFinal = $containerHeight + 10

			const $totalItems = args.selectorImg.length

			let $translateTime = args.duration || 10
			let $delay = ($translateTime / $totalItems) * ($indexImg + 1) * 1000
			
			const $activarHover = args.activeHover || false
			if($activarHover == true){
				let $distanciaRestante, $tiempoRestante
				let $hoverResistence = args.hoverResistence + 1 || 2


				if($flowTo == "bottom"){
					$(this).hover(
						function(){
							args.selectorImg.css("z-index", 0)
							$(this).css("z-index", 1)

							args.selectorImg.each(function(caso){

								if(($(this).offset().top + $(this).height()) > args.container.offset().top && $(this).offset().top < (args.container.offset().top + $containerHeight)){
									$distanciaRestante = $distanciaFinal + args.container.offset().top - $(this).offset().top
									$tiempoRestante = ($distanciaRestante * $translateTime) / $distanciaFinal
									if($thisRandom[caso]["$random"] <= $containerWidth / 2){
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] + $thisRandom[caso]["$randomMoveX"],
											"top": $distanciaFinal,
										}, $translateTime * 1000 * $hoverResistence, "linear")
									}
									else{
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] - $thisRandom[caso]["$randomMoveX"],
											"top": $distanciaFinal,
										}, $translateTime * 1000 * $hoverResistence, "linear")
									}
								}
							})
						},
						function(){
							args.selectorImg.each(function(caso){
								
								if(($(this).offset().top + $(this).height()) > args.container.offset().top && $(this).offset().top < (args.container.offset().top + $containerHeight)){
									$distanciaRestante = $distanciaFinal + args.container.offset().top - $(this).offset().top
									$tiempoRestante = ($distanciaRestante * $translateTime) / $distanciaFinal

									if($thisRandom[caso]["$random"] <= $containerWidth / 2){
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] + $thisRandom[caso]["$randomMoveX"],
											"top": $distanciaFinal,
										}, $tiempoRestante * 1000, "linear")
									}
									else{
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] - $thisRandom[caso]["$randomMoveX"],
											"top": $distanciaFinal,
										}, $tiempoRestante * 1000, "linear")
									}
								}
							})
						}
					)
				}
				else if($flowTo == "top"){
					$(this).hover(
						function(){
							args.selectorImg.css("z-index", 0)
							$(this).css("z-index", 1)

							args.selectorImg.each(function(caso){

								if(($(this).offset().top + $(this).height()) > args.container.offset().top && $(this).offset().top < (args.container.offset().top + $containerHeight)){
									$distanciaRestante = $(this).offset().top + $(this).height() - args.container.offset().top - 10
									$tiempoRestante = ($distanciaRestante * $translateTime) / $distanciaFinal
									if($thisRandom[caso]["$random"] <= $containerWidth / 2){
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] + $thisRandom[caso]["$randomMoveX"],
											"top": -$imgHeight - 10,
										}, $translateTime * 1000 * $hoverResistence, "linear")
									}
									else{
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] - $thisRandom[caso]["$randomMoveX"],
											"top": -$imgHeight - 10,
										}, $translateTime * 1000 * $hoverResistence, "linear")
									}
								}
							})
						},
						function(){
							args.selectorImg.each(function(caso){
								
								if(($(this).offset().top + $(this).height()) > args.container.offset().top && $(this).offset().top < (args.container.offset().top + $containerHeight)){
									$distanciaRestante = $(this).offset().top + $(this).height() - args.container.offset().top - 10
									$tiempoRestante = ($distanciaRestante * $translateTime) / $distanciaFinal
									if($thisRandom[caso]["$random"] <= $containerWidth / 2){
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] + $thisRandom[caso]["$randomMoveX"],
											"top": -$imgHeight - 10,
										}, $tiempoRestante * 1000, "linear")
									}
									else{
										$(this).stop(true).animate({
											"left": $thisRandom[caso]["$random"] - $thisRandom[caso]["$randomMoveX"],
											"top": -$imgHeight - 10,
										}, $tiempoRestante * 1000, "linear")
									}
								}
							})
						}
					)
				}
			}
			
			$(this).load(function(){
				$(this).show()
				cascada($(this))
			})
			
			function cascada($elemento){
				$containerWidth, $containerHeight, $min, $max, $random, $randomMoveX = 0

				$imgWidth = $elemento.width()
				$imgHeight = $elemento.height()

				$containerWidth = args.container.width()
				$containerHeight = args.container.height()

				$min = 0 - ($imgWidth / 2)
				$max = $containerWidth - ($imgWidth / 2)
				$delay = ($translateTime / $totalItems) * ($indexImg + 1) * 1000

				$random = ~~(Math.random() * ($max - $min) + $min)
				$randomMoveX = ~~(Math.random() * (($containerWidth / 2) - ($containerWidth / 4)) + ($containerWidth / 4))
				
				$thisRandom[$indexImg] = []
				$thisRandom[$indexImg]["$random"] = $random
				$thisRandom[$indexImg]["$randomMoveX"] = $randomMoveX
				
				if($flowTo == "bottom"){
					$elemento.css({
						"left": $random,
						"top": -$imgHeight - 10,
					})
					if($random <= $containerWidth / 2){
						$elemento.delay($delay)
							.animate({
								"left": $random + $randomMoveX,
								"top": $distanciaFinal,
							}, $translateTime * 1000, "linear")
					}
					else{
						$elemento.delay($delay)
							.animate({
								"left": $random - $randomMoveX,
								"top": $distanciaFinal,
							}, $translateTime * 1000, "linear")
					}
				}
				else if($flowTo == "top"){
					$elemento.css({
						"left": $random,
						"top": $containerHeight + 10,
					})
					if($random <= $containerWidth / 2){
						$elemento.delay($delay)
							.animate({
								"left": $random + $randomMoveX,
								"top": -$imgHeight - 10,
							}, $translateTime * 1000, "linear")
					}
					else{
						$elemento.delay($delay)
							.animate({
								"left": $random - $randomMoveX,
								"top": -$imgHeight - 10,
							}, $translateTime * 1000, "linear")
					}
				}
			}
			
			if($flowTo == "bottom"){
				setInterval(() => {
					if($(this).offset().top > ($containerHeight + args.container.offset().top)){
						$(this).stop(true)
						cascada($(this))
					}
				},1000)
				
			}
			else if($flowTo == "top"){
				setInterval(() => {
					if($(this).offset().top + $(this).height() < (args.container.offset().top)){
						$(this).stop(true)
						cascada($(this))
					}
				},1000)
			}

		})
	}

/**-------------------------------------------------------------------------------------------**/
/**--Plugin de destello desvanecedor                                                          **/  
/**-------------------------------------------------------------------------------------------**/

	function shadowShape(args = {}){
		let $tamañoInicial = args.tamañoInicial || 0
		let $tamañoFinal = args.tamañoFinal || 150
		let $duration = args.duration || 500
		let $shape = args.shape || "none"
		let $mode = args.mode || "general"
		let $color = args.color || "#f00"
		// let $eventGeneral = args.event || "click" || "mousemove" || "mouseenter" || "mouseleave"
		let $eventGeneral = args.event || "click"

		if($mode == "general"){
			$("html").on($eventGeneral, function($event){
				const $onda = $("<span></span>")

				if(args.color == "random"){
					let $colorRandom = Math.round(Math.random() * (360-0) + 0)
					$color = `hsl(${$colorRandom}, 100%, 30%)`
				}

				$onda.css({
					"clip-path": $shape,
					"width": $tamañoInicial,
					"height": $tamañoInicial,
					"top": $event.pageY,
					"left": $event.pageX,
					"position": "absolute",
					"border-radius": "50%",
					"padding": 0,
					"margin": 0,
					"opacity": "0.6",
					"transform": "translate3d(-50%, -50%, 0)",
					"background-color": $color,
				})
				.appendTo($("body"))
				.animate({
					"width": $tamañoFinal,
					"height": $tamañoFinal,
					"opacity": 0,
				}, $duration, function(){
					$(this).remove()
				})
			})
		}

		else if($mode == "item"){
			let $item = args.item
			$($item).on($eventGeneral, function($event){
				const $onda = $("<span></span>")

				if(args.color == "random"){
					let $colorRandom = Math.round(Math.random() * (360-0) + 0)
					$color = `hsl(${$colorRandom}, 100%, 30%)`
				}

				$(this).css({
					"position": "relative",
					"overflow": "hidden",
				})

				$onda.css({
					"clip-path": $shape,
					"width": $tamañoInicial,
					"height": $tamañoInicial,
					"top": $event.pageY - $(this).offset().top,
					"left": $event.pageX - $(this).offset().left,
					"position": "absolute",
					"border-radius": "50%",
					"padding": 0,
					"margin": 0,
					"opacity": "0.6",
					"transform": "translate3d(-50%, -50%, 0)",
					"background-color": $color,
				})
				.appendTo($(this))
				.animate({
					"width": $tamañoFinal,
					"height": $tamañoFinal,
					"opacity": 0,
				}, $duration, function(){
					$(this).remove()
				})
			})
		}
	}

/**-------------------------------------------------------------------------------------------**/
/**--Función Colecciones en Tabs                                                          **/  
/**-------------------------------------------------------------------------------------------**/

	function ColeccionesTabs(){
		if(existe(".ColeccionesTabs")){
			const $ColeccionesTabs = $(".ColeccionesTabs")

			// si esta en responsivo se inicializa el slider
				if(window.innerWidth <= 768){
					$ColeccionesTabs.find(".colecciones .coleccion.visible .grid-coleccion").slick({
				        infinite: true,
				        slidesToShow: 1,
				        slidesToScroll: 1,
				        arrows: false,
				        dots: false,
			      	});
				}

			// control del Menu
				$ColeccionesTabs.find(".menu-tabs li").click(function(){
					$ColeccionesTabs.find(".menu-tabs li").removeClass("active")
					$(this).addClass("active")

					const $indexOpcionActual = $(this).index()

					if(window.innerWidth <= 768){
						$ColeccionesTabs.find(".colecciones .coleccion.visible .grid-coleccion").slick("unslick");
					}

					$ColeccionesTabs.find(".colecciones .coleccion").removeClass("visible")
					$ColeccionesTabs.find(".colecciones .coleccion").eq($indexOpcionActual).addClass("visible")

					if(window.innerWidth <= 768){
						$ColeccionesTabs.find(".colecciones .coleccion.visible .grid-coleccion").slick({
					        infinite: true,
					        slidesToShow: 1,
					        slidesToScroll: 1,
					        arrows: false,
					        dots: false,
				      	});
					}
				})

			// Check cuando hace resize
				new WindowEvents({
					afterResize: (props, event) => {
					    if(props.width <= 768){
					    	if(!existe(".coleccion.visible .slick-initialized")){
								$ColeccionesTabs.find(".colecciones .coleccion.visible .grid-coleccion").slick({
							        infinite: true,
							        slidesToShow: 1,
							        slidesToScroll: 1,
							        arrows: false,
							        dots: false,
						      	});
					    	}
						}
						else{
							if(existe(".coleccion.visible .slick-initialized")){
								$ColeccionesTabs.find(".colecciones .coleccion.visible .grid-coleccion").slick("unslick");
					    	}
						}
					}
				})
		}
	}










//-
