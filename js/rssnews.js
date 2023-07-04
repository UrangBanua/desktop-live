    // read nodes value from xml file and set do array data wtih log
    function readXMLToArray(xmlFile, tagname) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          // Ambil data XML
          var xmlDoc = this.responseXML;
          
          //var element = document.getElementById("stypewrite");

          // Ambil data tabel
          var x = xmlDoc.getElementsByTagName(tagname);
          var titleArray = [];
          for (i = 0; i <x.length; i++) {
            titleArray.push(x[i].childNodes[0].nodeValue);
          }
          //element.setAttribute("data-type", '['+titleArray+']');
          console.log(titleArray);
        }
      };
      xhttp.open("GET", xmlFile, true);
      xhttp.setRequestHeader('Content-Type', 'text/xml');
      xhttp.send();
    }

    readXMLToArray("../banjarmasin.tribunnews.com_rss.xml", "title");