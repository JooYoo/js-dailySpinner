let isThemeLight = true;
let themeText = 'light';


const toggleTheme = () =>{
    const bodyEl = document.body;
    isThemeLight = !isThemeLight;

    if (isThemeLight) {
        bodyEl.classList.add('theme-light');
        bodyEl.classList.remove('theme-dark');
        themeText = 'light';
    } else {
        bodyEl.classList.add('theme-dark');
        bodyEl.classList.remove('theme-light');
        themeText = 'dark';
    }
}

export {themeText, toggleTheme };