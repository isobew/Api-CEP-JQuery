$(document).ready(() => {
    $('#btn').on('click', function () {
        const numeroCep = $('#cep').val();
        const url = `https://cep.awesomeapi.com.br/json/${numeroCep}`
        let dadoIncorreto;

        $.ajax({
            url: url,
            type: "get",
            dataType: "json",

            //em caso de cep encontrado, buscar os dados do objeto:
            success: function (dados) {
                console.log(dados)
                const latitude = dados.lat;
                const longitude = dados.lng;
                $("#estado").val(dados.state)
                $("#cidade").val(dados.city)
                $("#rua").val(dados.address)
                $("#ddd").val(dados.ddd)
                $("#bairro").val(dados.district)
                $("#mapa").attr(`src`, `http://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`);
            },

            //em caso de cep errado mostrar o campo com a mensagem de erro e mudar a cor do campo como alerta, tornar a let dadoIncorreto verdadeira para fazer a próxima função:
            error: function () {
                $("#cep").val("CEP INCORRETO")
                $("#cep").css("background-color", "rgb(255, 93, 93)")
                dadoIncorreto = true;
            }
        });

        //para retornar o campo de cep sem o dado errado ao clicar no campo com a confirmação da let dadoIncorreto:
        $("#cep").on("click", function () {
            if (dadoIncorreto) {
                $("#cep").val("")
                $("#cep").css("background-color", "white")
                $("#mapa").attr(`src`, ``);
                dadoIncorreto = false;
            }
        });

        //para limpar os campos:
        $("#reset").on("click", function () {
            $("#cep").val("")
            $(".form").val("")
            $("#cep").css("background-color", "white")
            $("#area-mapa").html("")
        });

    })
})