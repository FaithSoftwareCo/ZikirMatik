var lapCount = 0;
var currentCount = 0;
var tesbihCount = 0;
var tesbihIndex = 0; // current index
var SPECIAL_TESBIH = 1453;
var SPECIAL_TESBIH_STRS = ["Subhanallah", "Elhamdulillah", "Allahuakbar"];
var backClicked = false;
var vibrateOn = false;
var soundOn = false;
var platformVersion=tizen.systeminfo.getCapabilities().platformVersion;

window.onload = function() {
        // TODO:: Do your initialization job
	//alert(platformVersion);
	
        // add eventListener for tizenhwkey
        document.addEventListener('tizenhwkey', function(e) {
            if (e.keyName == "back")
            	if(document.getElementById("settingsDiv").style.display === 'block')
            	{
            		document.getElementById("settingsDiv").style.display = 'none';
            		showPage(2);
            	}
            	else if( document.getElementById("addDiv").style.display === 'block' ||
            			document.getElementById("tesbihPageDiv").style.display === 'block')
        		{
            		showPage(2);
        		}
            	else
        		{
            		if (confirm("Confirm exit?")) {
            			try {
                            tizen.application.getCurrentApplication().exit();
                        } catch (ignore) {}
            			} else {
            			  
            			}
        		}
                
        });


        document.getElementById("addBtn").addEventListener(
            "click",
            function() {
                addTesbih();

                //window.scrollTo(0,document.body.scrollHeight);
            }
        );
        
        document.getElementById("addBtn2").addEventListener(
                "click",
                function() {
                	showPage(3);

                    //window.scrollTo(0,document.body.scrollHeight);
                }
            );

        document.getElementById("incrementBtn").addEventListener(
            "click",
            function() {
                incrementValue();
            }
        );

        document.getElementById("buttonDiv").addEventListener(
                "click",
                function() {
                    incrementValue();
                }
            );  
        
       /* document.getElementById("reset2").addEventListener(
                "click",  function() {
                	document.getElementById('id02').style.display='block';
                	reset_and_all();
                });*/
        
       /* document.getElementById("cancelBtn").addEventListener(
                "click",  function() {
                	document.getElementById('id02').style.display='none';
                	reset_and_all();
                });
        
        document.getElementById("resetBtn").addEventListener(
                "click",  function() {
                	document.getElementById('id02').style.display='none';
                	reset_and_all();resetone();
                });
        
        document.getElementById("cancelAll").addEventListener(
                "click",  function() {
                	document.getElementById('id03').style.display='none';
                	reset_and_all();
                }); 
        
        document.getElementById("resetAll").addEventListener(
                "click",  function() {
                	document.getElementById('id03').style.display='none';
                	reset_and_all();
                	resetall();
                }); 
        
        document.getElementById("reset2").addEventListener(
                "click",  function() {
                	document.getElementById('id02').style.display='block';reset_and_all();
                }); 
        
        document.getElementById("reset").addEventListener(
                "click",  function() {
                	document.getElementById('id03').style.display='block';reset_and_all();
                });
        */
        document.getElementById("settingsBtn").addEventListener(
                "click",  function() {
                	document.getElementById('settingsDiv').style.display='block';
                });
        
        document.getElementById("spanId").addEventListener(
                "click",  function() {
                	document.getElementById('settingsDiv').style.display='none';
                	reset_and_all();
                });
        
        /*document.getElementById("btnTasbihs").addEventListener(
                "click",  function() {
                	readTesbihler();
                	showPage(2);
                });
        */
        
        function tesbihClick(e)
        {
        	tesbihIndex = e.currentTarget.myParam; //;
        		
        	 //tesbihIndex = e.getAttribute("index");
        	//tesbihIndex = tesbihIndexArg;
        	 showTesbihPage(tesbihIndex);
        }
        
        var timer = null;
        var delay = 1000; // how much long u have to hold click in MS

        function tesbihClickPressed(e)
        {
           e.preventDefault();
           //alert("func");
           console.log("deneme");
           timer = setTimeout(function(){ alert("Delete tasbih?");/*deleteTesbihScreen(e);*/},delay);
          // Incase if you want to prevent Default functionality on mouse down
          if (e.preventDefault) 
          { 
             e.preventDefault();
          }
          else {
             e.returnValue = false; 
          }
        }

        function tesbihClickReleased(e)
        {
        	return ;
        	
        	if(timer) // demek ki timer expire etmemis
	   		 {
           		 clearTimeout(timer);
           		 timer = null;
       		 
           		 tesbihClick(e);
	       		 return;
	   		 }
        	else
    		{
        		 
        	}
        }
        
        function deleteTesbihScreen(e)
        {
        	 if(timer)
    		 {
        		 clearTimeout(timer);
        		 timer = null;
    		 }
           	  
        	 alert("Delete tasbih?");
        }
        
        
        var mouseIsDown = false;

        function mouseDown() {
        	 console.log("deneme1");
          mouseIsDown = true;
          setTimeout(function() {
            if(mouseIsDown) {
              // mouse was held down for > 2 seconds
            	 console.log("deneme2");
            	alert("Delete tasbih?");
            }
          }, 2000);
        }

        function mouseUp() {
        	 console.log("deneme3");
          mouseIsDown = false;
        }

        function execMouseDown() { 
        	alert("Delete tasbih?");
        }
        
        function readTesbihler()
        {
        	var myNode = document.getElementById("tesbihlerContent");
        	
        	myNode.innerHTML = '';
        	
        	var buttonTextEl = document.createElement("button");
        	buttonTextEl.id = "tesbih_33";
        	buttonTextEl.className = "aad";
        	buttonTextEl.innerText = '33 x 3';
        	buttonTextEl.setAttribute("index", SPECIAL_TESBIH);
        	buttonTextEl.myParam = SPECIAL_TESBIH;
        	//buttonTextEl.addEventListener("touchstart", func); 
        	//buttonTextEl.addEventListener("touchend", revert); 
        	buttonTextEl.addEventListener("mousedown", mouseDown); 
        	buttonTextEl.addEventListener("mouseup", mouseUp); 
        	
        	myNode.appendChild(buttonTextEl);
        	
        	
        	for(var i = 0; i < tesbihCount; i++ )
    		{
        		var name = "";

        		name = localStorage.getItem('name_' + i);
                
            	var buttonTextEl = document.createElement("button");
            	buttonTextEl.id = "tesbih_"+i;
            	buttonTextEl.className = "aad";
            	buttonTextEl.innerText = name;
            	buttonTextEl.setAttribute("index", i);
            	buttonTextEl.addEventListener("click", tesbihClick); 
            	
            	myNode.appendChild(buttonTextEl);
    		}        	
        }
        
        
        // 0:main, 1:tesbic counter, 2:tesbihlerim, 3:add
        function showPage(pageNo) {
        	 console.log("showPage pageNo: " + pageNo);
        	 
        	if( pageNo == 0 ) // main
    		{
        		/*document.getElementById("addDiv").style.display = "block";
                document.getElementById("e1").style.display = "block";
                document.getElementById("goalCount").style.display = "block";
                document.getElementById("tesbihPageDiv").style.display = "none";
                document.getElementById("settingsBtn").style.display = "block";
                document.getElementById("reset2").style.display = "none";
                document.getElementById("reset").style.display = "none";
                document.getElementById("tesbihler").style.display = "none";
                */
        		location.reload(false);
    		}
        	else if( pageNo == 1 ) // counter
    		{
        		document.getElementById("addDiv").style.display = "none";
                document.getElementById("e1").style.display = "none";
                document.getElementById("goalCount").style.display = "none";
                document.getElementById("tesbihPageDiv").style.display = "block";
                document.getElementById("settingsBtn").style.display = "none";
                //document.getElementById("reset2").style.display = "block";
                //document.getElementById("reset").style.display = "block";
                document.getElementById("tesbihler").style.display = "none";
    		}
        	else if( pageNo == 2 ) // my tesbihler
    		{
        		readTesbihler();
        		
        		document.getElementById("tesbihler").style.display = "block";
        		
        		document.getElementById("addDiv").style.display = "none";
                document.getElementById("e1").style.display = "none";
                document.getElementById("goalCount").style.display = "none";
                document.getElementById("tesbihPageDiv").style.display = "none";
                document.getElementById("settingsBtn").style.display = "block";
                //document.getElementById("reset2").style.display = "none";
                //document.getElementById("reset").style.display = "none";
                
    		}
        	else if( pageNo == 3 ) // add page
    		{
        		document.getElementById("addDiv").style.display = "block";
                document.getElementById("e1").style.display = "block";
                document.getElementById("goalCount").style.display = "block";
                document.getElementById("tesbihPageDiv").style.display = "none";
                document.getElementById("settingsBtn").style.display = "none";
                //document.getElementById("reset2").style.display = "none";
                //document.getElementById("reset").style.display = "none";
                document.getElementById("tesbihler").style.display = "none";
    		}
        }
        
        function addTesbih() {

            var inpt1 = document.getElementById("inpt1");
            var yu = document.getElementById("goalCount").value;

            if (inpt1.value === '') {
                document.getElementById("e1").style.display = "block";
                document.getElementById("e1").innerText = "Please Enter Tasbih Name"
                return;
            }

            if (yu == '') {
                document.getElementById("e1").style.display = "block";
                document.getElementById("e1").innerText = "Number Can't Be Blank"

            } else {

                yu = parseInt(document.getElementById("goalCount").value);

                if (yu === 0) {
                    document.getElementById("e1").style.display = "block";
                    document.getElementById("e1").innerText = "Number Can't Be 0"
                    return;
                }
                
                if (yu < 0) {
                    document.getElementById("e1").style.display = "block";
                    document.getElementById("e1").innerText = "Number Can't Be Negative";
                    return;
                }
                
                if(tesbihCount>1)
                {
                	document.getElementById("e1").style.display = "block";
                    document.getElementById("e1").innerText = "Full Version Required";
                    return;
                }

                // add tesbih to database
                tesbihIndex = tesbihCount;
                
                localStorage.setItem('name_'+tesbihIndex, inpt1.value);
                localStorage.setItem('goalCount_'+tesbihIndex, yu);
                localStorage.setItem('lapCount_'+tesbihIndex, 0);
                localStorage.setItem('currentCount_'+tesbihIndex, 0);
                tesbihCount++;
                localStorage.setItem('tesbihCount', tesbihCount);
                
                showTesbihPage(tesbihIndex);
                
            }
        }

        function showTesbihPage(tesbihIndexArg)
        {
        	tesbihIndex = tesbihIndexArg;
        	var name = '';
            var goal = '';
        	if(tesbihIndexArg == SPECIAL_TESBIH)
    		{
        		 name = 'Subhanallah';
                 goal = 33;
                 lapCount = 0;
                 currentCount = 0;
    		}
        	else
    		{
        		 name = localStorage.getItem('name_'+tesbihIndex);
                 goal = localStorage.getItem('goalCount_'+tesbihIndex);
                 lapCount = localStorage.getItem('lapCount_'+tesbihIndex);
                 currentCount = localStorage.getItem('currentCount_'+tesbihIndex);
    		}
        	
           /* var lap = document.getElementById("lap1");
            lap.innerHTML = name;
             */
             
            var incrementBtnName = document.getElementById("incrementBtn");
            incrementBtnName.value = name; 
             
            document.getElementById('lapCount').value = lapCount;
            
            document.getElementById("number").value = currentCount;
            
            document.getElementById('goalCount').value = goal;
            
        	showPage(1);
        }
        

        function tesbihVibrateClicked() {
            var checkBox = document.getElementById("tesbihVibrate");
            vibrateOn = checkBox.checked==true?1:0;
            localStorage.setItem("vibrateOn", vibrateOn);
            
            console.log("tesbihVibrateClicked : " + vibrateOn);
        }

        function tesbihSoundClicked() {
            var checkBox = document.getElementById("tesbihSound");
            soundOn = checkBox.checked==true?1:0;
            localStorage.setItem("soundOn", soundOn);
            
            console.log("tesbihSoundClicked : " + soundOn);
        }
   

        function makeAlerts(durationLong) {
        	
        	 console.log("makeAlerts :  vibrateOn" + vibrateOn + " soundOn:" + soundOn);
        	 
        	if(vibrateOn)
        		{
        		navigator.vibrate((durationLong==1) ? 200 : 50);
        		}
        	
        	var pattern = 'KEY_SHARP', type = 'TYPE_SOUND';
        	var isSupported = 0;
        	console.log("platformVersion:" + platformVersion);
        	
        	if(platformVersion.indexOf('1.') == 0 || platformVersion.indexOf('2.') == 0)
    		{
        		isSupported = 0;
    		}
        	else {
        		isSupported = tizen.feedback.isPatternSupported(pattern, type);
			}
        	
        	var isSupportedStr = '';
        	if (!isSupported) {
        	    isSupportedStr = ' not';
        	}
        	console.log('pattern ' + pattern + ' is' + isSupportedStr + ' supported');
        	if(isSupported&&soundOn)
        		{
        		tizen.feedback.play(pattern, type);
        		}
        		
        }
        
        function incrementValue() {
            var goalCount = parseInt(document.getElementById('goalCount').value);

            currentCount = parseInt(document.getElementById('number').value);
            if (currentCount < goalCount - 1) {
            	
            	makeAlerts(0);
            	
            	currentCount++;
                //value = isNaN(value) ? 0 : value; value++;
                // if(value )
                 localStorage.setItem('currentCount_'+tesbihIndex, currentCount);
                document.getElementById('number').value = currentCount;
            } else {
            	makeAlerts(1);
            	
                buttonClick();
                doit();
                
                if(tesbihIndex == SPECIAL_TESBIH)
        		{
                	var incrementBtnName = document.getElementById("incrementBtn");
            		incrementBtnName.value = SPECIAL_TESBIH_STRS[(lapCount)%3];
        		}
            }
        }

        function buttonClick() {
            document.getElementById('lapCount').value = ++lapCount;
            localStorage.setItem('lapCount_'+tesbihIndex, lapCount);
           
        }

        function pause() {

            document.getElementById("reset").style.display = "none";
        }

        function doit() {
        	currentCount = 0;
            document.getElementById('number').value = currentCount;
            localStorage.setItem('currentCount_'+tesbihIndex, currentCount);
        }

        function resetone() {

        	currentCount = 0;
            document.getElementById('number').value = currentCount;
            localStorage.setItem('currentCount_'+tesbihIndex, currentCount);
        }

        function resetall() {
            i = 0
            
            currentCount = 0;
            document.getElementById('number').value = currentCount;
            localStorage.setItem('currentCount_'+tesbihIndex, currentCount);
            
            lapCount = 0;
            document.getElementById("lapCount").value = lapCount;
            localStorage.setItem('lapCount_'+tesbihIndex, lapCount);
        }


        function furqan() {
            //document.getElementById("aud").play();

        }


        function reset_and_all() {
            //document.getElementById("re").play();

        }


        var a = document.getElementById("night");
        a.onclick = function() {
            if (document.getElementsByTagName("html")[0].style.backgroundColor === "rgb(0, 0, 0)") {
                document.getElementsByTagName("html")[0].style.backgroundColor = "transparent";
                document.getElementsByTagName("body")[0].style.backgroundColor = "transparent";
                return false;
            } else {
                document.getElementsByTagName("html")[0].style.backgroundColor = "#000";
                document.getElementsByTagName("body")[0].style.backgroundColor = "#000";
                return false;
            }
        }
        
    	tesbihCount = localStorage.getItem("tesbihCount");
        if(tesbihCount == null)
        	tesbihCount = 0;
   
    	vibrateOn = localStorage.getItem("vibrateOn");
        if(vibrateOn == null)
        	vibrateOn = 0;
                
    	soundOn = localStorage.getItem("soundOn");
        if(soundOn == null)
        	soundOn = 0;
        
        var chkBox = document.getElementById("tesbihSound");
        chkBox.addEventListener(
                "click", tesbihSoundClicked);
        chkBox.checked = (soundOn==1);
        
        var chkBox2 = document.getElementById("tesbihVibrate");
        chkBox2.addEventListener(
                "click", tesbihVibrateClicked);
        chkBox2.checked = (vibrateOn==1);
        
        
        console.log("tesbih count: " + tesbihCount);
        console.log("vibrateOn: " + vibrateOn);
        console.log("soundOn: " + soundOn);
        
        readTesbihler();
    };