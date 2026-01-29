window.consoleLog = true;

// ======================= do after 1️⃣ DOM loaded ➕ 2️⃣ Window loaded START ======================
    async function doAfterDOMandWindowLoaded(){
        if(window.consoleLog===true){console.log('doAfterDOMandWindowLoaded() called',new Date().toLocaleString());}

        // Immediately remove the 'no-js' class as soon as the module loads
            document.documentElement.classList.remove('assume-noscript-status-is-true');

    }
// ======================= do after 1️⃣ DOM loaded ➕ 2️⃣ Window loaded END ========================

// 🦻
document.addEventListener("DOMContentLoaded",async () => {
//1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
    if(window.consoleLog===true){console.log('DOMContentLoaded successsful ~ global_Client.',new Date().toLocaleString());}

    // 🦻
    window.addEventListener("load",async () => {
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
        if(window.consoleLog===true){console.log('Window load successsful ~ global_Client.',new Date().toLocaleString());}

        await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
        await doAfterDOMandWindowLoaded();

        // Add event listeners START 🦻🦻🦻 ===================

            // 🦻 automate nav on mobile devices
                const navLinks = document.querySelectorAll('.nav-radio-label'); // Your menu links
                const closer = document.querySelector('.nav-toggle-closer'); // The overlay label
                const checkbox = document.getElementById('nav-toggle');

                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        // Only 'click' the closer if the menu is actually open
                        if (checkbox.checked) {
                            closer.click(); 
                        }
                    });
                });

            // 🦻
                window.addEventListener('resize', () => {

                });

            // 🦻
                window.addEventListener('change', async (event) => {

                });

        // Add event listeners END   🦻🦻🦻 ===================

    });
    // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END
});
// 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END