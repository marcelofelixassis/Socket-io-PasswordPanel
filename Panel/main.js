$(function () {
  var socket = io.connect('http://10.16.90.8:3000');
  var anterior = new Array();
  var contador = 0;
  var hora, minuto;
  var d;
  var color;
  socket.on('chat message', function(msg){
    d = new Date();
    /*----------------------------------- 
      Assigning value to html
    ------------------------------------*/
    $('#nome').text(msg[0]['value']);
    $('#tipo').text(msg[3]['value']);
    $('#numero').text(msg[1]['value']);
    $('#numero_sala').text('SALA: '+msg[2]['value']);
    $('#senha_numero').text(msg[4]['value']);

    /*-----------------------------------
      Ignore the first call
    ------------------------------------*/
    if(contador > 0 ){
      $(".list ul").prepend('<li class="list-group-item list-group-item-action flex-column align-items-start" style="background-color:#'+color+';"><div class="d-flex w-100 justify-content-between"><h3 class="mb-1">'+anterior[0]['value']+'</h3><span class="badge badge-default badge-pill" style="font-size: 20px;">'+hora+':'+minuto+'</span></div><h5>'+anterior[3]['value']+': '+anterior[1]['value']+'</h5><h6>SALA: '+anterior[2]['value']+'</h6></li>');
    }

    /*-----------------------------------
      limit list to 6 elements
    ------------------------------------*/
    if(contador > 6){
      $('.list-group li:last-child').remove();
    }

    /*-----------------------------------
      Play audio
    ------------------------------------*/
    var audio = new Audio('som.mp3');
    audio.play();

    /*-----------------------------------
      Change color according to the call
    ------------------------------------*/
    if(msg[3]['value'] == "PROTOCOLO"){
      color = "FFFACD";
    }else{
      color = "FFDAB9";
    }

    /*-----------------------------------
      Set variables
    ------------------------------------*/
    hora = d.getHours();
    minuto = d.getMinutes();
    anterior = msg;
    contador = contador + 1;

    $.ajax({
      type : "GET",
      url : "http://10.16.90.54/atendimento/main.php?name="+msg[0]['value']+
                          "&type="+msg[3]['value']+
                          "&number="+msg[1]['value']+
                          "&room="+msg[2]['value']+
                          "&hour="+d,
      contentType: "application/json; charset=UTF-8",
      success: function (response) {
      },
      error: function (e) {
      } 
    });
  });
});