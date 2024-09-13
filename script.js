/*  

    // highlight border elements for testing

    const elements = document.querySelectorAll('body *');
    
    elements.forEach(element => {
        element.style.border = '1px solid var(--testcolor)';
    }); 
*/

const header = document.getElementById('header');

const menuHome = document.createElement('div');
menuHome.setAttribute('class', 'dropdown');
menuHome.setAttribute('id', 'home');
menuHome.innerHTML = '<a href="index.html#intro" class="menuheader">Home</a>';

const menuDev = document.createElement('div');
menuDev.setAttribute('class', 'dropdown');
menuDev.innerHTML =
  '<a href="index.html#coding" class="menuheader">Developer</a>';
const optionDev = document.createElement('div');
optionDev.setAttribute('class', 'menuitems');
optionDev.innerHTML =
  '<a href="page_resume.html">My Resume</a>' +
  '<a href="https://github.com/benhwlcode" target="_blank">My Github</a>';
menuDev.appendChild(optionDev);

const menuAbout = document.createElement('div');
menuAbout.setAttribute('class', 'dropdown');
menuAbout.innerHTML =
  '<a href="index.html#about" class="menuheader">About&nbsp;Me</a>';
const optionAbout = document.createElement('div');
optionAbout.setAttribute('class', 'menuitems');
optionAbout.innerHTML =
  '<a href="page_interpreter.html" style="display: none;">Interpreter</a>' +
  '<a href="page_writer.html" style="display: none;">Writer</a>';
menuAbout.appendChild(optionAbout);

const menuTheme = document.createElement('div');
menuTheme.setAttribute('class', 'dropdown');
menuTheme.innerHTML = '<span class="menuheader">Theme</span>';
const optionTheme = document.createElement('div');
optionTheme.setAttribute('class', 'menuitems');
optionTheme.innerHTML =
  '<a onclick="changeToLight()">Light Theme</a>' +
  '<a onclick="changeToDark()">Dark Theme</a>';
menuTheme.appendChild(optionTheme);

const menuCard = document.createElement('div');
menuCard.setAttribute('id', 'contactcard');
menuCard.innerHTML =
  '<a href="http://benhwliu.com" target="_blank" class="carditem">benhwliu.com</a>';
const optionCard = document.createElement('span');
optionCard.setAttribute('class', 'cardicons');
optionCard.innerHTML =
  '<a href="mailto:ben.liu.hwl@gmail.com"><i class="fa-regular fa-envelope fa-2x"></i></a>' +
  '<a href="https://github.com/benhwlcode" target="_blank"><i class="fa-brands fa-github fa-2x"></i></a>' +
  '<a href="https://www.linkedin.com/in/hsuan-wei-liu-7a87032a8" target="_blank"><i class="fa-brands fa-linkedin-in fa-2x"></i></a>';
menuCard.appendChild(optionCard);

header.appendChild(menuHome);
header.appendChild(menuDev);
header.appendChild(menuAbout);
header.appendChild(menuTheme);
header.appendChild(menuCard);

function changeToLight() {
  const root = document.documentElement;

  root.style.setProperty('--fontcolor', 'black');
  root.style.setProperty('--fontshadow', 'white');
  root.style.setProperty(
    '--themeshade',
    'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))'
  );
  root.style.setProperty('--themeblend', 'lighten');
  root.style.setProperty('--shadowright', '2px 2px 5px black');
  root.style.setProperty('--shadowleft', '-2px 2px 5px black');
}

function changeToDark() {
  const root = document.documentElement;

  root.style.setProperty('--fontcolor', 'lightgrey');
  root.style.setProperty('--fontshadow', 'black');
  root.style.setProperty('--themeshade', 'rgba(0, 0, 0, 0.8)');
  root.style.setProperty('--themeblend', 'mutiply');
  root.style.setProperty('--shadowright', '2px 2px 5px white');
  root.style.setProperty('--shadowleft', '-2px 2px 5px white');
}

/*

    // HTML code for header elements

    <div class="dropdown" id="home">
            <a href="index.html#intro" class="menuheader">Home</a>
        </div>

        <div class="dropdown">
            <a href="index.html#coding" class="menuheader">Developer</a>
            <div class="menuitems">
                <a href="page_resume.html">My Resume</a>
                <a href="https://github.com/benhwlcode" target="_blank">My Github</a>
            </div>
        </div>

        <div class="dropdown">
            <a href="index.html#about" class="menuheader">About&nbsp;Me</a>
            <div class="menuitems">
                <a href="page_interpreter.html" style="display: none;">Interpreter</a>
                <a href="page_writer.html" style="display: none;">Writer</a>
            </div>
        </div>

        <div class="dropdown">
            <span class="menuheader">Theme</span>
            <div class="menuitems">
                <a onclick="changeToLight()">Light Theme</a>
                <a onclick="changeToDark()">Dark Theme</a>
            </div>
        </div>

        <div id="contactcard">
            <a href="http://benhwliu.com" target="_blank" class="carditem">benhwliu.com</a>
            <span class="cardicons">
                <a href="#">
                    <i class="fa-regular fa-envelope fa-2x"></i></a>
                <a href="https://github.com/benhwlcode" target="_blank">
                    <i class="fa-brands fa-github fa-2x"></i></a>
                <a href="https://www.linkedin.com/in/hsuan-wei-liu-7a87032a8" target="_blank">
                    <i class="fa-brands fa-linkedin fa-2x"></i></a>
                </span>
        </div>
    */
