$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
   `<div class="main-message" data-message-id="${ message.id }">
      <div class="main-message__upper-info">
        <div class="main-message__upper-info__messenger">
         ${ message.name }
        </div>
        <div class="main-message__upper-info__date-time">
         ${ message.created_at }
        </div>
       </div>
      
       <div class="main-message__text">
        <p class="lower-message__content">
          ${ message.content }
         </p>
        <img class="main-message__image" src=${message.image}>
       </div>
   </div>`
    return html;
   } 
   else {
     var html =
   `<div class="main-message" data-message-id="${ message.id }">
     <div class="main-message__upper-info">
       <div class="main-message__upper-info__messenger">
        ${ message.name }
       </div>
     <div class="main-message__upper-info__date-time">
        ${ message.created_at }
         </div>
       </div>
     <div class="main-message__text">
      <p class="lower-message__content">
      ${ message.content }
         </p>
       </div>
     </div>`
     return html;
   };
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
   })
});