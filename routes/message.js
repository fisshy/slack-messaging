var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('message', { title: 'Create Message' });
});


router.post('/', function(req, res) {
  var answer = req.body.answers
  var message = req.body.message

  var messages = message.split('\r\n')
  var answers = answer.split('\r\n')


  var slack_message = {
    channel: "#fredagslunch", 
    username: "Fredagslunch", 
    icon_emoji: ":ghost:",
    attachments:[
      {
        fallback: "Required text summary of the attachment that is shown by clients that understand attachments but choose not to show them.",

        pretext: "Vad vill du ha för fredagslunch?",

        color: "#36a64f", // Can either be one of 'good', 'warning', 'danger', or any hex color code
        // Fields are displayed in a table on the message
        fields: []
      }
   ]
  };


  messages.forEach(function(value, i) {
    if(value) {
      slack_message.attachments[0].fields.push({
        title : value,
        value: 'Svara: ' + (i + 1)
      });
    }
  });


  request.post('token',
    {form:{payload: JSON.stringify(slack_message)}}
  );

});

module.exports = router;
