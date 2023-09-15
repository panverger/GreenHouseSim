		var mqtt;
		var reconnectTimeout = 2000;
	//	var host="test.mosquitto.org";
	//	var port=8080;

		
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
		mqtt.subscribe(prefixTopic+"/#");
		
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
			}
		if (topic==prefixTopic+"/topRight") {	
			var inputV = document.getElementById("sliderTopRight");
			inputV.value = data;
			}	
		if (topic==prefixTopic+"/fan") {	
			var inputV = document.getElementById("sliderFan");
			inputV.value = data;
			}		
		if (topic==prefixTopic+"/light") {	
			var inputV = document.getElementById("lights");
			if (data=="on") {
				inputV.checked = true;
			} else
			{
				inputV.checked = false;
			}

			}		
		if (topic==prefixTopic+"/transp") {	
			var inputV = document.getElementById("transp");
			inputV.value = data;
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
	
function sendLight() {
		var inputV = document.getElementById("lights");
		if (inputV.checked) {
			message = new Paho.MQTT.Message("on");
		} else
		{
			message = new Paho.MQTT.Message("off");
		}	
		message.destinationName = prefixTopic+"/light";
		message.retained=false;
		mqtt.send(message);
}

function sendTransp(v) {
		message = new Paho.MQTT.Message(v);
		message.destinationName = prefixTopic+"/transp";
		message.retained=false;
		mqtt.send(message);
}

function sendTopLeft(v) {
		message = new Paho.MQTT.Message(v);
		message.destinationName = prefixTopic+"/topLeft";
		message.retained=false;
		mqtt.send(message);
}

function sendTopRight(v) {
		message = new Paho.MQTT.Message(v);
		message.destinationName = prefixTopic+"/topRight";
		message.retained=false;
		mqtt.send(message);
}

function sendVent(v) {
		message = new Paho.MQTT.Message(v);
		message.destinationName = prefixTopic+"/fan";
		message.retained=false;
		mqtt.send(message);
}

function sendInTemp(v) {
		message = new Paho.MQTT.Message(v);
		message.destinationName = prefixTopic+"/inTemp";
		message.retained=false;
		mqtt.send(message);
		document.getElementById("inTempV").innerHTML = v;
}

function sendInHum(v) {
		message = new Paho.MQTT.Message(v);
		message.destinationName = prefixTopic+"/inHum";
		message.retained=false;
		mqtt.send(message);
		document.getElementById("inHumV").innerHTML = v;
}