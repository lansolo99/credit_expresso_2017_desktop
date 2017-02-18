//Fonctions utiles javascript
function displayClock(id) {
}

function hasGETParameters(url){
	var regexp=new RegExp("[?&]");
	var tab=url.split(regexp);
	return tab.length<=1;
}

function getGETParameterValue(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if(results == null) {
		return null; 
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

function includeCssFile(cssFile) {
	var c_link = document.createElement('link'); 
	c_link.setAttribute("href",cssFile); 
	c_link.setAttribute("rel","stylesheet"); 
	c_link.setAttribute("type","text/css"); 
	document.getElementsByTagName("head").item(0).appendChild(c_link);
}

function includeJsFile(jsFile, callback) {
	var head = document.getElementsByTagName('head')[0];
	var scriptElement = document.createElement('script');
	scriptElement.type = 'text/javascript';
	scriptElement.src = jsFile;

	if(!callback) callback = function(){}; // ????????? JUST ADD THIS LINE!

	// bind the event to the callback function
	if(scriptElement.addEventListener) {
		scriptElement.addEventListener("load", callback, false); // IE9+, Chrome, Firefox
	}
	else if(scriptElement.readyState) {
		scriptElement.onreadystatechange = function(){
			if( this.readyState === "loaded" || this.readyState === "complete" ){
				callback.apply(this, arguments);
			}
		}; // IE8
	}

	// fire the loading
	head.appendChild(scriptElement);
}

function n2g_isEmptyString(sValue) {
	return !sValue || sValue == "";
}

function n2g_writeInConsole(text) {
	if (typeof console !== "undefined") {
		console.log(text);
	}
}

function n2g_isSecureSite() {
	if (typeof isSecureSite == "undefined") {
		return false;		
	} 
	return isSecureSite;
}

function n2g_getCurrentPageCharSet() {
	return document.characterSet ? document.characterSet : document.charset;
}

function ngp_recherche(formulaire){
	var charset = n2g_getCurrentPageCharSet();
	if(!n2g_isEmptyString(charset) && charset.toLowerCase() != "utf-8") {
		formulaire.elements["chl_50_document_encoding"].value = charset;
	}
	
	var mots = formulaire.elements["chl_200_param_rech"];
	var reg = new RegExp("^[ \f\n\r\t\v]*$","g");
	var reg2 = new RegExp("^.{3,}$");
	if(reg.test(mots.value) ){
		mots.value = "Rechercher";
		alert("Aucun document ne correspond aux termes de recherche sp\351cifi\351s.\n Merci d'essayer en modifiant les crit\350res.");
		return false;
	}
	else if (!reg2.test(mots.value)){ 
		mots.value = "Rechercher";
		alert("Aucun document ne correspond aux termes de recherche sp\351cifi\351s.\n Merci d'essayer en modifiant les crit\350res.");
		return false;
	}
	else if (mots.value==("Rechercher")){ 
		mots.value = "Rechercher";
		alert("Aucun document ne correspond aux termes de recherche sp\351cifi\351s.\n Merci d'essayer en modifiant les crit\350res.");
		return false;
	}
	else {
		if(window.location.search.length<2)	
			formulaire.elements["url_1200_source"].value = window.location;
		return true;
	}
}

// #####################################
// Methode de redimensionnement pour les fenêtre qui contiennent des formulaires de type CONTAINER.
var max_flash_width = 600; // taille a definir suivant le gabarit
function resizeFlash(w,h,id){ 
  // force the w and h to be within limits set above 
  w = Math.min(w, max_flash_width);

  // then resize the flash element using w and h 
  var flash_elem = document.getElementById(id);//nom de l objet ex: ctnFlexDiv0976f3e4e2475210VgnVCM1000000e1142c0RCRD
  flash_elem.width = w; 
  flash_elem.height = h;

  if (navigator.userAgent.toLowerCase().indexOf("safari") != - 1){
    var flash_elem = document.getElementById(id); 
    flash_elem.width = w; 
    flash_elem.height = h; 
  }
}
// #####################################
/**
 * Encode la valeur en base 64.
 * @param input: chaine de caracteres a encoder.
 * @returns {String} la valeur encode.
 */
function ctnEncode64(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
				+ keyStr.charAt(enc3) + keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);

	return output;
}

/**
 * Decode la valeur en base 64.
 * @param input: chaine de caracteres a decoder.
 * @returns {String} la valeur decode.
 */
function ctnDecode64(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}

		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);

	return unescape(output);
}

/**
* Ajoute une classe css a un element
*/
function addCssClass(element, className) {
	var cn = element.className;
	if(cn.indexOf(className) != -1) {
		return;
	}
	if(cn != '') {
		className = ' '+className;
	}
	element.className = cn+className;
}

/**
* Enleve une classe css a un element
*/
function removeCssClass(className, element) {
	var cn = element.className;
	var rxp = new RegExp("\\s?\\b"+classname+"\\b", "g");
	cn = cn.replace(rxp, '');
	element.className = cn;
}

/**
* Affichage compteur releves non lus 
*/
function n2g_affiche_nb_releves_non_lus(idDiv) {
	try {
		var elem = document.getElementById(idDiv);
		var intNbReleves=0;
		var strNbReleves=null;
		if (typeof (getNbReleves) == 'function') {
			intNbReleves = parseInt(getNbReleves());
			var spanId = 'compteur_'+idDiv;
			var spanElem = document.getElementById(spanId);
			if(intNbReleves > 0) {
				if(intNbReleves >= 100) {
					strNbReleves = "99+";
				} else {
					strNbReleves = intNbReleves.toString();
				}
				if(spanElem != null) {
					spanElem.innerHTML="";
					spanElem.appendChild(document.createTextNode(strNbReleves));
				} else {
					elem.innerHTML += '<span class="n2g_lgn_compteur" id="'+spanId+'">'+strNbReleves+'</span>';
				}
			} else {
				if(spanElem != null) {
					elem.removeChild(spanElem);
				}
			}
			addCssClass(elem, "n2g_lgn_compteur_container");
		}
	} catch (e) {}
}

function n2g_actualiser_nb_releves_non_lus() {
	if(typeof($jNgp) != "undefined" && $jNgp != null) {
		$jNgp(".n2g_menu_section_item .n2g_lgn_compteur_container").each(function() {
			var idElem = $jNgp(this).attr("id");
			n2g_affiche_nb_releves_non_lus(idElem);
			return false;
		});
	}
}

/**
* Affichage compteur messages non lus 
*/
function n2g_get_nb_messages_non_lus(displayFunction, idDiv){
	var req;
	
	if ((typeof XMLHttpRequest) && (typeof XMLHttpRequest != 'undefined')) {
	//		/* IE7, Gecko, Opera, AppleWebKit, ... */
			req = new XMLHttpRequest();
		}
		else {
			try {
				/* MSIE */
				req = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e) {
				try {
					/* MSIE (old fashioned) */
					req = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e) {
					alert("Votre navigateur ne supporte pas la technologie XMLHttpRequest, merci de le mettre " +
					    unescape("%E0") + " jour.");
					return;
				}
			}
		}
	
		req.onreadystatechange = function()
		{
			/* Result loaded? (state 4) */
			if (req.readyState == 4) {
				if (req.status != 200 || req.responseXML == null || req.responseXML == undefined
				  || req.responseXML.firstChild == null || req.responseXML.firstChild == undefined
				  || req.responseXML.getElementsByTagName("NbMessage") == null
				  || req.responseXML.getElementsByTagName("NbMessage")[0].firstChild == null) {
					nb_msg = -1;
				} else {
					nb_msg = req.responseXML.getElementsByTagName("NbMessage")[0].firstChild.nodeValue;
				}
				if (displayFunction != null) {
					displayFunction(nb_msg, idDiv);
				}
				setNbMessages(nb_msg);
			}
		}
		var now = new Date();
		req.open("GET", "/gms/gmsInfoServlet?timestamp=" + now.getTime(), true);
		req.send(null);
}

function n2g_maj_html_nb_messages_non_lus(nbMsg, idDiv) {
		var intNbMessages = parseInt(nbMsg);
		var strNbMessages = null;
		var elem = document.getElementById(idDiv);
		if(intNbMessages > 0) {
			if(intNbMessages >= 100) {
				strNbMessages = "99+";
			} else {
				strNbMessages = intNbMessages.toString();
			}
			addCssClass(elem, "n2g_menu_lgn_messagerie");
			elem.innerHTML += '<span class="n2g_lgn_msg_mg_boite_reception_nombre_mail">'+strNbMessages+'</span>';
			// Appel le rafraichissement du menu si besoin
			if(typeof(menuHautRefresh) == "function") {
				menuHautRefresh();
			}
		}
}

function n2g_affiche_nb_messages_non_lus(idDiv) {
	try {
		if (typeof (getNbMessages) == 'function') {
			var nbMsgRetourne = getNbMessages();
			if (nbMsgRetourne == null || nbMsgRetourne == '' || nbMsgRetourne < 0) {
					n2g_get_nb_messages_non_lus(n2g_maj_html_nb_messages_non_lus, idDiv);
			} else {
					n2g_maj_html_nb_messages_non_lus(nbMsgRetourne, idDiv);
			}
		}
	} catch (e) {}
}

function getSegIds() {
	var retrieve = function(n){
		var m, k='kxsocgenprod_'+n;
		if (window.localStorage) {
			return window.localStorage[k] || "";
		} else if (navigator.cookieEnabled) {
			m = document.cookie.match(k+'=([^;]*)');
			return (m && unescape(m[1])) || "";
		} else {
			return '';
		}
	};

	return retrieve('segs');
}

/* NGIM lot5 - fix menus */
(function($){
  'use strict';

  function handler( event ) {
    var target = $( event.target );
    if ( target.is( "#n2g_profil_toggle" ) ||  target.is( ".n2g_picto_arrow_up_down" )) {
      $("#n2g_profil_toggle .n2g_picto_arrow_up_down").toggleClass('n2g_toggle_open');
      $("#n2g_profil_toggle_content").slideToggle();
    }
  }

  $(function(){
	if($(".n2g_profil_connexion_deco").length > 0)
		$( "#n2g_profil_toggle" ).attr("title","Code secret oublié");  
	  
    /* Block profil */
    var $searchBarNav = $('#n2g_formulaire_de_recherche_barre_navigation'),
    $inputSubmit = $searchBarNav.find('input.submit'),
    $inputChamp = $searchBarNav.find('input#mots_cles');

    // Gestion du toggle Profil et code secret (Liste dÃ©roulante)
    $( "#n2g_profil_toggle" ).click( handler );

    // Affichage du champ de recherche au survol de la souris sur le boutton de recherche
    $($searchBarNav.selector + ', ' + $inputSubmit.selector).mouseout(function() {

      if ($(this)[0] === $inputSubmit[0]) {
        $searchBarNav.removeClass('hover');
      }else {
        $(this).removeClass('hover');
      }
        $($inputChamp.selector).hide();
      })
      .mouseover(function() {
        if ($(this)[0] === $inputSubmit[0]) {
        $searchBarNav.addClass('hover');
      }else {
        $(this).addClass('hover');
      }
      $($inputChamp.selector).show();
      });
  });

}(jQuery));
