var express = require('express'); // call express

var app = express(); // define our app using express

var bodyParser = require('body-parser');

const nodemailer = require('nodemailer')



app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.post('/sendEmail',function(req,res){
    var email = req.body.email;
    var name = req.body.name;
    var content = req.body.content;
    var subject = req.body.subject;

    nodemailer.createTestAccount((err,account) =>{
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure:false,
            auth:{
                user: 'foodninjaapp@gmail.com',
                pass: 'Foodninja1234qweR'
            }
        });
    
        let mailOptions = {
            from: '"Food Ninja" <noreply@foodninja.com>',
            to: email,
            subject: subject,
            text: content,
            html: content
        }
    
        transporter.sendMail(mailOptions,(error,info)=>{
            //res.json({message:"sending email to " + name + " at "+ email});
            if(error){
                res.json(error);
                return console.log(error)
                
            }
            res.json({message:"email successfully sent to : "+ email});
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
        })
    })

    
})

app.use('/api', router);

app.listen(port);

console.log('Magic happens on port ' + port);

