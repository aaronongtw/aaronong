$(document).ready(function() {

    if (location.hash.length > 0) {
        startAI()
        if (location.hash == "#git") {
            loadGit()
        } else if (location.hash == "#skills") {
            loadSkills()
        } else if (location.hash == "#education") {
            loadEducation()
        } else if (location.hash == "#experience") {
            loadExperience()
        } else if (location.hash == "#contact") {
            loadContact()
        } else if (location.hash == "#portfolio") {
            loadPortfolio()
        }
    } else {

        var autoStart = setTimeout(function() {
            startAI()
            startForm()
        }, 12000)

        $('#begin').on('mouseover', function() {
            whiteOUt = TweenMax.to('.whiteout', 1, {
                'color': 'white'
            })
            TweenMax.to('.subsentence', 1, {
                'color': 'rgba(255, 100, 100, 1)'
            })
            TweenMax.to('#begin', 1, {
                'color': 'rgba(100, 160, 115, 1)'
            })
        })


        $('#begin').on('click', function() {
            clearTimeout(autoStart)
            startAI();
            startForm()
        })

    }
})

var startAI = function() {
    whiteAll = TweenMax.to('span', 1, {
        'color': 'white',
        onComplete: function() {
            $('#startTitle').html('')
            $('#startTitle').css({
                'color': 'black',
                'padding': '0px',
                'margin-top': '5px'
            })
            titleType('lets...')
        }
    })
    startConsole = TweenMax.to('.box', 1.5, {
        'display': 'block',
        'top': '70%',
        'left': '10%',
        'width': '80%',
        'height': '20%',
    })
    userInputReveal = TweenMax.to('#userInput', 0.5, {
        'width': '75%',
        'margin': '0 0 0 -37.5%'
    })

    loadAI()
    $('#begin').hide()
    $('.fa-question-circle').on('click', function() {
        helpButton()
    })
    $('.fa-list').on('click', function() {
        lsButton()
    })
    $('.userButtons').css('display','block')

}




var loadGit = function() {
    location.hash = "git"
    titleType('Git Repos')
    AIresponse(['Loading Git Data', 'Done!'])
    $.ajax({
        url: 'https://api.github.com/users/aaronongtw/repos',
        dataType: 'json',
    }).done(function(info) {
        displayGitInfo(info)
        $('#interact').css({
            'width': '90%',
            'height': '50%',
            'margin': 'auto'
        })
    })
    minimizeAItoLeft()
}

var displayGitInfo = function(info) {

    for (var i = 0; i < info.length; i++) {
        var name = info[i].name.split('.')[0]
        $('#interact').append('<a href=' + info[i].html_url + '><div id="' + name + '" class="repobar">' + name + '</div></a>')
        var barID = '#' + name
        var color;
        if (info[i].language == "JavaScript")
            color = 'palegoldenrod'
        else if (info[i].language == "Ruby")
            color = 'tomato'
        else if (info[i].language == "HTML")
            color = 'salmon'
        else if (info[i].language == "Python")
            color = 'skyblue'
        else
            color = 'papayawhip'
        var height = (Math.log(info[i].size) * 10) + 'px'

        gitStats(info[i].name)
        growBar = TweenMax.to(barID, 3, {
            'height': '80px',
            'background': color
        })
    }
}

var gitStats = function(name) {
    $.ajax({
        url: "https://api.github.com/repos/aaronongtw/" + name + "/languages",
        dataType: 'json',
    }).done(function(commitdata) {
        thisID = '#' + name.split('.')[0]
        $(thisID).on('mouseover', function() {
            $(this).css('opacity', 1)
            $('#typeBox').html('Desk:  <span class="element"></span>')
            gitAIResponse = "<br>"
            if (commitdata.JavaScript != null)
                gitAIResponse += "Javascript: " + commitdata.JavaScript + " Chars <br>"
            if (commitdata.Ruby != null)
                gitAIResponse += "Ruby : " + commitdata.Ruby + " Chars <br>"
            if (commitdata.HTML != null)
                gitAIResponse += "HTML : " + commitdata.HTML + " Chars <br>"
            if (commitdata.CSS != null)
                gitAIResponse += "CSS : " + commitdata.CSS + " Chars <br>"
            if (commitdata.Python != null)
                gitAIResponse += "Python : " + commitdata.Python + " Chars <br>"
            if (commitdata.Go != null)
                gitAIResponse += "Go : " + commitdata.Go + " Chars <br>"
            AIresponse([gitAIResponse])
        })
    })
}

var loadContact = function() {
    location.hash = "contact"
    titleType('Contact Information')
    AIresponse(['Loading Contact Details', 'Done!'])
    $('#interact').css({
        'width': '90%',
        'height': '50%',
        'margin': 'auto'
    })
    $('#interact').append('<h3>Email: aaronongtw@gmail.com</h3><h3>GitHub: aaronongtw </h3><h3>Mobile: 04 66669835 </h3>')
    minimizeAI()
}

var loadExperience = function() {
    location.hash = "experience"
    titleType('Experiences')
    AIresponse(['Loading Past Experiences', 'Done!'])
    $('#interact').css({
        'width': '90%',
        'height': '50%',
        'margin': 'auto'
    })
    $('#interact').append("<h3 class='jMain'>Chook & Broosky : Director</h3><h4 class='jDate'>2014-current</h4><h5 class='jDesc'>Involved in every aspect of establishing the businesss from legal & accounting decisions, recipe & menu design, interior design & assembly, to marketing & branding.</h5><hr><h3 class='jMain'>University of Newcastle : Casual Academic & Graduate Research Assistant</h3><h4 class='jDate'>2013-2014</h4><h5 class='jDesc'>Tutored second year Finance Subjects. Conducted research aimed for completion of PhD and publication. Research topic was 'Idiosyncratic Risk and Asymmetric Equity Return Distribution.</h5><hr><h3 class='jMain'>Refs Inc. | SuperSevens : Professional Paintball Referee</h3><h4 class='jDate'>2007-2012</h4><h5 class='jDesc'>Travelled around Australia and Asia part of a Paintball Professional Marshall body.<hr><h3 class='jMain'>Bar on The Hill : DJ</h3><h4 class='jDate'>2008-2010</h4><h5 class='jDesc'>Resident DJ at a club and did many private gigs. Running a small private DJ and equipment service at the same time.</h5>")
    minimizeAI()
}

var loadEducation = function() {
    location.hash = "education"
    titleType('Education')
    AIresponse(['Loading Education', 'Done!'])
    $('#interact').css({
        'width': '90%',
        'height': '50%',
        'margin': 'auto'
    })
    $('#interact').append("<h3 class='jMain'>General Assembly : Web Development Immersive</h3><h4 class='jDate'>May 2015 - July 2015</h4><h5 class='jDesc'>Full Stack immersive. Course covered HTML, CSS, JavaScript, Ruby, Ruby on Rails, Advanced JS, Advanced Ruby and rSpec.</h5><hr><h3 class='jMain'>University of Newcastle : Research Methodology</h3><h4 class='jDate'>2013<h4><hr><h3 class='jMain'>University of Newcastle : Masters of Applied Finance</h3><h4 class='jDate'>2012<h4><hr><h3 class='jMain'>University of Newcastle : Bachelor of Commerce, Finance & Economics Major</h3><h4 class='jDate'>2008-2011<h4><hr>")
    minimizeAI()
}

var loadSkills = function() {
    location.hash = "skills"
    titleType('Skills')
    AIresponse(['Loading Skills', 'Done!'])
    $('#interact').css({
        'width': '90%',
        'height': '50%',
        'margin': 'auto'
    })
    $('#interact').append('<div id="skills"><div id="skillmap"><div class="skills-wrapper"><div class="skills-sunburst"></div><div class="skills-chart"><div id="skills-chart-breadcrumb"></div></div></div></div></div><script type="text/javascript">d3.select(self.frameElement).style("height", "400px");</script>')
    startSkilld3()
    minimizeAI()
}

var loadPortfolio = function() {
    location.hash = "portfolio"
    titleType('Portfolio')
    AIresponse(['Loading Portfolio', 'Done!'])
    $('#interact').css({
        'width': '90%',
        'height': '50%',
        'margin': 'auto'
    })
    $('#interact').append('<a href="http://clawofnoms.herokuapp.com"><img class="portfolioImages" src="assets/images/claw.png"></a><a href="http://ottadd.herokuapp.com"><img class="portfolioImages" src="assets/images/ottadd.png"></a><a href="aaronongtw.github.io/dungeonEscape"><img class="portfolioImages" src="assets/images/dungeon.png"></a><a href="aaronongtw.github.io/TaoOfProgramming"><img class="portfolioImages" src="assets/images/tao.png"></a>')
}
