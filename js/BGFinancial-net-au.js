window.consoleLog = true;
// ======================= do after 1️⃣ DOM loaded ➕ 2️⃣ Window loaded START ======================
    async function doAfterDOMandWindowLoaded(){
        if(window.consoleLog===true){console.log('doAfterDOMandWindowLoaded() called',new Date().toLocaleString());}

        // Immediately remove the 'no-js' class as soon as the module loads
            document.documentElement.classList.remove('assume-noscript-status-is-true');

        // Give the browser a tiny moment to render the new display: block
            requestAnimationFrame(() => {
                updateContentHeight();
            });

    }
// ======================= do after 1️⃣ DOM loaded ➕ 2️⃣ Window loaded END ========================
// The height calculation function START
    function updateContentHeight() {
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const main = document.querySelector('main');
        if (header && footer && main) {
            const hHeight = header.offsetHeight;
            const fHeight = footer.offsetHeight;
            const availableHeight = ( window.innerHeight - hHeight - fHeight * 0 );
            // Setting a CSS variable is often cleaner than direct style manipulation
                document.documentElement.style.setProperty('--ato-links-background-photo-height', `${availableHeight}px`);
                document.documentElement.style.setProperty('--header-height', `${hHeight}px`);
                document.documentElement.style.setProperty('--footer-height', `${fHeight}px`);
                console.log("💻🖥️📺");
                const styles = getComputedStyle(document.documentElement);
                console.log("Window inner height:-",window.innerHeight);
                console.log("Header height:-",hHeight);
                    const headerVar = styles.getPropertyValue('--header-height');
                    console.log("Header variable value:", headerVar);
                console.log("Footer height:-",fHeight);
                    const footerVar = styles.getPropertyValue('--footer-height');
                    console.log("Footer variable value:", footerVar);
                console.log("Available height:-",availableHeight);
                    const availableVar = styles.getPropertyValue('--ato-links-background-photo-height');
                    console.log("Available height variable value:", availableVar);
        }
    }
// The height calculation function END
document.addEventListener("DOMContentLoaded",async () => {
//1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
    if(window.consoleLog===true){console.log('DOMContentLoaded successsful ~ global_Client.',new Date().toLocaleString());}

    window.addEventListener("load",async () => {
    // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
        if(window.consoleLog===true){console.log('Window load successsful ~ global_Client.',new Date().toLocaleString());}

        await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
        await doAfterDOMandWindowLoaded();

    });
    // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END
});
// 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END

// Add event listeners START
    window.addEventListener('resize', () => {
        // Give the browser a tiny moment to render the new display: block
            requestAnimationFrame(() => {
                updateContentHeight();
            });
    });
    window.addEventListener('change', async (event) => {
        if(event.target.id){
            console.log(event.target);
            console.log(event.target.id);
            if(event.target.type === 'radio'){
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulated async process
            // Give the browser a tiny moment to render the new display: block
                requestAnimationFrame(() => {
                    updateContentHeight();
                });
            }
        }
    });
