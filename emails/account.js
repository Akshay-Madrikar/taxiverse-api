const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const sendgridApiKey = "SG." + process.env.SEND_GRID_API;
sgMail.setApiKey(sendgridApiKey);

const sendWelcomeEmail = async (email) => {
  await sgMail.send({
    to: email,
    from: "no-reply@taxiverse.com",
    subject: "Thanks for joining!",
    html: `<h3>Welcome to the app, ${email}. .<h3>Get your favourite vehicle and ride<br>
                <h4> No more worries about petrol mileage, insurance, and car breakdowns! Taxiverse has enabled driving convenience for travellers around the country and is fast expanding its reach to cities. Book a self drive car in any city you visit with the Taxiverse app on your phone and feel at home wherever you go. </h4>`,
  });
};

const sendBlockEmail = async (email) => {
  await sgMail.send({
    to: email,
    from: "no-reply@taxiverse.com",
    subject: "User Block Policy",
    text: `Unfortunately we've to block you. Please contact customer service for further procedure.`,
  });
};

const sendBookingEmail = async (email, bookingData) => {
  await sgMail.send({
    to: email,
    from: "no-reply@taxiverse.com",
    subject: "Booking confirmed",
    html: `<h1>Hey ${email}, Thank you for booking vehicle with us.</h1>
    <h2>Vehicle Name: ${bookingData.vehicle.name}</h2>
    <h2>Partners in ride: ${bookingData.partnersCount}</h2>
    <h2>Booked From: ${bookingData.bookedFrom}</h2>
    <h2>Booked Till: ${bookingData.bookedTo}</h2>
    <h2>Total amount: ${bookingData.amount}<h2>
    <h2>Approx distance: ${bookingData.location.distance}<h2>
    <h2>Approx duration: ${bookingData.location.duration}<h2>
    <h2>Payment Done: ${bookingData.location.status === 1 ? "Yes" : "No"}<h2>
    <p>Thank your for shopping with us.</p>`,
  });
};

const sendUnblockEmail = async (email) => {
  await sgMail.send({
    to: email,
    from: "no-reply@taxiverse.com",
    subject: "User Block Policy",
    text: `Glad to welcome you back to our app!. Enjoy the perks and explore.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendBlockEmail,
  sendUnblockEmail,
  sendBookingEmail,
};
