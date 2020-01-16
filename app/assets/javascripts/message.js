$(function(){

function buildHTML(message){
    var content = (message.content == "") ? ``:`<p class="lower-message__content" > ${ message.content }</p>`;
    var image = (message.image == null) ? ``:`<img src='${ message.image }', class='main-message__image'>`;

      var html =
   `<div class="main-message" data-message_id="${ message.id }">
      <div class="main-message__upper-info">
        <div class="main-message__upper-info__messenger">
         ${ message.name }
        </div>
        <div class="main-message__upper-info__date-time">
         ${ message.created_at }
        </div>
       </div>
      
       <div class="main-message__text">
       ${ content }
       ${ image }
       </div>
   </div>`
    return html;  
    } 

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-messages').append(html);      
      $('#new_message')[0].reset();
      $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});
      $('.submit-btn').removeAttr('disabled');
      })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      })
    .always(function(){
      });
   });

   var interval = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
     var last_message_id = $('.main-message:last').data("message_id")

    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      messages.forEach(function(message) {
        var insertHTML = buildHTML(message)
        $('.main-messages').append(insertHTML)
        $('.main-messages').animate({scrollTop: $('.main-messages')[0].scrollHeight});
          })
        })

    .fail(function() {
       alert('自動更新に失敗しました');
       });
    } else {
      clearInterval(interval);
   }   
  }
  setInterval(interval, 5000 ); 
})