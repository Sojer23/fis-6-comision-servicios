var delayInMilliseconds = 1000; //1 second

setTimeout(function() {
  jQuery(function ()
   {
     jQuery("#f_elem_city").autocomplete({
      source: function (request, response) {
       jQuery.getJSON(
        /*"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+request.term*/
        "https://ciudadesapi.firebaseio.com/ciudades/-LVlTGUfFo6CvB5PjHAC/ciudades.json",
        function (data) {
          console.log(data);
         var res = data.filter(city => city.toLowerCase().includes(request.term.toLowerCase()));
         console.log(res);
         response(res);
        }
       );
      },
      minLength: 3,
      select: function (event, ui) {
       var selectedObj = ui.item;
       jQuery("#f_elem_city").val(selectedObj.value);
      getcitydetails(selectedObj.value);
       return false;
      },
      open: function () {
       jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
      },
      close: function () {
       jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
      }
     });
     jQuery("#f_elem_city").autocomplete("option", "delay", 100);
    });
}, delayInMilliseconds);
