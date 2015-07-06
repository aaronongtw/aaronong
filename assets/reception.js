var responses = [];
var loadAI = function() {
    console.log('check')
    if (JSON.parse(localStorage.getItem('aotwAI')) != null) {
        responses = JSON.parse(localStorage.getItem('aotwAI'))
        age()
        AIresponse([' Hi there, How can I help you today? (Local Storage Intelligence Loaded)'])
    } else {
        $.getJSON("assets/AI.json", function(json) {
            responses = json;
            age()
            AIresponse(['Hi there, How can I help you today?'])
        })
    }
}

var age = function() {
    var d = new Date(2015, 6, 1)
    age = Date.now() - d
    age = [(age / (1000 * 60 * 60 * 24)) + " days old."]
}






var learnFlag = false;
var aboutFlag = false;
var l1;
var userInitialComment;
var age;
var clientName


var helpButton = function() {
    $('#typeBox').html('Desk:  <span class="element"></span>')
    AIresponse(["For quick access to 'About Aaron', simply type 'ls'. You may also talk to me to navigate around the website. I have also been programmed to learn from you if I do not understand."])
}

var lsButton = function(){
    $('#typeBox').html('Desk:  <span class="element"></span>')
    AIresponse(["**cd to load(eg. cd Portfolio)**<br><span class='ls'>Portfolio</span><span class='ls lsr1'>GitStats</span><br><span class='ls'>Experience</span><span class='ls lsr2'>Education</span><br><span class='ls'>Skills</span><span class='ls lsr3'>Contact</span>"])
}

var startForm = function() {
    $('form').on('submit', function(e) {
        // if ($('#userInput').val().length > 400) {
        //     $('#typeBox').html('Desk:  <span class="element"></span>')
                
        // }
        clearScreen()
        e.preventDefault()
        $('#typeBox').html('Desk:  <span class="element"></span>')
        responseID = -1
        userInput = $('#userInput').val()
        levDistance = 10
        if (userInput.match(/.*\b(gitstat|repo|github)/i) != null) {
            loadGit()
        }
        else if (userInput.match(/.*\b(contact|get in touch|phone|email|linkedin|linked in|mobile)/i) != null) {
            loadContact()
        } else if (userInput.match(/.*\b(experience|background|work)/i) != null) {
            loadExperience() 
        } else if (userInput.match(/.*\b(qualification|education|school|uni|college)/i) != null) {
            loadEducation()
        } else if (userInput.match(/.*\b(skill|ability|abilities|language|framework|[front end|frontend]|[back end|backend]|stack|javascript|ruby|html|css|design)/i) != null) {
            loadSkills()
        } else if (learnFlag == true) {
            responses.push(userInitialComment)
            responses.push(userInput)
            gratitudeResponse = ["Thank you", "Updating my AI^1000...", "Done. The updates are only applied to your local DOM due to my lack of back end the moment."]
            console.log('learning...')
            AIresponse(gratitudeResponse)
            localStorage.setItem('aotwAI', JSON.stringify(responses));
            learnFlag = false
        } else if (aboutFlag == true) {
            if (userInput.match(/.*(yes|yea|ya|sure|okay|ok)/) != null) {
                titleType('All About Aaron')
                AIresponse([responses[46]])
                aboutFlag = false;
            } else {
                aboutFlag = false;
                AIresponse(['So what can I do for you then?'])
            }
        } else {
            if (Levenshtein(userInput, "I don't understand") < 5 || Levenshtein(userInput, "That doesn't make sense") < 5) {
                relevanceResponse = ["I'm sorry that didn't make any sense", "Updating my AI^1000....", "Done"]
                console.log('irrelevant response')
                AIresponse(relevanceResponse)
            } else {
                for (var i = 0; i < responses.length; i++) {
                    if (Levenshtein(responses[i], userInput) < levDistance) {
                        levDistance = Levenshtein(responses[i], userInput)
                        responseID = i + 1
                        console.log('known input')
                    }
                }
                if (responseID > -1) {
                    if (responses[responseID] == "!age") {
                        AIresponse(age)
                    } else if (responses[responseID] == "!clientName") {
                        clientName = userInput.match(/my name is (.*)/i)
                        clientName = clientName[1]
                        nameResponse = ["Hello " + clientName + ", Nice to meet you."]
                        AIresponse(nameResponse)
                    } else if (responses[responseID] == "!Aaron") {
                        aboutFlag = true;
                        AIresponse(['Aaron is my creator. Would you like to know more about him?'])
                    } else if (responses[responseID] == "!Time") {
                        var dt = new Date();
                        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                        AIresponse(['The time now is ' + time])                        
                    } else {
                        AIresponse([responses[responseID]])
                    }
                } else {
                    learningResponse = ["I don't understand what you mean.", "Please teach me how I should respond to that."]
                    learnFlag = true
                    userInitialComment = userInput
                    console.log('unknown input')
                    AIresponse(learningResponse)
                    titleType('AI Learning')
                }
            }
        }


    })

}

var createListeners = function() {
    console.log('listeners Created')
    $('.ls').css('cursor', 'pointer')
    $('.ls').on('click', function() {
        clearScreen()
        where = $(this).html()
        if (where == "GitStats")
            loadGit()
        else if (where == "Contact")
            loadContact()
        else if (where == "Experience")
            loadExperience()
        else if (where == "Education")
            loadEducation()
        else if (where == "Skills")
            loadSkills()
    })
}

var titleType = function(text) {
    $('#startBox').html('<h1 id="startTitle"></h1>')
    $('#startTitle').typed({
        strings: [text],
        typeSpeed: 100,
        cursorChar: ""
    })
}

var minimizeAI = function() {
    TweenMax.to('.box',1.5, {
        'opacity':'0.2',
        'width' : '20%',
        'left' : '70%'
    })
    TweenMax.to('#userInput',1.5, {
        'opacity':'0.2',
        'width' : '20%',
        'left' :'110%'
    })
    $('i').hide()
    $('#userInput').on('click',function(){
        maximizeAI()
    })
}

var minimizeAItoLeft = function() {
    TweenMax.to('.box',1.5, {
        'opacity':'0.8',
        'width' : '30%',
        'left' : '5%',
        'top' : '60%',
        'height': '30%'
    })
    TweenMax.to('#userInput',1.5, {
        'opacity':'0.2',
        'width' : '20%',
        'left' :'40%'
    })
    $('i').hide()
    $('#userInput').on('click',function(){
        maximizeAI()
    })
}

var maximizeAI = function() {
    TweenMax.to('.box',1.5, {
        'opacity':'1',
        'width' : '80%',
        'left' : '10%',
        'height' : '20%'
    })
    TweenMax.to('#userInput',1.5, {
        'opacity':'1',
        'left' :'50%',
        'width' : '75%'
    })
    $('i').show()
}


var clearScreen = function() {
    $('#interact').html('')
    titleType('Home')
}

var AIresponse = function(reply) {
    $('#userInput').val('').focus()
    $(".element").typed({
        contentType: 'html',
        strings: reply,
        // typing speed
        typeSpeed: 0,
        // time before typing starts
        startDelay: 0,
        // backspacing speed
        backSpeed: 0,
        // time before backspacing
        backDelay: 500,
        // loop
        loop: false,
        // false = infinite
        loopCount: false,
        // show cursor
        showCursor: true,
        // character for cursor
        cursorChar: "_",
        // attribute to type (null == text)
        attr: null,
        // either html or text
        contentType: 'html',
        // call when done callback function
        callback: function() {},
        // starting callback function before each string
        preStringTyped: function() {},
        //callback for every typed string
        onStringTyped: function() {},
        // callback for reset
        resetCallback: function() {}
    });
    if (reply == "**cd to load(eg. cd Portfolio)**<br><span class='ls'>Portfolio</span><span class='ls lsr1'>GitStats</span><br><span class='ls'>Experience</span><span class='ls lsr2'>Education</span><br><span class='ls'>Skills</span><span class='ls lsr3'>Contact</span>") {

        setTimeout(function() {
            createListeners()
        }, 8000)
    }
}
