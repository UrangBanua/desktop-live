var titleArray = [];
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    // read nodes value from xml file and set do array data wtih log
    function readXMLToArray(xmlFile, tagname) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          // Ambil data XML
          var xmlDoc = this.responseXML;
          
          var element = document.getElementById("stypewrite");

          // Ambil data tabel
          var x = xmlDoc.getElementsByTagName(tagname);
          //var titleArray = [];
          for (i = 0; i <x.length; i++) {
            titleArray.push(x[i].childNodes[0].nodeValue);
          }
          element.setAttribute("data-type", titleArray);
          console.log(titleArray);
        }
      };
      xhttp.open("GET", xmlFile, true);
      xhttp.setRequestHeader('Content-Type', 'text/xml');
      xhttp.send();
    }
    
    try {
        //readXMLToArray("../banjarmasin.tribunnews.com_rss.xml", "title");
        readXMLToArray("../cnnindonesia.com_teknologi_rss.xml", "title");
    } catch (e) {
        console.log(e);
    } finally {
        console.log("finally window.onload");
        window.onload = function() {
            var elements = document.getElementsByClassName('typewrite');
            for (var i=0; i<elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                new TxtType(elements[i], titleArray, period);
                }
            }
        }
        
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };