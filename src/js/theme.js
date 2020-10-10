let isThemeLight = true;
let themeText = 'Light';


const toggleTheme = () =>{
    const bodyEl = document.body;
    isThemeLight = !isThemeLight;

    if (isThemeLight) {
        bodyEl.classList.add('theme-light');
        bodyEl.classList.remove('theme-dark');
        themeText = 'Light';
    } else {
        bodyEl.classList.add('theme-dark');
        bodyEl.classList.remove('theme-light');
        themeText = 'Dark';
    }
}

export {themeText, toggleTheme };