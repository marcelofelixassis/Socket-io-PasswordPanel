$(function () {
  var socket = io.connect('http://10.16.90.8:3000');
  var anterior = new Array();
  var contador = 0;
  var hora, minuto;
  var d;
  socket.on('chat message', function(msg){
    d = new Date();
    $('#nome').text(msg[0]['value']);
    $('#tipo').text(msg[3]['value']);
    $('#numero').text(msg[1]['value']);
    $('#numero_sala').text('SALA: '+msg[2]['value']);
    $('#senha_numero').text(msg[4]['value']);
  
    if(contador > 0 ){
      $(".list ul").prepend('<li class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h3 class="mb-1">'+anterior[0]['value']+'</h3><span class="badge badge-default badge-pill" style="font-size: 20px;">'+hora+':'+minuto+'</span></div><h5>'+anterior[3]['value']+': '+anterior[1]['value']+'</h5><h6>SALA: '+anterior[2]['value']+'</h6></li>');
    }

    if(contador > 6){
      $('.list-group li:last-child').remove();
    }

    var audio = new Audio('som.mp3');
    audio.play();

    hora = d.getHours();
    minuto = d.getMinutes();
    anterior = msg;
    contador = contador + 1;
  });
});