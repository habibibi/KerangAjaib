function getDayOfWeek(dateString) {
    var dateParts = dateString.split("/");

    var months = [
      "Januari", "Februari", "Maret", "April",
      "Mei", "Juni", "Juli", "Agustus",
      "September", "Oktober", "November", "Desember"
    ];
    var daysOfWeek = ["Hari Minggu", "Hari Senin", "Hari Selasa", "Hari Rabu", "Hari Kamis", "Hari Jumat", "Hari Sabtu"];
    
    var date = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10);
    var year = parseInt(dateParts[2], 10);
    
    var x = year % 100;
    var y = Math.floor(year / 100);
    var h = (date + Math.floor((13 * (month + 1)) / 5) + x + Math.floor(x / 4) + Math.floor(y / 4) - (2 * y)) % 7 - 1;
    
    var monthName = months[month - 1];
    var dayOfWeek = daysOfWeek[h];
    
    return dayOfWeek;
  }
  
  // Contoh penggunaan
  var date = "04/05/2023";
  var day = getDayOfWeek(date);
  console.log(day); 
  