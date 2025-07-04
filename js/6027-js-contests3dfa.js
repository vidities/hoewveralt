var httpobject = [];    
    var requestcount = 0;
    
    function newHttpReq()
    {
        var newRequest = null;
        
        try
        {
            newRequest = new XMLHttpRequest();
        }
        catch(trymicrosoft)
        {
            try
            {
                newRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(othermicrosoft)
            {
                try
                {
                    newRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(failed)
                {
                    newRequest = null;
                }           
            }
        }
        
        return newRequest;
    
    }

    httpobject[-1] = newHttpReq();
        
    if(!httpobject[-1])
    {
        alert("Error Initializing XMLHttpRequest!");
    }   

    function showname(id)
    {
        document.getElementById('link' + id).style.height = '102px';
        document.getElementById('box' + id).style.visibility = 'visible';
    }

    function hidename(id)
    {
        document.getElementById('link' + id).style.height = '100%';
        document.getElementById('box' + id).style.visibility = 'hidden';
    }

    image1 = new Image();
    image1.src = '/assets/images/Searching.gif';

    function uploadimage()
    {
        var uploadid = document.getElementById('uploadid').value;
    
        var filename = document.getElementById('uploadimage').value;
        filename = filename.toLowerCase();
    
        if(filename == '')
        {
            alert('Please select a file to upload.');
            return;
        }
    
        var decimalposition = filename.lastIndexOf('.');
        var extension = filename.substr(decimalposition,filename.length);
    
        if(extension != '.gif' && extension != '.jpg' && extension != '.jpeg')
        {
            alert('Only the following image formats are allowed: .gif, .jpg, and .jpeg.  Please convert your image to one of those formats and try uploading again.','suck it');
            return;
        }

        document.getElementById('uploadform').submit();
        document.getElementById('uploaddiv').innerHTML = "<div id='progressdiv' style='float: left; width: 100%;'><p style='float: left; font: 14pt arial; font-weight: bold; color: #224477; padding-right: 5px;'>Upload in Progress</p><img src='/assets/images/Searching.gif' style='float: left; padding-top: 1px'></div>";
    
        updateprogress(uploadid);
        
    }
    
    
    function updateprogress(uploadid)
    {
    
        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();          
        httpobject[localvalue].onreadystatechange = function(){
        
            try 
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }
            
                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }
            
            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {

                if(document.getElementById('progressdiv'))
                {

                    var response = httpobject[localvalue].responseText.split("EXTRAINSTRUCTIONS");              
                    document.getElementById('progressdiv').innerHTML = response[0];

                    if(response[1])
                    {
                        eval(response[1]);
                    }                   
                    
                }               
            }
        
        };      
        
        var timestamp = new Date().getTime();
        var url = 'queries/queryuploadprogresshomepagecreateyourown.php?uploadid=' + uploadid + '&timestamp=' + timestamp;
    
        httpobject[localvalue].open('get',url,true);
        httpobject[localvalue].send(null);
        
        if(document.getElementById('progressdiv'))
        {
            setTimeout('updateprogress(\''+uploadid+'\')',1000);
        }
        
        requestcount++;
    }   


    function cancelupload()
    {

        document.getElementById('uploadiframe').src = 'http://fineartamerica.com/pagenotfound.html';

        var localvalue = requestcount;

        httpobject[localvalue] = newHttpReq();          
        httpobject[localvalue].onreadystatechange = function(){
        
            try 
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }
            
                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }
            
            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                if(document.getElementById('uploaddiv'))
                {
                    document.getElementById('uploaddiv').innerHTML = httpobject[localvalue].responseText;
                }               
            }
        
        };      
        
        var poststring = '';
        var url = 'queries/queryuploadformhomepagecreateyourown.php';
        
        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(poststring);
        
        requestcount++;
        
    }

    function expandallsubjectsdiv()
    {
        document.getElementById('subjectdiv[3]').style.paddingBottom = '4px';
        document.getElementById('allsubjectsdiv').style.height = '';
        document.getElementById('expanddiv').innerHTML = '&nbsp;';
    }   

    function expandallcollectionsdiv()
    {
        document.getElementById('collectiondiv[4]').style.paddingBottom = '4px';
        document.getElementById('allcollectionsdiv').style.height = '';
        document.getElementById('expandcollectionsdiv').innerHTML = '&nbsp;';
    }
    
    var numslides = 5;
    var currentindex = 0;
    var targetindex = 0;
    var slidedirection = '';
    var currentx1 = 0;
    var targetx1 = 0;
    var currentx2 = 0;
    var targetx2 = 0;
    var slideshowcontainer;
    var position = [];
    var link = [];
    var slideincrement;
    var slidecounter;
    var timerautomatic;
    var timerslide;

    function manualstartslide(index)
    {
        //alert('here');
    
        slidetoposition(index);
        //clearTimeout(timerautomatic);
        //timerautomatic = setTimeout('slideautomatic()',10000);        
    }
    
    function slidetoposition(index)
    {
        clearTimeout(timerautomatic);

        targetindex = index;
        
        if(targetindex == currentindex)
        {
            return;
        }
        
        if(targetindex > currentindex)
        {
            slidedirection = 'righttoleft';
        }
        else
        {
            slidedirection = 'lefttoright';
        }

        if(targetindex == -1)
        {
            targetindex = numslides - 1;
        }
        
        if(targetindex == numslides)
        {
            targetindex = 0;
        }
        
        //alert(targetindex);
        //alert(slidedirection);

        for(i = 0; i < numslides; i++)
        {
            if(document.getElementById('slideshow[' + i + ']'))
            {       
                if(i != targetindex && i != currentindex)
                {
                    document.getElementById('slideshow[' + i + ']').style.zIndex = 0;
                }
                else
                {
                    if(i == currentindex)
                    {
                        document.getElementById('slideshow[' + i + ']').style.zIndex = 1;
                    }
                    
                    if(i == targetindex)
                    {
                        if(slidedirection == 'righttoleft')
                        {
                            document.getElementById('slideshow[' + i + ']').style.left = '100%';

                            targetx1 = 0;
                            targetx2 = -100;                            
                            slideincrement = -5;
                            
                        }
                        
                        if(slidedirection == 'lefttoright')
                        {
                            document.getElementById('slideshow[' + i + ']').style.left = '-100%';

                            targetx1 = 0;
                            targetx2 = 100;                         
                            slideincrement = 5;                         
                            
                        }                       
                        
                        //alert(document.getElementById('slideshow[' + i + ']').style.left);
                        
                        document.getElementById('slideshow[' + i + ']').style.zIndex = 2;
                    }
                
                }
            }
            
            if(document.getElementById('squarediv[' + i + ']'))
            {
                if(i == targetindex)
                {
                    document.getElementById('squarediv[' + i + ']').className = 'h';
                }
                else
                {
                    document.getElementById('squarediv[' + i + ']').className = 'n';
                }
            }
        }

        slidecounter = 0;
        slide();

        //alert('here');
    }
    
    function slide()
    {   
        currentx1 = document.getElementById('slideshow[' + targetindex + ']').style.left;
        currentx1 = parseInt(currentx1.replace('%',''));    

        currentx2 = document.getElementById('slideshow[' + currentindex + ']').style.left;
        currentx2 = parseInt(currentx2.replace('%',''));            
        
        if(slidecounter == 0)
        {
            //alert(currentx1);
        }
        
        if((currentx1 != targetx1))
        {
            var newx1 = currentx1 + slideincrement;
            var newx2 = currentx2 + slideincrement;
        
            if(Math.abs(newx1 - targetx1) <= Math.abs(slideincrement))
            {
                newx1 = targetx1;
            }
            
            if(Math.abs(newx2 - targetx2) <= Math.abs(slideincrement))
            {
                newx2 = targetx2;
            }           

        }
        else
        {
            var previousindex = parseInt(targetindex) - 1;
            var nextindex = parseInt(targetindex) + 1;
            
            currentindex = targetindex;
            
            document.getElementById('slideshowarrowleftlink').setAttribute("href","javascript: manualstartslide(" + previousindex + ");");
            document.getElementById('slideshowarrowrightlink').setAttribute("href","javascript: manualstartslide("+ nextindex + ");");
            
            return;
        }
        
        //alert('currentx = ' + currentx + '    targetx = ' + targetx + '    newx = ' + newx);
        
        document.getElementById('slideshow[' + currentindex + ']').style.left = newx2 + '%';        
        document.getElementById('slideshow[' + targetindex + ']').style.left = newx1 + '%';

        slidecounter++;
        
        timerslide = setTimeout('slide()',10);
        
    }
    
    function slideautomatic()
    {
        slidetoposition(parseInt(targetindex) + 1);
        clearTimeout(timerautomatic);
        timerautomatic = setTimeout('slideautomatic()',8000);
    }

    var flagemailcleared = 0;
    
    function clearemail()
    {
        if(flagemailcleared == 0)
        {
            document.getElementById('promotionemail').value = '';
            flagemailcleared = 1;
        }
    }

    function registeremail()
    {
    
        var localvalue = requestcount;
        var email = document.getElementById('promotionemail').value;
        
        if(email.length < 5 || email == 'Enter E-Mail Address')
        {
            alert('You must enter an e-mail address.');
            return;
        }
        
        var poststring = "email=" + email + '&sourcepage=FAA+Home+Page';
        
        document.getElementById('promotionemaildiv').innerHTML = "<img src='/assets/images/Searching.gif'>";
        
        httpobject[localvalue] = newHttpReq();          
        httpobject[localvalue].onreadystatechange = function(){
        
            try 
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }
            
                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }
            
            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById('promotionemaildiv').innerHTML = httpobject[localvalue].responseText;           
            }
        
        
        };      
        
        var url = 'queries/querysubscribeemaillist.php';    

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(poststring);        
        
        requestcount += 1;      
    
    }

    function showemailform()
    {
    
        if(!document.getElementById('foregrounddiv') || !document.getElementById('backgrounddiv'))
        {
            var newdiv;
            var cssstyle;

            // Background Div
            if(!document.getElementById('backgrounddiv'))
            {
                newdiv = document.createElement('div');         
                cssstyle = 'position: fixed; z-index: 5000; left: 0px; top: 0px; width: 10px; height: 10px; background-color: #000000; visibility: hidden; opacity: 0.50; filter: alpha(opacity=50);';
                newdiv.id = 'backgrounddiv';
                newdiv.setAttribute('style',cssstyle);
                newdiv.style.cssText = cssstyle;
                document.body.appendChild(newdiv);              
            }
            
            // Foreground Div
            if(!document.getElementById('foregrounddiv'))
            {           
                newdiv = document.createElement('div');
                cssstyle = 'position: fixed; z-index: 5001; left: 0px; top: 0px; width: 780px; min-height: 50px; padding: 0px; overflow: auto; border: 15px solid #666666; background-color: #FFFFFF; visibility: hidden; box-shadow: 0px 0px 50px #000000;';
                newdiv.id = 'foregrounddiv';
                newdiv.setAttribute('style',cssstyle);
                newdiv.style.cssText = cssstyle;
                document.body.appendChild(newdiv);  
            }
        }
        
        var backgroundobject = document.getElementById('backgrounddiv');
        backgroundobject.style.width = '100%';
        backgroundobject.style.height = '100%';
        backgroundobject.style.visibility = 'visible';      
                
        var widthclient = parseInt(document.documentElement.clientWidth);
        var heightclient = parseInt(document.documentElement.clientHeight);
        
        //alert(widthclient);
        
        var widthtarget = parseInt(widthclient*0.80);
        var heighttarget = parseInt(heightclient*0.60);
        
        if((widthtarget + 30) > widthclient)
        {
            widthtarget = widthclient - 30;
        }
        
        if((heighttarget + 30) > heightclient)
        {
            heighttarget = heightclient - 30;
        }
        
        if(widthtarget > 880)
        {
            widthtarget = 880;
        }
        
        if(heighttarget > 680)
        {
            heighttarget = 680;
        }
        
        //var widthtarget = 800;
        //var heighttarget = 300;
        
        var offsetleft = 0;
        var offsettop = 0;
        
        var offsetx = 0;
        var offsety = 0;

        if(document.documentElement.scrollTop && !document.body.scrollTop)
        {
            //offsetleft = document.documentElement.scrollLeft;
            //offsettop = document.documentElement.scrollTop;
        }
        else
        {
            //offsetleft = document.body.scrollLeft;
            //offsettop = document.body.scrollTop;
        }       
        
        var logindiv = document.getElementById('foregrounddiv');
        logindiv.style.width = widthtarget + 'px';
        logindiv.style.height = heighttarget + 'px';
        logindiv.style.visibility = 'visible';
        logindiv.innerHTML = "<img src='/assets/images/Searching.gif' style='float: left;'>";
        
        logindiv.style.left = (offsetx + offsetleft + parseInt((widthclient - (widthtarget + 30)) / 2)) + 'px';
        logindiv.style.top = (offsety + offsettop + parseInt((heightclient - (heighttarget + 30)) / 2)) + 'px';

        var localvalue = requestcount;
        
        httpobject[localvalue] = newHttpReq();          
        httpobject[localvalue].onreadystatechange = function(){
        
            try 
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }
            
                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }
            
            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                document.getElementById('foregrounddiv').innerHTML = httpobject[localvalue].responseText;
            }
        
        
        };      

        var url = 'queries/queryemailsubscriptionforeground.php';
        var poststring = 'action=refresh';

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(poststring);    

        requestcount += 1;      
        
        return; 
    }
    
    function submitsubscriptionemail()
    {
        
        var localvalue = requestcount;
        var email = document.getElementById('subscriptionemail').value;
        
        if(email == '' || email == 'E-Mail Address')
        {
            alert('You must enter an e-mail address.');
            return;
        }
        
        document.getElementById('submitsubscriptiondiv').innerHTML = "<img src='/assets/images/Searching.gif' style='float: left; padding-top: 5px;'>";
        
        httpobject[localvalue] = newHttpReq();          
        httpobject[localvalue].onreadystatechange = function(){
        
            try 
            {
                if(httpobject[localvalue].readyState == 4)
                {
                }
            
                if(httpobject[localvalue].status == 200)
                {
                }
            }
            catch (e)
            {
                return;
            }
            
            if(httpobject[localvalue].readyState == 4 && httpobject[localvalue].status == 200)
            {
                var response = httpobject[localvalue].responseText.split("<EXTRAINSTRUCTIONS>");

                document.getElementById('foregrounddiv').innerHTML = response[0];
                
                if(response[1])
                {
                    eval(response[1]);
                }

            }
        
        
        };      
    
        var url = 'queries/queryemailsubscriptionforeground.php';
        var poststring = 'action=submit&sourcepage=FAA+Home+Page+Popup&email=' + email;

        httpobject[localvalue].open('post',url,true);
        httpobject[localvalue].setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        httpobject[localvalue].send(poststring);    

        requestcount += 1;      
        
        return;
    
    }
    
    
    function hideforegrounddiv()
    {
        document.getElementById('backgrounddiv').style.visibility = 'hidden';
        document.getElementById('foregrounddiv').style.visibility = 'hidden';
        document.getElementById('foregrounddiv').innerHTML = '&nbsp;';
    }

    function checkforentersubscriptionemail(theEvent)
    {
        if (theEvent == null)
        {
            theEvent = window.event;
        }
        
        if (theEvent.target)
        {
            theTarget = theEvent.target;
        }
        else
        {
            theTarget = theEvent.srcElement;
        }
    
        if (theEvent.keyCode == 13)
        {
            submitsubscriptionemail();
        }   
    }

    function checkkeyup(theevent)
    {
        if (theevent.keyCode == 27)
        {
            hideforegrounddiv();
        }
    
    }   

    function facebookpopup(url) 
    {
        var width = 680;
        var height = 400;
        
        var leftposition = Number((screen.width/2)-(width/2));
        var topposition = Number((screen.height/2)-(height/2));
        
        window.open(url,'facebookwindow','width=' + width + ',height=' + height + ',resizable=1,toolbar=0,menubar=0,status=0,location=0,left=' + leftposition + ',top=' + topposition); 
    }
    
    function googlepluspopup(url) 
    {
        var width = 720;
        var height = 500;
        
        var leftposition = Number((screen.width/2)-(width/2));
        var topposition = Number((screen.height/2)-(height/2));
        
        window.open(url,'googlepluswindow','width=' + width + ',height=' + height + ',resizable=1,toolbar=0,menubar=0,status=0,location=0,left=' + leftposition + ',top=' + topposition);
    }

    function twitterpopup(url) 
    {
        var width = 600;
        var height = 400;
        
        var leftposition = Number((screen.width/2)-(width/2));
        var topposition = Number((screen.height/2)-(height/2));
        
        window.open(url,'twitterwindow','width=' + width + ',height=' + height + ',resizable=1,toolbar=0,menubar=0,status=0,location=0,left=' + leftposition + ',top=' + topposition); 
    }
    
    
    function checkfacebookcount(sourceurl)
    {
        $.get('https://graph.facebook.com/' + sourceurl + '', function(data) {
            
            var fbshares = 0;
            var fblikes = 0;
            var fbtotal = 0;
            
            if ((data.shares != 0) && (data.shares != undefined) && (data.shares != null)) 
            {
                fbshares = data.shares;
            }

            if ((data.likes != 0) && (data.likes != undefined) && (data.likes != null)) 
            {
                fblikes = data.likes;
            }           
            
            fbtotal = fbshares + fblikes;

            if(true || fbtotal > 0)
            {
                if(fbtotal >= 1000)
                {
                    if(fbtotal >= 10000)
                    {
                        fbtotal = fbtotal / 1000;
                        fbtotal = fbtotal.toFixed(0) + 'K';
                    }
                    else
                    {
                        fbtotal = fbtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            
                document.getElementById('facebookcountdiv').style.display = 'inline-block';
                document.getElementById('facebookcount').innerHTML = fbtotal;
            }
            
        },'jsonp');
    
    }   

    function checkgooglepluscount(sourceurl)
    {

        $.get('/queries/querysocialapis.php?target=googleplus&url=' + sourceurl, function(data) {
        
            if ((data != 0) && (data != undefined) && (data != null)) 
            {
                if(data >= 1000)
                {
                    if(data >= 10000)
                    {
                        data = data / 1000;
                        data = data.toFixed(0) + 'K';
                    }
                    else
                    {
                        data = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }                   
                }
            
                document.getElementById('googlepluscountdiv').style.display = 'inline-block';
                document.getElementById('googlepluscount').innerHTML = data;
            }               
        },'html');
    
    }   

    function checktwittercount(sourceurl)
    {

        $.get('http://urls.api.twitter.com/1/urls/count.json?url=' + sourceurl, function(data) {
    
            if ((data.count != 0) && (data.count != undefined) && (data.count != null)) 
            {
                if(data.count >= 1000)
                {
                    if(data.count >= 10000)
                    {
                        data.count = data.count / 1000;
                        data.count = data.count.toFixed(0) + 'K';
                    }
                    else
                    {
                        data.count = data.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }                   
                }           
            
                document.getElementById('twittercountdiv').style.display = 'inline-block';
                document.getElementById('twittercount').innerHTML = data.count;
            }               
        },'jsonp');
    
    }   
    
    function mouseoverfacebook()
    {
        var targetobject = document.getElementById('facebookimage');
        targetobject.src = '/assets/images/IconFacebookSmall.png';
    }

    function mouseoutfacebook()
    {
        var targetobject = document.getElementById('facebookimage');
        targetobject.src = '/assets/images/IconFacebookSmallGrayscale.png';
    }

    function mouseovergoogleplus()
    {
        var targetobject = document.getElementById('googleplusimage');
        targetobject.src = '/assets/images/IconGooglePlusSmall.png';
    }

    function mouseoutgoogleplus()
    {
        var targetobject = document.getElementById('googleplusimage');
        targetobject.src = '/assets/images/IconGooglePlusSmallGrayscale.png';
    }
    
    function expandgallerydiv()
    {

        object = document.getElementById("gallerydiv");
        object.style.height = "";
        object.style.overflow = "visible";

    }

    function collapsegallerydiv()
    {

        object = document.getElementById("gallerydiv");
        object.style.overflow = "hidden";

    }

    function expandartistdiv()
    {

        object = document.getElementById("artistdiv");
        object.style.height = "";
        object.style.overflow = "visible";

    }

    function collapseartistdiv()
    {

        object = document.getElementById("artistdiv");
        object.style.overflow = "hidden";

    }
    
    function test()
    {
        alert($('#slideshowparent').css('width'));
    }
