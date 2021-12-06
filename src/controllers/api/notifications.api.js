const Nofitications = require('../../models/notifications.schema');
const Tokens = require('../../models/tokens.schema');
const { response } = require("../../utils/utils");
const fetch = require('node-fetch');

// router.post('/send', async (req, res) => {
//     const nofiti = {
//         'title': "Hello 123",
//         'content': "Đầu buồi thắng rách"
//     }

//     const token = [`ftJMJZwcTha-K_Tsa7zWJn:APA91bG8LiatZH1kKHZKW6OiOlK46asEwVg9UgHDPDspm3dKrlerj7trWVKa8TcNmjJTDm9pZDthDGaQdiGl4Ry9nd8updCsQlx8lPmiLuDVeTF0p7l0OVBj8S8aEIAviZyg2mhYuePQ`];

//     const nofibody = {
//         'data': nofiti,
//         "registration_ids": token
//     }

//     fetch('https://fcm.googleapis.com/fcm/send', {
//         'method': 'POST',
//         'headers': {
//             'Authorization': `key=AAAAEBe3FBg:APA91bHB33pJqGNkGTKCmmw-8cRbcCeYTaI76hDRjdm555xwCnxkJm6ka9rHh98w0wwMsxc6nW0Il1qe0ssmJplXHTsX_ZktQEVI34f-TtSP--kB7KVbvOQxxXdUIC8OXFsoKVTR2FYy`,
//             'Content-Type': 'application/json'
//         },
//         'body': JSON.stringify(nofibody)
//     }).then(() => res.json(nofibody)).catch((err) => console.log(err))

// });

// exports.pushNotificationUser = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json(response(500, error.message));
//     }
// };
