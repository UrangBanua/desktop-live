// Fungsi untuk memuat data XML dari url
    function loadXMLDoc(url) {
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, false);
      xhttp.send();
      return xhttp.responseXML;
    }

// Fungsi untuk menampilkan data XML ke tabel
    function displayXML(url) {
      var xml = loadXMLDoc(url); // Memuat data XML dari url
      var table = document.getElementById("xml-table"); // Mendapatkan elemen tabel
      var x = xml.getElementsByTagName("item"); // Mendapatkan elemen item dari data XML
      for (var i = 0; i < x.length; i++) { // Melakukan iterasi untuk setiap item
        var row = table.insertRow(i); // Menyisipkan baris baru ke tabel
        var title = row.insertCell(0); // Menyisipkan sel baru untuk judul
        var link = row.insertCell(1); // Menyisipkan sel baru untuk link
        title.innerHTML = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue; // Mengisi sel judul dengan nilai dari elemen title
        link.innerHTML = x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue; // Mengisi sel link dengan nilai dari elemen link
      }
    }