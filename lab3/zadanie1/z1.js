


var header = document.getElementById('header')
var aside = document.getElementById('aside')
var nav = document.getElementById('nav')
var main = document.getElementById('main')
var footer = document.getElementById('footer')
var nav_ul = document.getElementById('nav_ul')


function ustaw(){

    // Usuwam klasę 'azure' odpowiedzialną za styl, wykorzystując do tego operację na klasach elementu

    header.classList.remove('azure')
    aside.classList.remove('azure')
    nav.classList.remove('azure')
    main.classList.remove('azure')
    footer.classList.remove('azure')
    nav_ul.classList.remove('azure')

    // Creating a class with common style settings
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.cssClass { border: thin solid black; box-shadow: 0 0 8px rgb(85, 151, 173); background-color: rgb(238, 254, 255);  }';
    document.getElementsByTagName('head')[0].appendChild(style);



    // Adding a style to web objects
    header.style.border = 'thin solid black';
    header.style.boxShadow = '0 0 8px rgb(85, 151, 173)';
    header.style.backgroundColor = 'rgb(238, 254, 255)';
    header.style.paddingTop = '2px';
    header.style.paddingLeft = '10px';
    header.style.paddingBottom = '2px';
    header.style.margin = '10px';
    header.style.position = 'relative';
    
    
    aside.style = "padding-bottom: 8px; padding-left: 8px; padding-top: 3px; padding-right: 8px; text-align: left; margin: 10px; float: right; width: 50%; position: relative; width: 30%;"
    aside.classList.add('cssClass')
    nav.style = "margin: 10px 10px 20px 10px;padding-top: 25px;padding-bottom: 25px;padding-right: 8px;text-align: right;float: left;width: 10%;"
    nav.classList.add('cssClass')

    main.style = "padding-left: 10px;margin: 15px 10px 10px 10px;    clear: left;    width: 40%;    text-align: left; width: 25%;"
    main.classList.add('cssClass')

    footer.style = "padding-top: 11px;    padding-bottom: 8px;    padding-left: 5px;    margin: 13px 10px 10px 10px;    clear: both;"
    footer.classList.add('cssClass')

    nav_ul.style = "padding-top: 1px;    padding-bottom: 1px;    padding-right: 1px;    text-align: right; width: 50%; float: right;"



}


function skasuj(){

    // Deleteting class with style settings
    header.classList.remove('cssClass')
    aside.classList.remove('cssClass')
    nav.classList.remove('cssClass')
    main.classList.remove('cssClass')
    footer.classList.remove('cssClass')
    nav_ul.classList.remove('cssClass')

    // Deleting object's individual style settings
    header.style = ""
    aside.style = ""
    nav.style = ""
    main.style = ""
    footer.style = ""
    nav_ul.style = ""
    
}
