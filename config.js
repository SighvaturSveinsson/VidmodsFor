var config = {
    address: "localhost", // Address to listen on, can be:
                          // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
                          // - another specific IPv4/6 to listen on a specific interface
                          // - "", "0.0.0.0", "::" to listen on any interface
                          // Default, when address config is left out, is "localhost"
    port: 8080,
    ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
                                                           // or add a specific IPv4 of 192.168.1.5 :
                                                           // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
                                                           // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
                                                           // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],
 
    language: "is",
    timeFormat: 24,
    units: "metric",
 
    modules: [
        {
            module: "alert",
        },
        {
            module: "updatenotification",
            position: "top_bar"
        },
        {
            module: "clock",
            position: "top_left"
        },
       
        {
            module: "compliments",
            position: "lower_third"
        },
        {
            module: "currentweather",
            position: "top_right",
            config: {
                location: "Reykjavik",
                locationID: "5128581",  //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
                appid: "bbb3c5584d3225512c758667c5027513"
            }
        },
        {
            module: "newsfeed",
            position: "bottom_bar",
            config: {
                feeds: [
                    {
                        title: "Mogginn",
                        url: "https://www.mbl.is/feeds/fp/"
                    }
                ],
                showSourceTitle: true,
                showPublishDate: true
            }
        },
        {      
            module: "camera",
            position: "top_center",
            config: {
                selifeInterval: 3,
                emailConfig: {
                    service:"Gmail",
                    auth : {
                        user:"<>",
                        pass:"<>",
                    },
                },
            }
        },
    ]
 
};
 
/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
