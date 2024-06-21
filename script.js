    /*
    const elements = document.querySelectorAll('body *');
    
    elements.forEach(element => {
        element.style.border = '1px solid var(--testcolor)';
    });
    */   

    function changeToLight() {

        const root = document.documentElement;

        root.style.setProperty('--fontcolor', 'black'); 
        root.style.setProperty('--fontshadow', 'white');
        root.style.setProperty('--themeshade', 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))');
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