$(document).ready(function() {
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
        startAI();
        startForm()
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
            onComplete: function() {
                userInputReveal = TweenMax.to('#userInput', 0.5, {
                    'width': '75%',
                    'margin': '0 0 0 -37.5%'
                })

                loadAI()
                $('#begin').hide()
            }
        })
    }

})


var loadGit = function() {
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
        $('#interact').append('<div id="' + info[i].name + '" class="repobar">' + info[i].name + '</div>')
        var barID = '#' + info[i].name
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

        gitStats(info[i].name, info[i].language)
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

        thisID = '#' + name
        $(thisID).on('mouseover', function() {
          $('#typeBox').html('Desk:  <span class="element"></span>')
          gitAIResponse = "<br>"
          if (commitdata.JavaScript != null)
            gitAIResponse += "Javascript :" + commitdata.JavaScript + "<br>"
          if (commitdata.Ruby != null)
            gitAIResponse += "Ruby :" + commitdata.Ruby + "<br>"
          if (commitdata.HTML != null)
            gitAIResponse += "HTML :" + commitdata.HTML + "<br>"
          if (commitdata.CSS != null)
            gitAIResponse += "CSS :" + commitdata.CSS + "<br>"
          if (commitdata.Python != null)
            gitAIResponse += "Python :" + commitdata.Python + "<br>"
          AIresponse([gitAIResponse])
        })
    })
}

var loadContact = function() {
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
    titleType('Experiences')
    AIresponse(['Loading Past Experiences', 'Done!'])
    $('#interact').css({
        'width': '90%',
        'height': '50%',
        'margin': 'auto'
    })
    $('#interact').append("<h3 class='jMain'>Chook & Broosky : Director</h3><h4 class='jDate'>2014-current</h4><h5 class='jDesc'>Involved in every aspect of establishing the businesss from legal & accounting decisions, recipe & menu design, interior design & assembly, to marketing & branding.</h5><hr><h3 class='jMain'>University of Newcastle : Casual Academic & Research Assistant</h3><h4 class='jDate'>2013-2014</h4><h5 class='jDesc'>Tutored second year Finance Subjects. Involved in minor research projects.</h5><hr><h3 class='jMain'>Refs Inc. | SuperSevens : Professional Paintball Referee</h3><h4 class='jDate'>2007-2012</h4><h5 class='jDesc'>Travelled around Australia and Asia part of a Paintball Professional Marshall body.<hr><h3 class='jMain'>Bar on The Hill : DJ</h3><h4 class='jDate'>2008-2010</h4><h5 class='jDesc'>Resident DJ at a club and did many private gigs. Running a small private DJ and equipment service at the same time.</h5>")
    minimizeAI()
}

var loadEducation = function() {
    titleType('Education')
    AIresponse(['Loading Education', 'Done!'])
    $('#interact').css({
        'width': '90%',
        'height': '50%',
        'margin': 'auto'
    })
    $('#interact').append("<h3 class='jMain'>General Assembly : Web Development Immersive</h3><h4 class='jDate'>May 2015 - July 2015</h4><h5 class='jDesc'>Full Stack immersive. Course covered HTML, CSS, JavaScript, Ruby, Ruby on Rails, Advanced JS, Advanced Ruby and rSpec.</h5><hr><h3 class='jMain'>University of Newcastle : Masters of Applied Finance</h3><h4 class='jDate'>2012<h4><hr><h3 class='jMain'>University of Newcastle : Bachelor of Commerce, Finance & Economics Major</h3><h4 class='jDate'>2008-2011<h4><hr>")
    minimizeAI()
}

var loadSkills = function() {
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
