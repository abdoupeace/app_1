$(document).ready(function  () {
	start();
});



function start () {
	$.getJSON(
	"http://purefoot.ovh/app/php/news.php", // The server URL 
	{ type: "start",continent : "europe",club : "rma" ,league : "test" }, // Data you want to pass to the server.
	show // The function to call on completion.
	);
}


function show(json) { //show the resolte of the jsonimg/"+json[i]['img']+"');'

for (var i = 0; i < json.length; i++) {
		var NewsElement = "<div class='news'>"+
							"<a href='#page_info' id ='"+json[i]['info']+"' onclick='textt(\""+json[i]['info']+"\")'>"+
								"<div class='in_news' id='img_"+json[i]['info']+"' style='background-image: url(img/"+json[i]['img']+");'>"+
									"<div class='space'></div>"+
									"<h2>"+json[i]['title']+"</h2>"+
									"<p style='display:none'>"+json[i]['text']+"</p>"+
								"</div>"+
							"</a>"+
						  "</div>";
		$("#news_contener").append(NewsElement);
	}

}

function textt (id) {
	var dd = document.getElementById(id);
	d = "#img_"+id;
	aa = $(d).css( "background-image" );
	a = aa.split('img/');
	ac = a[1].split('.');
	document.getElementById('page_info').getElementsByTagName('img')[0].src = "img/"+ac[0]+".jpg";
	document.getElementById('page_info').getElementsByTagName('p')[0].innerHTML = dd.getElementsByTagName('p')[0].innerHTML;
	document.getElementById('page_info').getElementsByTagName('h2')[0].innerHTML = dd.getElementsByTagName('h2')[0].innerHTML;
	
}




