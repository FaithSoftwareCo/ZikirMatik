var lapCount = 0;
var currentCount = 0;
var tesbihCount = 0;
var tesbihIndex = 0; // current index
var SPECIAL_TESBIH = 1453;
var SPECIAL_TESBIH_STRS = ["Subhanallah", "Elhamdulillah", "Allahuakbar"];
var backClicked = false;

window.onload = function() {
        // TODO:: Do your initialization job

        // add eventListener for tizenhwkey
        document.addEventListener('tizenhwkey', function(e) {
            if (e.keyName == "back")
            	
            	if( document.getElementById("pl").style.display === 'none')
        		{
            		showPage(0);
        		}
            	else
        		{
            		try {
                        tizen.application.getCurrentApplication().exit();
                    } catch (ignore) {}
        		}
                
        });


        document.getElementById("btn").addEventListener(
            "click",
            function() {
                addTesbih();
                furqan_elahie_play_sounds();
                //window.scrollTo(0,document.body.scrollHeight);
            }
        );

        document.getElementById("incrementBtn").addEventListener(
            "click",
            function() {
                incrementValue();
                //furqan();
            }
        );

        document.getElementById("buttonDiv").addEventListener(
                "click",
                function() {
                    incrementValue();
                    //furqan();
                }
            );
        
        document.getElementById("myCheck2").addEventListener(
            "click", myFunction2);
        document.getElementById("myCheck").addEventListener(
            "click", myFunction);
        document.getElementById("myCheck3").addEventListener(
            "click", myFunction3);
        
        document.getElementById("reset2").addEventListener(
                "click",  function() {
                	document.getElementById('id02').style.display='block';
                	reset_and_all();
                });
        
        document.getElementById("cancelBtn").addEventListener(
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
        
        document.getElementById("settingsBtn").addEventListener(
                "click",  function() {
                	document.getElementById('id01').style.display='block';
                });
        
        document.getElementById("spanId").addEventListener(
                "click",  function() {
                	document.getElementById('id01').style.display='none';
                	reset_and_all();
                });
        
        document.getElementById("btnTasbihs").addEventListener(
                "click",  function() {
                	readTesbihler();
                	showPage(2);
                });
        
        function tesbihClick()
        {
        	 tesbihIndex = this.getAttribute("index");
        	
        	 showTesbihPage(tesbihIndex);
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
        	buttonTextEl.addEventListener("click", tesbihClick); 
        	
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
        
        // 0:main, 1:tesbic counter, 2:tesbihlerim
        function showPage(pageNo) {
        	if( pageNo == 0 ) // main
    		{
        		/*document.getElementById("pl").style.display = "block";
                document.getElementById("e1").style.display = "block";
                document.getElementById("goalCount").style.display = "block";
                document.getElementById("fm").style.display = "none";
                document.getElementById("settingsBtn").style.display = "block";
                document.getElementById("reset2").style.display = "none";
                document.getElementById("reset").style.display = "none";
                document.getElementById("tesbihler").style.display = "none";
                */
        		location.reload(false);
    		}
        	else if( pageNo == 1 ) // counter
    		{
        		document.getElementById("pl").style.display = "none";
                document.getElementById("e1").style.display = "none";
                document.getElementById("goalCount").style.display = "none";
                document.getElementById("fm").style.display = "block";
                document.getElementById("settingsBtn").style.display = "none";
                document.getElementById("reset2").style.display = "block";
                document.getElementById("reset").style.display = "block";
                document.getElementById("tesbihler").style.display = "none";
    		}
        	else if( pageNo == 2 ) // my tesbihler
    		{
        		document.getElementById("pl").style.display = "none";
                document.getElementById("e1").style.display = "none";
                document.getElementById("goalCount").style.display = "none";
                document.getElementById("fm").style.display = "none";
                document.getElementById("settingsBtn").style.display = "block";
                document.getElementById("reset2").style.display = "none";
                document.getElementById("reset").style.display = "none";
                document.getElementById("tesbihler").style.display = "block";
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
                    document.getElementById("e1").innerText = "Number Can't Be Negative"
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
        

        function myFunction() {
            var checkBox = document.getElementById("myCheck");
            var text = document.getElementById("text");
            if (checkBox.checked == true) {
                //document.getElementById("aud").src = "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-46416/zapsplat_multimedia_button_click_005_53866.mp3?_=7";
            } else {
                doi();
            }
        }

        function myFunction2() {
            var checkBox2 = document.getElementById("myCheck2");

            if (checkBox2.checked == true) {
               // document.getElementById("song").src = "https://pic.pikbest.com/00/62/04/63M888piCRKc.mp3";
            } else {
                doi2();
            }
        }
        
        function myFunction3() {
            var checkBox3 = document.getElementById("myCheck3");

            if (checkBox3.checked == true) {
               // document.getElementById("re").src = "https://mobcup.net/d/uw3m47dv";
            } else {
                doi3();
            }
        }

        function doi() {
            //document.getElementById("aud").src = "https://www.dl.dropboxusercontent.com/s/q08zqsmldrvo0xa/Untitled%2062_360p%20%281%29.mp4?dl=0"
        }

        function doi2() {
            //document.getElementById("song").src = "https://www.dl.dropboxusercontent.com/s/q08zqsmldrvo0xa/Untitled%2062_360p%20%281%29.mp4?dl=0"
        }

        function doi3() {
           // document.getElementById("re").src = "https://www.dl.dropboxusercontent.com/s/q08zqsmldrvo0xa/Untitled%2062_360p%20%281%29.mp4?dl=0"
        }


        function incrementValue() {
            var goalCount = parseInt(document.getElementById('goalCount').value);

            currentCount = parseInt(document.getElementById('number').value);
            if (currentCount < goalCount - 1) {

            	currentCount++;
                //value = isNaN(value) ? 0 : value; value++;
                // if(value )
                 localStorage.setItem('currentCount_'+tesbihIndex, currentCount);
                document.getElementById('number').value = currentCount;
            } else {
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

        function furqan_elahie_play_sounds() {
            // document.getElementById("song").play();
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
   

        console.log("tesbih count: " + tesbihCount);
    };