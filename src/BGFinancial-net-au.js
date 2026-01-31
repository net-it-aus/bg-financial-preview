window.consoleLog = false;

    function getDimensions(e){ // 📐📏 get dimensions of viewport and element e 📐📏
        if (!e) return {}; // Guard clause if element isn't found
        // Get viewport dimensions function START
            const header = document.querySelector('header');
            const footer = document.querySelector('footer');

            const headerHeight = header.offsetHeight;
            const headerWidth = header.offsetWidth;
            const footerHeight = footer.offsetHeight;
            const footerWidth = footer.offsetWidth;
            const windowInnerHeight = window.innerHeight;
            const windowInnerWidth = window.innerWidth;

            const eTargetId = e.id;
            const eTargetClassList = e.classList;
            const eRect = e.getBoundingClientRect();
            const eTargetHeight = eRect.height;
            const eTargetWidth = eRect.width;
            return {
                windowInnerHeight: windowInnerHeight,
                windowInnerWidth: windowInnerWidth,
                headerHeight: headerHeight,
                headerWidth: headerWidth,
                footerHeight: footerHeight,
                footerWidth: footerWidth,
                eTargetId: eTargetId,
                eTargetClassList: eTargetClassList,
                eTargetHeight: eTargetHeight,
                eTargetWidth: eTargetWidth
            };
        // Get viewport dimensions function END
    }

// Adjust if Page 06 selected START
    function getPage06SpacerHeight(){
        if(window.consoleLog===true){console.log(`getPage06SpacerHeight() called`,new Date().toLocaleString());}
        // alert(`getPage06SpacerHeight() called`);
        // if(event.target.id.toLowerCase() === 'radio-btn-06') {
            if(window.consoleLog===true){console.log('Page 6 selected. Updating dimensions...');}
            // Give the browser a tiny moment to render the new display: block
            requestAnimationFrame(async () => {
                // const e = document.getElementsByClassName('page-ato-links');
                const e = document.querySelector('.page-ato-links');
                if(window.consoleLog===true){console.log(e);}
                if(window.consoleLog===true){console.log(getDimensions(e));}
                const jso = getDimensions(e);
// // REMOVE FOR PRODUCTION ❔ insert a slight delay to allow the page to render so that dimensions are accurate
                                        await new Promise(resolve => setTimeout(resolve, 150)); // Simulated async process
// // REMOVE FOR PRODUCTION ❔ insert a slight delay to allow the page to render so that dimensions are accurate
                // alert(`
                //     Dimensions updated trigger: ${triggerSource}:\n
                //     Window Inner Height: ${jso.windowInnerHeight}px\n
                //     Header Height: ${jso.headerHeight}px\n
                //     Footer Height: ${jso.footerHeight}px\n
                //     Element ID: ${jso.eTargetId}\n
                //     Element Classes: ${jso.eTargetClassList}\n
                //     Element Height: ${jso.eTargetHeight}px\n
                //     Additional height required to fill viewport height: 
                //     ${jso.windowInnerHeight 
                //         - jso.headerHeight 
                //         - jso.footerHeight 
                //         - jso.eTargetHeight}px
                // `);
                const spacerHeight = Math.max(0,
                                        jso.windowInnerHeight 
                                        - jso.headerHeight 
                                        - jso.footerHeight 
                                        - jso.eTargetHeight
                                            // + 20 * 0
                                        ).toFixed(0); // add 16px to account for margin/padding
                // alert(`Calculated spacer height: ${spacerHeight}`);
                // set spacer height manuall instead of via CSS variable
                    document.documentElement.style.setProperty('--spacer-height', `${spacerHeight}px`);
                // set spacer height manuall instead of via CSS variable
// // REMOVE FOR PRODUCTION ❔ insert a slight delay to allow the page to render so that dimensions are accurate
                                        await new Promise(resolve => setTimeout(resolve, 150)); // Simulated async process
// // REMOVE FOR PRODUCTION ❔ insert a slight delay to allow the page to render so that dimensions are accurate
                const styles = getComputedStyle(document.documentElement);
                const spacerHeightVar = styles.getPropertyValue('--spacer-height');
                // alert(`Spacer variable value: ${spacerHeightVar}`);
                // document.querySelector('.spacer').style.backgroundColor = 'lightgreen';
                document.querySelector('.spacer').style.height = `${spacerHeight}px`;
            });
        // } else {
        //     if(window.consoleLog===true){console.log('Page 6 not selected. No adjustment needed.');}
        //     document.documentElement.style.setProperty('--spacer-height', `0px`);
        //     document.querySelector('.spacer').style.height = `0px`;
        //     e.style.height = `100%`;
        // }
    }
// Adjust if Page 06 selected END


// ======================= do after 1️⃣ DOM loaded ➕ 2️⃣ Window loaded START ======================
    async function doAfterDOMandWindowLoaded(){
        // if(window.consoleLog===true){console.log('doAfterDOMandWindowLoaded() called',new Date().toLocaleString());}

        // Immediately remove the 'no-js' class as soon as the module loads
            document.documentElement.classList.remove('assume-noscript-status-is-true');

        // 🦻 Orientation and Page-06 "Source of Truth" START =======================
            // 1. The "Source of Truth" function
                function updateLayout() {
                    // const isLandscape = window.matchMedia("(orientation: landscape)").matches;
                    const page06RadioBtn = document.getElementById('radio-btn-06');
                    // if(window.consoleLog===true){console.log(`System Check: ${isLandscape ? 'Landscape' : 'Portrait'} | Page 6 is active: ${page06RadioBtn.checked}`);]
                    if(window.consoleLog===true){console.log(`Page 6 is active: ${page06RadioBtn.checked}`);}
                    // Specific logic for Page-06
                        if (page06RadioBtn.checked === true) {
                            const spacerHeight = getPage06SpacerHeight();
                        } else {
                            if(window.consoleLog===true){console.log('Page 6 not selected. No adjustment needed.');}
                            document.documentElement.style.setProperty('--spacer-height', `0px`);
                            document.querySelector('.spacer').style.height = `0px`;
                        }
                }
            // 2. Attach the listeners to the "Source of Truth"
                // 2.1
                    // create a MediaQueryList object
                        const orientationQuery = window.matchMedia("(orientation: landscape)");
                        // Listen for rotation
                            orientationQuery.addEventListener("change", updateLayout);
                // 2.2
                    // Listen for page navigation (radio button clicks)
                        document.querySelectorAll('input[name="nav-radio-btn"]').forEach(radio => {
                            radio.addEventListener('change', updateLayout);
                        });
            // 3. RUN ONCE ON LOAD (The "Missing Link")
                updateLayout();
        // 🦻 Orientation and Page-06 "Source of Truth" END =======================

    }
// ======================= do after 1️⃣ DOM loaded ➕ 2️⃣ Window loaded END ========================

// 🦻1️⃣
document.addEventListener("DOMContentLoaded",async () => {
    //1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ START
        if(window.consoleLog===true){console.log('Document DOMContentLoaded successsful.',new Date().toLocaleString());}

        // 🦻2️⃣
        window.addEventListener("load",async () => {
            // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ START
                if(window.consoleLog===true){console.log('Window load successsful.',new Date().toLocaleString());}

                await new Promise(resolve => setTimeout(resolve, 150)); // Simulated async process
                await doAfterDOMandWindowLoaded();

                // Add event listeners START 🦻🦻🦻 ===================

                    // 🦻 automate nav on 📲 mobile 📲 devices 📲 START
                        const navRadioLabels = document.querySelectorAll('.nav-radio-label'); // Your menu links
                        // const closer = document.querySelector('.nav-toggle-closer'); // The overlay label
                        const navCheckboxToggle = document.getElementById('nav-toggle');
                        navRadioLabels.forEach(label => {
                            label.addEventListener('click', (event) => {
                                // Only 'click' the closer if the menu is actually open
                                    if (navCheckboxToggle.checked) {
                                        // if(window.consoleLog===true){console.log('Mobile nav menu will now close.',event.target.classList);}
                                        const classes = event.target.classList;
                                        if(classes.contains('nav-radio-label') && classes.contains('services')){
                                        } else {
                                            // if(window.consoleLog===true){console.log('Confirmed: nav-radio-label was clicked.');}
                                            // closer.click();
                                            navCheckboxToggle.checked = false; // Close the menu
                                        }
                                    }
                            });
                        });
                    // 🦻 automate nav on 📲 mobile 📲 devices 📲 END

                // Add event listeners END   🦻🦻🦻 ===================

        });
        // 2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣2️⃣ END
});
// 1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣1️⃣ END