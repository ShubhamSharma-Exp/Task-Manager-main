const sgMail=require("@sendgrid/mail")


sgMail.setApiKey(process.env.SENDGRID)
const sendWelcomeEmail=(name,email)=>{
    sgMail.send({
    to:email,
    from:'jatin.thakwani_cs18@gla.ac.in',
    subject:'Welconme to task-manager application',
    text:`Welcome ${name}! Hope so you will enjoy our services`
})
}
const cancelEmail=(name,email)=>{
    sgMail.send({
        to:email,
        from:'jatin.thakwani_cs18@gla.ac.in',
        subject:'We are sad that you left',
        text:`Byee ${name}! Please tell us why you left our application`
    })
}
module.exports={
    sendWelcomeEmail,
    cancelEmail
}