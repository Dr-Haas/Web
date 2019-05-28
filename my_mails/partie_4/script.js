$('#count').text($('p').length)

$('.trash').click(function() {
  $(this).parent().remove()
  $('#count').text($('p').length)
})


$('#btn-add').click(function() {
  $('#container').append('<div class="row"><img  class="avatar" src="avatar-1.jpg"><div class="content"><h6>Noel Paganelli</h6><p>' + $('#add-message').val() + '</p></div><img class="trash" src="trash.png"></div>')
  $('#count').text($('p').length)
  $('#add-message').val("")

  $('.trash').click(function() {
    $(this).parent().remove()
    $('#count').text($('p').length)
  })
})


$('#btn-search').click(
  function(){

    $('h6').each(
      function(){
        var name = $('#search-message').val()
        if ( name != $(this).text() ) {
          $(this).parent().parent().fadeOut()
        }
      }
    )

  }
)
