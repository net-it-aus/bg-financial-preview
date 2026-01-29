window.consoleLog = true;

// ======================= do after 1️⃣ DOM loaded ➕ 2️⃣ Window loaded START ======================
    async function doAfterDOMandWindowLoaded(){
        if(window.consoleLog===true){console.log('doAfterDOMandWindowLoaded() called',new Date().toLocaleString());}

        // Immediately remove the 'no-js' class as soon as the module loads
            document.documentElement.classList.remove('assume-noscript-status-is-true');

    }
// ======================= do after 1️⃣ DOM loaded ➕ 2️⃣ Window loaded END ========================

// 🦻1️⃣
document.addEventListener("DOMContentLoaded",async () => {
    //1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
        if(window.consoleLog===true){console.log('DOMContentLoaded successsful ~ global_Client.',new Date().toLocaleString());}

        // 🦻2️⃣
        window.addEventListener("load",async () => {
            // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
                if(window.consoleLog===true){console.log('Window load successsful ~ global_Client.',new Date().toLocaleString());}

                await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
                await doAfterDOMandWindowLoaded();

                // Add event listeners START 🦻🦻🦻 ===================

                    // 🦻 automate nav on 📲 mobile 📲 devices 📲
                        const navRadioLabels = document.querySelectorAll('.nav-radio-label'); // Your menu links
                        // const closer = document.querySelector('.nav-toggle-closer'); // The overlay label
                        const navCheckboxToggle = document.getElementById('nav-toggle');

                        navRadioLabels.forEach(label => {
                            label.addEventListener('click', (event) => {
                                // Only 'click' the closer if the menu is actually open
                                    if (navCheckboxToggle.checked) {
                                        // closer.click();
                                        console.log('Mobile nav menu will now close.',event.target.classList);
                                        const classes = event.target.classList;
                                        if(classes.contains('nav-radio-label') && classes.contains('services')){
                                            console.log('Confirmed: nav-radio-label was clicked.');
                                        } else {
                                            navCheckboxToggle.checked = false; // Close the menu
                                        }
                                    }
                            });
                        });

                // Add event listeners END   🦻🦻🦻 ===================

        });
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END
});
// 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END