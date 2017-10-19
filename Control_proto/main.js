$(function () {
	var infos = [];
    var socket = io.connect('http://10.16.90.8:3000');
    $('form').submit(function(){
    	infos = $('#formulario').serializeArray();
		infos.push({value: "PROTOCOLO"});
		infos.push({value: "SENHA"});
        socket.emit('chat message', infos);
      	$('#m').val('');
      	return false;
    });
});
