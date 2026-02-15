window.consoleLog = true;
const navSite = window.location.hostname || "bgfinancial.net.au"
if(window.consoleLog===true){console.log(`navSite`,navSite);}
const serverURL = "https://netit.com.au";
let pageLoadTime = 0;
let timeOnPage = 0;

const now = new Date()
const localString = new Intl.DateTimeFormat(
    undefined, // user’s locale automatically
    {
        dateStyle: "full",
        timeStyle: "long"
    }
).format(now)
console.log(localString)

    function formatDateTime(value){ // 📅🕰 format date/time value 📅🕰
        const date = new Date(value);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };
        return new Intl.DateTimeFormat(undefined, options).format(date);
    }

// 🚦⛔🚦⛔🚦⛔🚦⛔🚦⛔ site meta data START🚦⛔🚦⛔🚦⛔🚦⛔🚦⛔
    // Function to generate the fingerprint (hash) of the input
        async function hashString(str) {
            const encoder = new TextEncoder();
            const data = encoder.encode(str);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

    document.addEventListener('keydown', async function(e) {
        // Check for Ctrl + M
        if (e.ctrlKey && e.key === 'm') {
            if (sessionStorage.getItem('auditUnlocked') === 'true') {
                showMetaPopup();
                return;
            }
            const accessKey = prompt("BGF Systems - Secure Audit Access Required:");
            if (accessKey === null) return; // User cancelled
            const hashedInput = await hashString(accessKey);            
            const correctHash = "eab6d9aba93b0fbf365fc0940de73a7507af6e819dfd22775afc528da2a9f825";
            if (hashedInput === correctHash) { 
                sessionStorage.setItem('auditUnlocked', 'true');
                showMetaPopup();
            } else {
                alert("Security Alert: Invalid Access Key.");
            }
        }
        if (e.key === 'Escape') {
            closeMetaPopup();
        }
    });

    function showMetaPopup() {
        const popup = document.getElementById('meta-popup');
        popup.classList.add('active');
        const list = document.getElementById('meta-list');
        list.innerHTML = ''; 
        const addSectionTitle = (text) => {
            const title = document.createElement('h3');
            title.style.color = "#00ff41";
            title.style.marginTop = "25px";
            title.style.borderBottom = "1px solid #333";
            title.innerText = text;
            list.appendChild(title);
        };
        // 2. Page Metadata (SEO)
            addSectionTitle("SEO & Social Metadata");
            const metaTags = document.querySelectorAll('meta[property], meta[name]:not([name="referrer"]):not([name="viewport"])');
            metaTags.forEach(tag => {
                const key = tag.getAttribute('property') || tag.getAttribute('name');
                const val = tag.getAttribute('content');
                if (key && val) {
                    const item = document.createElement('div');
                    item.className = 'meta-item';
                    item.innerHTML = `<span class="meta-key">${key}:</span> <span class="meta-val">${val}</span>`;
                    list.appendChild(item);
                }
            });
        // 3. Structured Data (The "Entity" section)
            addSectionTitle("Search Authority (JSON-LD Entities)");
            const jsonLdTags = document.querySelectorAll('script[type="application/ld+json"]');
            jsonLdTags.forEach((tag, index) => {
                try {
                    const data = JSON.parse(tag.innerText);
                    const item = document.createElement('div');
                    item.className = 'meta-item';
                    const formattedJson = JSON.stringify(data, null, 2);
                    item.innerHTML = `<span class="meta-key">Entity #${index + 1} [${data['@type']}]:</span>
                                    <pre style="background: #000; padding: 10px; color: #fff; overflow-x: auto; border-left: 2px solid skyblue; font-size: 0.8rem;">${formattedJson}</pre>`;
                    list.appendChild(item);
                } catch (e) { console.error("JSON-LD Error:", e); }
            });
        // 1. HARDENED SECURITY POLICIES (New & Improved)
            addSectionTitle("Security Hardening (Browser Shields)");            
            const securityMap = [
                { 
                    attr: 'http-equiv="Content-Security-Policy"', 
                    expected: `
                    default-src 'self';
                    script-src 'self' 'sha256-vvt4KWwuNr51XfE5m+hzeNEGhiOfZzG97ccfqGsPwvE=';
                    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                    font-src 'self' https://fonts.gstatic.com;
                    frame-src https://www.google.com https://maps.google.com https://www.gstatic.com;
                    img-src 'self' https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.googleusercontent.com data:;
                    connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://www.google.com;
                    object-src 'none';
                    base-uri 'self';
                    form-action 'self';
                    script-src-attr 'none';
                    upgrade-insecure-requests;
                    frame-ancestors 'self';
                    `,
                    label: 'Content Security Policy (CSP)', 
                    desc: "The CSP  tells a visitor’s browser exactly what the website is allowed to load and run. It prevents unwanted or malicious code from running on the site and stops the site from being embedded by or tampered with by other websites. CSP is one of the most effective protections against modern website attacks, especially those involving injected scripts or fake overlays. In this context, ‘self’ means the website address currently shown in your browser’s address bar.",
                    color: '#fff' },
                { 
                    attr: 'name="referrer"', 
                    expected: 'no-referrer',
                    label: 'Referrer Privacy Policy ( Outbound Privacy Control )', 
                    // desc: 'Referrer Privacy Policy controls how much information is shared when a visitor clicks a link to another website. It helps protect your privacy by limiting the details shared with those external sites. This improves privacy and reduces data leakage, particularly when linking to external platforms like social media or directories. In this context "same-origin" means that only links to pages within the same website will share full referrer details; links to other websites will share minimal information.',
                    // desc: 'Ensures that no referring page information is shared when users leave the site. For example, when a visitor clicks a link to the ATO website, the ATO receives no information about which page on this site the visitor came from.',
                    // desc: 'Prevents the browser from sending any information about which page a visitor came from when they click a link to another website. In other words, external sites—including ones like the ATO—will see that a visitor arrived, but they receive no details about the page or internal structure of this website. This protects user privacy and ensures sensitive navigation information is not shared.',
                    desc: 'Ensures that when a visitor clicks a link to another website, the browser does not share any information about the page or site they came from. In other words, external sites—including ones like the ATO cannot see which page on this website the visitor was on, or even that they came from this site. To the destination site, the visit appears as if the visitor typed the URL directly or arrived from an unknown source, protecting user privacy and preventing any internal page details from being shared.',
                    color: '#fff' },
                { 
                    attr: 'http-equiv="Permissions-Policy"',
                    expected: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
                    label: 'Hardware & Privacy Lockdown',
                    desc: 'Explicitly blocks access to sensitive device features that the site does not require. This restricts access to browser capabilities such as camera, microphone, and location to enhance user privacy and security. Even if malicious code were ever introduced, the browser will refuse access to these features. These restrictions cannot be overridden through normal browser settings.<br>Regarding: interest-cohort and browsing-topics, these two items are privacy settings. They represent Google’s modern attempts to replace "third-party cookies" with new ways of showing ads without tracking individuals across the entire web. By setting them to (), you are explicitly opting out of these tracking features for the site.',
                    color: '#fff' },
                { 
                    attr: 'http-equiv="Cross-Origin-Opener-Policy"', 
                    expected: "same-origin",
                    label: 'Cross-Origin Isolation (COOP)', 
                    desc: 'Isolates your website from other websites at the browser level. It prevents other websites from interacting with or controlling your site if a user opens links in new tabs or windows. This protects against certain tab-based and cross-site attacks and is commonly used in higher-security environments.',
                    color: '#fff' }
            ];
            securityMap.forEach(item => {
                const tag = document.querySelector(`meta[${item.attr}]`);
                if (tag) {
                    const div = document.createElement('div');
                    div.className = 'meta-item';
                    const actual = tag.getAttribute('content');
                    const expected = item.expected;
                    const cleanActual = actual.replace(/[\s;]/g, '');
                    const cleanExpected = expected.replace(/[\s;]/g, '');
                    div.innerHTML = `
                        <span class="meta-key" style="color: #00ff41;">✔ ${item.label}:</span>
                        <pre style="white-space: pre-wrap; color: #fff; font-size: 0.8rem; background: #000; padding: 8px; border-left: 2px solid #00ff41; margin-bottom: 4px;">${tag.getAttribute('content')}</pre>
                        <div style="color: #aaa; font- : 0.75rem; font-style: italic; margin-bottom: 5px; padding-left: 10px;">
                            Description:-<br>${item.desc}
                        </div>
                    `;
                    // <div>Actual Value: <span style="color: ${item.color}; font-size: 0.8rem;">${actual}</span></div>
                    // <div>Expected Value: <span style="color: ${item.color}; font-size: 0.8rem;">${expected}</span></div>
                    if (cleanActual !== cleanExpected) {
                        div.innerHTML += `<div style="text-align: center; color: #ff0000; font-weight: normal;">⚠ MISMATCH: The description above does not match the setting!"</div>`;
                    } else {
                        div.innerHTML += `<div style="text-align: center; color: #00ff41; font-weight: normal;">✔ The description above matches the setting.</div>`;
                    }
                    list.appendChild(div);
                }
            });
        // Date and Time of Audit Report creation
            const dateTime = document.createElement('h6');
            dateTime.innerText = localString;
            dateTime.classList.add("meta-item");
            list.appendChild(dateTime);
    }

    function closeMetaPopup() {
        const popup = document.getElementById('meta-popup');
        popup.classList.remove('active');
    }
// 🚦⛔🚦⛔🚦⛔🚦⛔🚦⛔ site meta data END 🚦⛔🚦⛔🚦⛔🚦⛔🚦⛔

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

        // 🚨🚨🚨🚨🚨🚨🚨🚨🚨 START 🚨🚨🚨🚨🚨🚨🚨🚨🚨
            const SERVER_URL = "https://netit.com.au";
            // 🚨 navigator.sendBeacon() 🚨 START
                function sendBeaconEvent(navTarget){
                    timeOnPage = Date.now() - pageLoadTime;
                    if(window.consoleLog===true){console.log("🚨",navTarget);}
                    const targetTxt = navTarget.startsWith("/") ? navTarget.substring(1) : navTarget;
                    if(window.consoleLog===true){console.log("🚨",navTarget.slice(0,1));}
                    if(window.consoleLog===true){console.log("🚨",targetTxt);}
                    // // Fires off a "fire and forget" request to your backend
                    //     const myDate = new Date()
                    //     const myData = JSON.stringify({
                    //         viewportWidth: window.innerWidth,
                    //         viewportHeight: window.innerHeight,
                    //         screenWidth: window.screen.width,
                    //         screenHeight: window.screen.height,
                    //         browserTimestampUTC: myDate.toISOString(),
                    //         browserTimestampLocal: myDate.toLocaleString(),
                    //         browserTimeSinceUnixEpoch: myDate.getTime(),
                    //     });
                    //     if(window.consoleLog===true){"🚨",console.log(myData);}
                    //     // const myBlob = new Blob([myData], { type: 'application/json' });
                        const ref = encodeURIComponent(document.referrer || 'direct'); // document.referrer is a full URL. If a user comes from a URL with special characters (like ? or &), it will break your sendBeacon string. You should wrap any string-based variables in encodeURIComponent().
                        const navPath = encodeURIComponent(targetTxt || '');
                        // // navigator.sendBeacon(`${SERVER_URL}/api/stats/${navSite}/${targetTxt}/${window.innerWidth}/${window.innerHeight}?devPixRat=${window.devicePixelRatio}&referrer=${document.referrer}&timeOnPage=${timeOnPage}`);
                        // navigator.sendBeacon(`${serverURL}/api/stats/${navSite}/${path}/${window.innerWidth}/${window.innerHeight}/${window.screen.width}/${window.screen.height}?devPixRat=${window.devicePixelRatio}&referrer=${ref}&timeOnPage=${timeOnPage}`);
                    const payload = {
                        navSite,
                        navPath,
                        innerWidth: window.innerWidth,
                        innerHeight: window.innerHeight,
                        screenWidth: window.screen.width,
                        screenHeight: window.screen.height,
                        devicePixelRatio: window.devicePixelRatio,
                        referrer: ref,
                        timeOnPage
                    };
                    if(window.consoleLog===true){console.log("🚨 sendBeacon payload:-\n",payload);}
                    const blob = new Blob(
                        [JSON.stringify(payload)],
                        { type: "application/json" }
                    );
                    const success = navigator.sendBeacon(
                        `${serverURL}/api/stats`,
                        blob
                    );
                    if (!success) {
                        if(window.consoleLog===true){console.log("🚨 Beacon failed to queue.");}
                    }else{
                        if(window.consoleLog===true){console.log("🚨 Beacon sent to queue successfully.");}
                    }
                }
            // 🚨 navigator.sendBeacon() 🚨 END
                if(!document.hidden===true){
                    pageLoadTime = Date.now();
                    sendBeaconEvent("/site-load");
                }
                window.addEventListener("pagehide", (event) => {
                    if (!event.persisted) {
                        sendBeaconEvent("/site-pagehide");
                    }
                });
                window.addEventListener("visibilitychange", (event) => { // visibilitychange fires before pagehide
                    if(document.hidden===false){
                        pageLoadTime = Date.now();
                        sendBeaconEvent("/site-visibilitychange-visible");
                    }
                });
                window.addEventListener('pageshow', (event) => {
                    if (event.persisted) {
                        // Always re-initialise UI state
                            // Rebind menu click handlers
                            // Reset menu open/closed state
                            // Restart timers if needed
                        const navToggle = document.getElementById("nav-toggle");
                        if(navToggle.checked){
                            console.log("pageshow, navToggle set to false");
                            navToggle.checked = false;
                        }
                    }
                });
        // 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 END 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨

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

            document.addEventListener("click", handleDocumentClick);
            function handleDocumentClick(e) {
                if(window.consoleLog===true){console.log(e);}
                // filter to irrelevant clicks
                    if (e.defaultPrevented) return; // checks if another listener has already been called
                    // e.preventDefault();
                    if (e.button !== 0) return; // left click only
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    if(window.consoleLog===true){console.log(e.target.tagName);}
                    if (e.target.tagName.toLowerCase()==="input"){
                        return; // ignore radio and check buttons
                    }
                // process the click
                    if(window.consoleLog===true){console.log(e.target);}
                    // const link = e.target.closest("a[href]");
                    const link = e.target.closest("label");
                    if(window.consoleLog===true){console.log(link.innerText);}
                    const target = link.innerText
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9\-]/g, "");
                    sendBeaconEvent(target);
                    // if (!link) return;
                    // routeLinkClick(link, e);
            }
            // ⬅️➡️ popstate event ⬅️➡️ START
                window.addEventListener("popstate", (event) => {
                    if(window.consoleLog===true){console.log("popstate event:- ⬅️➡️",event.state);}
                    // If the state has an 'action', it means it was one of our SPA transitions
                    if (event.state && event.state.action) {
                        if(window.consoleLog===true){console.log("popstate action:- ⬅️➡️",event.state.action);}
                        // Re-fetch the content for the previous URL
                        // We pass false to 'pushState' logic inside the handler to avoid an infinite loop
                            fetchActionHandler(null, event.state.action, "GET", false); 
                    } else {
                        // If no state (like going back to the very first load), just refresh
                            if(window.consoleLog===true){console.log("popstate action:- ⬅️➡️ GO TO START",event.state);}
                            window.location.reload();
                    }
                });
            // ⬅️➡️ popstate event ⬅️➡️ START


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

                const meta = document.querySelector('meta[name="app-info"]')
                const { version, buildId, buildDateOfficial } = meta.dataset;
                console.log(`Version: ${version}, \nBuild: ${buildId}, \nBuild date: ${buildDateOfficial}, \nLast modified: ${formatDateTime(document.lastModified)}`);

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