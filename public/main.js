$(function() {
    $('.form').submit(sendMessage);
    $('.delete').click(deleteMessage);
    $('.edit').click(editMessage);
    // getMessage();
});

function sendMessage(e) {
    e.preventDefault();
    var name = $('#name').val();
    var email = $('#email').val();
    var image = $('#image').val();
    var message = $('#message').val();

    $.post('/message', {
            name: name,
            email: email,
            image: image,
            message: message
        })
        .done(function(data) {
            // console.log(data)
            var id = data;
            var button = $('<button>').addClass('btn btn-danger');
            var div = $('<div>').addClass('newElement message');

            var img = $('<img>').attr('src', image);
            // img.attr('src', image);
            var $message = $('<h3>').text(message);
            var $time = $('<h5>').text(Date.now())
            var $del = $('<btn>').addClass('btn-danger delete newDel').text('Delete').attr('id', id)
            var $edi = $('<btn>').addClass('btn-success edit').text('Edit')
            div.append(img, $message,  $del, $edi);
            $('.message-board').append(div);
            // console.log('data send',data);
        })
        .fail(function(error) {
            console.log('data is not sent:', error);
        });
}

function deleteMessage(e) {
    var id = $(e.target).attr('id');
    // $(e.target).attr('id', '');

    // console.log(id);
    $.ajax({
        url: `/message/:${id}`,
        type: 'DELETE',
        success: function(response) {
            console.log('response: ',response);
            $(e.target).closest('div').remove();
            $('button.delete').attr('id', '')
        }
    });
}

function editMessage(e) {
    var id = $(e.target).attr('id');
    var message = $(this).closest('div').children()[1];
    var messageText = $(message).text();
    console.log(id);
    $('#message1').val(messageText);
    // $.ajax({
    //     url: `/message/${id}`,
    //     type: 'PUT',
    //     data:{ },
    //     success: function(response) {
    //     }
    // });
}
