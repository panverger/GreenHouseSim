		var mqtt;
		var reconnectTimeout = 2000;
//		var host="test.mosquitto.org";
//		var port=8080;
		
		
		function onFailure(message) {
			console.log("Connection Attempt to Host "+host+"Failed");
			setTimeout(MQTTconnect, reconnectTimeout);
        }
		function onMessageArrived(msg){
			out_msg="Message received "+msg.payloadString+"<br>";
			out_msg=out_msg+"Message received Topic "+msg.destinationName;
			console.log(out_msg);
			checkMsg(msg.destinationName,msg.payloadString);
		}
		
	 	function onConnect() {
	  // Once a connection has been made, make a subscription and send a message.
	
		console.log("Connected ");
		mqtt.subscribe("sensor2");
		message = new Paho.MQTT.Message("0");
		message.destinationName = prefixTopic;
		message.retained=true;
		mqtt.send(message);
		mqtt.subscribe("gh/#");
		
	  }
	  function MQTTconnect() {
		console.log("connecting to "+ host +" "+ port);
		var x=Math.floor(Math.random() * 10000); 
		var cname="orderform-"+x;
		mqtt = new Paho.MQTT.Client(host,port,cname);
		//document.write("connecting to "+ host);
		var options = {
			timeout: 3,
			onSuccess: onConnect,
			onFailure: onFailure,
			 };
		mqtt.onMessageArrived = onMessageArrived
		
		mqtt.connect(options); //connect
		}
	 
	 function checkMsg(topic,data) {
	 	console.log(data);	
		if (topic==prefixTopic+"/topLeft") {	
			var inputV = document.getElementById("sliderTopLeft");
			inputV.value = data;
			const e = new Event("change");
			const element = document.querySelector('#sliderTopLeft');
			element.dispatchEvent(e);
			}
		if (topic==prefixTopic+"/topRight") {	
			var inputV = document.getElementById("sliderTopRight");
			inputV.value = data;
			const e = new Event("change");
			const element = document.querySelector('#sliderTopRight');
			element.dispatchEvent(e);
			}	
		if (topic==prefixTopic+"/fan") {	
			var inputV = document.getElementById("sliderFan");
			inputV.value = data;
			const e = new Event("change");
			const element = document.querySelector('#sliderFan');
			element.dispatchEvent(e);
			}		
		if (topic==prefixTopic+"/light") {	
			var inputV = document.getElementById("lights");
			if (data=="on") {
				inputV.checked = true;
			} else
			{
				inputV.checked = false;
			}
			const e = new Event("click");
			const element = document.querySelector('#lights');
			element.dispatchEvent(e);
			}		
		if (topic==prefixTopic+"/transp") {	
			var inputV = document.getElementById("transp");
			inputV.value = data;
			console.log(data);
			const e = new Event("change");
			const element = document.querySelector('#transp');
			element.dispatchEvent(e);
			}	

		//Inside data
		if (topic==prefixTopic+"/inTemp") {	
			var inputV = document.getElementById("inTemp");
			inputV.textContent = data;
			}	
		if (topic==prefixTopic+"/inHum") {	
			var inputV = document.getElementById("inHumidity");
			inputV.textContent = data;
			}	
	 }

//slider value update	 
function updateSlider(slideAmount) {
        var sliderDiv = document.getElementById("sliderAmount");
		if (slideAmount == "0") {
			slideAmount = "OFF";
			
		}
      //  sliderDiv.innerHTML = slideAmount;
    }
	
function get_weather() {
//fetch weather api	

// Fetching temperature data
var url="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+realPlace+"?unitGroup=metric&include=current&key=TW7EQVLWLX7F6V9G93YB5SL2H&contentType=json";
fetch(url)
  .then(response => response.json())
  .then(data => {
    var datetime = data.currentConditions.datetime;
	var temperature = data.currentConditions.temp;
	var humidity = data.currentConditions.humidity;
	var solarradiation = data.currentConditions.solarradiation;
	var winddir = data.currentConditions.winddir;
	var windspeed = data.currentConditions.windspeed;
	document.getElementById("temperature").innerHTML = temperature;
	document.getElementById("humidity").innerHTML = humidity;
	document.getElementById("winddir").innerHTML = winddir;
	document.getElementById("windspeed").innerHTML = windspeed;
	document.getElementById("solarRad").innerHTML = solarradiation;
	console.log(data);
	console.log(datetime+" "+temperature+" "+humidity+" "+solarradiation);
  })
  .catch(error => console.error(error))
}

get_weather();
setTimeout(get_weather, 600000);  // get data every 10min

document.getElementById("realPlace").innerHTML = realPlace;