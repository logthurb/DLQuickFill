<!DOCTYPE html>
<html>
<head>
  <title>Install My Script</title>
  <style>
  body {
   font-family: Arial, sans-serif;
   text-align: center;
   margin: 50px auto;
   max-width: 800px;
   line-height: 1.6;
  }
  .button {
   display: inline-block;
   background-color: #4CAF50;
   color: white;
   padding: 15px 32px;
   text-align: center;
   text-decoration: none;
   font-size: 16px;
   margin: 10px 5px;
   cursor: pointer;
   border-radius: 4px;
   border: none;
  }
  .secondary-button {
   background-color: #2196F3;
  }
  .hidden {
   display: none;
  }
  .steps {
   text-align: left;
   margin: 20px auto;
   max-width: 600px;
  }
  .browser-icon {
   height: 30px;
   vertical-align: middle;
   margin-right: 10px;
  }
  </style>
</head>
<body>
  <h1>Install My Script</h1>
  
  <!-- Initial view -->
  <div id="initial-view">
   <p>This tool will help you install our script with just a few clicks.</p>
   <button class="button" onclick="detectBrowserAndProceed()">Start Installation</button>
  </div>
  
  <!-- Step 1: Install Tampermonkey -->
  <div id="install-tampermonkey" class="hidden">
   <h2>Step 1: Install Tampermonkey</h2>
   <p>You need to install the Tampermonkey extension first:</p>
  
   <div id="firefox-instructions">
   <a href="https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search" target="_blank" class="button">
    <img src="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/logo.eb1324e44442.svg" class="browser-icon" alt="Firefox">
    Install Tampermonkey for Firefox
   </a>
   </div>
  
   <div id="browser-warning" class="hidden">
   <p style="color: red; font-weight: bold;">This installation tool is designed for Firefox only.</p>
   <p>Please open this page in Firefox to continue.</p>
   </div>
  
   <p style="margin-top: 30px;">After installing Tampermonkey, click below:</p>
   <button class="button" onclick="showScriptInstall()">I've Installed Tampermonkey</button>
  </div>
  
  <!-- Step 2: Install Script -->
  <div id="install-script" class="hidden">
   <h2>Step 2: Install the Script</h2>
   <p>Click the button below to install our script:</p>
   <a href="javascript:void(0)" class="button" onclick="installScript()">Install Script</a>
   <p>If the installation doesn't start automatically, try the <a href="javascript:void(0)" onclick="showTroubleshooting()">troubleshooting steps</a></p>
  </div>
  
  <!-- Troubleshooting -->
  <div id="troubleshooting" class="hidden">
   <h2>Troubleshooting</h2>
   <div class="steps">
   <ol>
    <li>Make sure Tampermonkey is properly installed:
     <ul>
     <li>Look for the Tampermonkey icon in your browser toolbar</li>
     <li>If you don't see it, try reinstalling Tampermonkey</li>
     </ul>
    </li>
    <li>Try manual installation:
     <ul>
     <li>Click on the Tampermonkey icon in your browser</li>
     <li>Select "Create a new script"</li>
     <li>Copy the script code below</li>
     <li>Paste it into Tampermonkey's editor</li>
     <li>Press Ctrl+S to save</li>
     </ul>
    </li>
   </ol>
   <p><button class="button secondary-button" onclick="copyScriptToClipboard()">Copy Script to Clipboard</button></p>
   <p id="copy-confirmation" style="color: green; display: none;">Script copied to clipboard!</p>
   <p>Still having issues? <a href="mailto:youremail@example.com">Contact support</a></p>
   </div>
  
   <button class="button" onclick="showScriptInstall()">Back to Installation</button>
  </div>
  
  <!-- Hidden textarea for script content -->
  <textarea id="script-content" style="display: none;">// ==UserScript==
// @name         Click Button Sequence
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Clicks a sequence of buttons with specific text
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {

    'use strict';

    const buttonSequence1 = ["Yes", "No", "None of the Above", "Other/Cannot Determine", "NextButton", "UnsellableReason", "NextButton2", "OptionalPopup"];
    const buttonSequence2 = ["Yes", "No", "None of the Above", "Combo2Button4", "Combo2NextButton", "Combo2FinalButton", "Combo2Button7", "Combo2UnsellableReason", "Combo2FinalNext", "OptionalPopup"];
    const buttonSequence3 = ["Yes", "No", "None of the Above", "Other/Cannot Determine", "NextButton", "UnsellableReason", "NextButton2", "Combo3OptionalPopup"];
    let currentIndex = 0;
    let currentSequence = buttonSequence1;
    let continuousMonitoring = false;
    let monitoringInterval = null;

    function clickAlchemyButtonByText(text) {
        const buttons = document.querySelectorAll("alchemy-button");
        for(const btn of buttons){
            if (btn.textContent.trim() === text && btn.shadowRoot) {
                const innerBtn = btn.shadowRoot.querySelector("button");
                if (innerBtn) {
                    innerBtn.click();
                    return true;
                }
            }
        }
        return false;
    }

    function handleYesButton(attempt = 1) {
        console.log(`[DEBUG] handleYesButton - Attempt ${attempt}`);
        if (clickAlchemyButtonByText("Yes")) {
            console.log('[SUCCESS] Clicked "Yes" using shadow DOM');
            currentIndex++;
            setTimeout(clickNextButton, 250);
            return;
        }

        if (attempt < 2) {
            console.log(`[RETRY] Yes button attempt ${attempt} failed, retrying...`);
            setTimeout(() => handleYesButton(attempt + 1), 250);
        } else {
            console.log('[CONTINUE] Yes button not found after 2 attempts, continuing to next step');
            currentIndex++;
            setTimeout(clickNextButton, 250);
        }
    }

    function handleNoButton() {
        console.log('[DEBUG] handleNoButton - Searching for No button');
        const directNoBtn = document.querySelector("#root > div > div > div > div.decision-tree-instance.DPT.page-status-loading > div > div > div:nth-child(2) > table > tbody > tr > td:nth-child(2) > div:nth-child(4) > button:nth-child(3)");
        if (directNoBtn) {
            directNoBtn.click();
            console.log('[SUCCESS] Clicked "No" button via direct path');
            currentIndex++;
            setTimeout(clickNextButton, 250);
            return;
        }

        const buttons = Array.from(document.querySelectorAll('button, input[type="button"], input[type="submit"], a.button, .btn, [role="button"], label'));
        for (const button of buttons) {
            if (button.textContent.trim() === "No" || button.value === "No") {
                console.log('[SUCCESS] Found and clicked "No" button with text');
                button.click();
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }

        console.log('[RETRY] No button not found, will retry');
        setTimeout(clickNextButton, 250);
    }

    function handleOtherCannotDetermine(attempt = 1) {
        console.log(`[DEBUG] handleOtherCannotDetermine - Attempt ${attempt}`);
        const mainElement = document.querySelector("#rb_select-item-general-packaging-category");
        if (mainElement && mainElement.shadowRoot) {
            const element = mainElement.shadowRoot.querySelector("#rb_select-item-general-packaging-category > div > div:nth-child(15) > label > span.label");
            if (element) {
                element.click();
                console.log('[SUCCESS] Clicked "Other/Cannot Determine" via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }

        if (attempt < 3) {
            console.log(`[RETRY] Other/Cannot Determine attempt ${attempt} failed, retrying...`);
            setTimeout(() => handleOtherCannotDetermine(attempt + 1), 250);
        } else {
            console.log('[RETRY] Other/Cannot Determine element not found after 3 attempts, will retry');
            setTimeout(clickNextButton, 250);
        }
    }

    function handleCombo2Button4(attempt = 1) {
        console.log(`[DEBUG] handleCombo2Button4 - Attempt ${attempt}`);
        const mainElement = document.querySelector("#rb_select-item-general-packaging-category");
        if (mainElement && mainElement.shadowRoot) {
            const element = mainElement.shadowRoot.querySelector("#rb_select-item-general-packaging-category > div > div:nth-child(5) > label > span.label");
            if (element) {
                element.click();
                console.log('[SUCCESS] Clicked Combo2 Button 4 via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }

        if (attempt < 3) {
            console.log(`[RETRY] Combo2 Button 4 attempt ${attempt} failed, retrying...`);
            setTimeout(() => handleCombo2Button4(attempt + 1), 250);
        } else {
            console.log('[RETRY] Combo2 Button 4 element not found after 3 attempts, will retry');
            setTimeout(clickNextButton, 250);
        }
    }

    function handleCombo2NextButton() {
        console.log('[DEBUG] handleCombo2NextButton - Searching for combo2 next button');
        const nextBtn = document.querySelector("#root > div > div > div > div.decision-tree-instance.DPT.page-status-loading > div > div > div:nth-child(2) > div > span > alchemy-button");
        if (nextBtn && nextBtn.shadowRoot) {
            const innerBtn = nextBtn.shadowRoot.querySelector("button");
            if (innerBtn) {
                innerBtn.click();
                console.log('[SUCCESS] Clicked combo2 next button via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }
        console.log('[RETRY] Combo2 next button not found, retrying...');
        setTimeout(handleCombo2NextButton, 250);
    }

    function handleCombo2FinalButton(attempt = 1) {
        console.log(`[DEBUG] handleCombo2FinalButton - Attempt ${attempt}`);
        const finalBtn = document.querySelector("#root > div > div > div > div.decision-tree-instance.DPT.page-status-loading > div > div > div:nth-child(2) > table > tbody > tr > td:nth-child(2) > div.alchemy-mx-auto > alchemy-button:nth-child(1)");
        if (finalBtn && finalBtn.shadowRoot) {
            const innerBtn = finalBtn.shadowRoot.querySelector("button");
            if (innerBtn) {
                innerBtn.click();
                console.log('[SUCCESS] Clicked combo2 final button via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }

        if (attempt < 3) {
            console.log(`[RETRY] Combo2 final button attempt ${attempt} failed, retrying...`);
            setTimeout(() => handleCombo2FinalButton(attempt + 1), 250);
        } else {
            console.log('[CONTINUE] Combo2 final button not found after 3 attempts, continuing');
            currentIndex++;
            setTimeout(clickNextButton, 250);
        }
    }

    function handleCombo2Button7(attempt = 1) {
        console.log(`[DEBUG] handleCombo2Button7 - Attempt ${attempt}`);
        const button7 = document.querySelector("#root > div > div > div > div.decision-tree-instance.DPT.page-status-loading > div > div > div:nth-child(2) > table > tbody > tr > td:nth-child(2) > div.alchemy-mx-auto > alchemy-button:nth-child(1)");
        if (button7 && button7.shadowRoot) {
            const innerBtn = button7.shadowRoot.querySelector("button");
            if (innerBtn) {
                innerBtn.click();
                console.log('[SUCCESS] Clicked combo2 button 7 via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }

        if (attempt < 3) {
            console.log(`[RETRY] Combo2 button 7 attempt ${attempt} failed, retrying...`);
            setTimeout(() => handleCombo2Button7(attempt + 1), 250);
        } else {
            console.log('[CONTINUE] Combo2 button 7 not found after 3 attempts, continuing');
            currentIndex++;
            setTimeout(clickNextButton, 250);
        }
    }

    function handleCombo2UnsellableReason(attempt = 1) {
        console.log(`[DEBUG] handleCombo2UnsellableReason - Attempt ${attempt}`);
        const mainElement = document.querySelector("#rb_unsellable-reason");
        if (mainElement && mainElement.shadowRoot) {
            const element = mainElement.shadowRoot.querySelector("#rb_unsellable-reason > div > div:nth-child(14) > label > span.label");
            if (element) {
                element.click();
                console.log('[SUCCESS] Clicked combo2 unsellable reason via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }

        if (attempt < 3) {
            console.log(`[RETRY] Combo2 unsellable reason attempt ${attempt} failed, retrying...`);
            setTimeout(() => handleCombo2UnsellableReason(attempt + 1), 250);
        } else {
            console.log('[RETRY] Combo2 unsellable reason element not found after 3 attempts, will retry');
            setTimeout(clickNextButton, 250);
        }
    }

    function handleCombo2FinalNext() {
        console.log('[DEBUG] handleCombo2FinalNext - Searching for final next button');
        const nextBtn = document.querySelector("#root > div > div > div > div.decision-tree-instance.DPT.page-status-loading > div > div > div:nth-child(2) > div > span > alchemy-button");
        if (nextBtn && nextBtn.shadowRoot) {
            const innerBtn = nextBtn.shadowRoot.querySelector("button");
            if (innerBtn) {
                innerBtn.click();
                console.log('[SUCCESS] Clicked combo2 final next button via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }
        console.log('[RETRY] Combo2 final next button not found, retrying...');
        setTimeout(handleCombo2FinalNext, 250);
    }

    function handleCombo3Button4(attempt = 1) {
        console.log(`[DEBUG] handleCombo3Button4 - Attempt ${attempt}`);
        const mainElement = document.querySelector("#rb_unsellable-reason");
        if (mainElement && mainElement.shadowRoot) {
            const element = mainElement.shadowRoot.querySelector("#rb_unsellable-reason > div > div:nth-child(13) > label > span.label");
            if (element) {
                element.click();
                console.log('[SUCCESS] Clicked Combo3 Button 4 via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }

        if (attempt < 3) {
            console.log(`[RETRY] Combo3 Button 4 attempt ${attempt} failed, retrying...`);
            setTimeout(() => handleCombo3Button4(attempt + 1), 250);
        } else {
            console.log('[RETRY] Combo3 Button 4 element not found after 3 attempts, will retry');
            setTimeout(clickNextButton, 250);
        }
    }

    function handleNextButton() {
        console.log('[DEBUG] handleNextButton - Searching for next button');
        const nextBtn = document.querySelector("#root > div > div > div > div.decision-tree-instance.DPT.page-status-loading > div > div > div:nth-child(2) > div > span > alchemy-button");
        if (nextBtn && nextBtn.shadowRoot) {
            const innerBtn = nextBtn.shadowRoot.querySelector("button");
            if (innerBtn) {
                innerBtn.click();
                console.log('[SUCCESS] Clicked next button via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }
        console.log('[RETRY] Next button not found, retrying...');
        setTimeout(handleNextButton, 250);
    }

    function handleNextButton2() {
        console.log('[DEBUG] handleNextButton2 - Searching for second next button');
        const nextBtn = document.querySelector("#root > div > div > div > div.decision-tree-instance.DPT.page-status-loading > div > div > div:nth-child(2) > div > span > alchemy-button");
        if (nextBtn && nextBtn.shadowRoot) {
            const innerBtn = nextBtn.shadowRoot.querySelector("button");
            if (innerBtn) {
                innerBtn.click();
                console.log('[SUCCESS] Clicked NextButton2 via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }
        console.log('[RETRY] NextButton2 not found, retrying...');
        setTimeout(handleNextButton2, 250);
    }

    function handleUnsellableReason() {
        console.log('[DEBUG] handleUnsellableReason - Searching for unsellable reason');
        const mainElement = document.querySelector("#rb_unsellable-reason");
        if (mainElement && mainElement.shadowRoot) {
            const element = mainElement.shadowRoot.querySelector("#rb_unsellable-reason > div > div:nth-child(14) > label > span.label");
            if (element) {
                element.click();
                console.log('[SUCCESS] Clicked unsellable reason via direct path');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }
        console.log('[RETRY] Unsellable reason element not found');
        setTimeout(clickNextButton, 250);
    }

    function handleOptionalPopup(attempt = 1) {
        console.log(`[DEBUG] handleOptionalPopup - Attempt ${attempt}`);
        const popupBtn = document.querySelector("#root > div > div > div > div.decision-tree-instance.DPT.page-status-loading > div > div > div:nth-child(2) > table > tbody > tr > td:nth-child(2) > div.alchemy-mx-auto > alchemy-button:nth-child(1)");
        if (popupBtn && popupBtn.shadowRoot) {
            const innerBtn = popupBtn.shadowRoot.querySelector("button");
            if (innerBtn) {
                innerBtn.click();
                console.log('[SUCCESS] Clicked optional popup button');
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }

        if (attempt < 3) {
            console.log(`[RETRY] Optional popup attempt ${attempt} failed, retrying...`);
            setTimeout(() => handleOptionalPopup(attempt + 1), 250);
        } else {
            console.log('[CONTINUE] Optional popup button not found after 3 attempts, continuing');
            currentIndex++;
            setTimeout(clickNextButton, 250);
        }
    }

    function handleCombo3OptionalPopup(attempt = 1) {
        console.log(`[DEBUG] handleCombo3OptionalPopup - Attempt ${attempt}`);
        const popupBtn = document.querySelector("#root > div > div > div > div.decision-tree-instance.DPT.page-status-loading > div > div > div:nth-child(2) > table > tbody > tr > td:nth-child(2) > div.alchemy-mx-auto > alchemy-button:nth-child(2)");
        if (popupBtn && popupBtn.shadowRoot) {
            const innerBtn = popupBtn.shadowRoot.querySelector("button");
            if (innerBtn) {
                innerBtn.click();
                console.log('[SUCCESS] Clicked combo3 optional popup button via correct path');
                currentIndex++;
                setTimeout(clickNextButton, 500);
                return;
            }
        }

        if (attempt < 5) {
            console.log(`[RETRY] Combo3 optional popup attempt ${attempt} failed, retrying...`);
            setTimeout(() => handleCombo3OptionalPopup(attempt + 1), 500);
        } else {
            console.log('[CONTINUE] Combo3 optional popup button not found after 5 attempts, continuing');
            currentIndex++;
            setTimeout(clickNextButton, 500);
        }
    }

    function clickNextButton() {
        console.log(`[DEBUG] clickNextButton - Current index: ${currentIndex}`);
        if (currentIndex >= currentSequence.length) {
            console.log('[COMPLETE] Sequence completed!');

            // Find and click text input using XPath after sequence completion
            setTimeout(() => {
                const xpath = '/html/body/div[1]/div/div/div/div[2]/div/div/div[2]/table/tbody/tr/td[2]/div[2]/input';
                const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

                if (element) {
                    element.click();
                    element.focus();
                    element.select();
                    console.log('[SUCCESS] Text input focused and selected via XPath');
                } else {
                    console.log('[WARNING] Element not found with XPath: ' + xpath);
                }
            }, 1000);



            currentIndex = 0;
            return;
        }

        const textToFind = currentSequence[currentIndex];
        console.log(`[STEP] Looking for: ${textToFind} (Step ${currentIndex + 1}/${currentSequence.length})`);

        if (textToFind === "Other/Cannot Determine") {
            handleOtherCannotDetermine();
            return;
        } else if (textToFind === "Combo2Button4") {
            handleCombo2Button4();
            return;
        } else if (textToFind === "Combo2NextButton") {
            handleCombo2NextButton();
            return;
        } else if (textToFind === "Combo2FinalButton") {
            handleCombo2FinalButton();
            return;
        } else if (textToFind === "Combo2Button7") {
            handleCombo2Button7();
            return;
        } else if (textToFind === "Combo2UnsellableReason") {
            handleCombo2UnsellableReason();
            return;
        } else if (textToFind === "Combo2FinalNext") {
            handleCombo2FinalNext();
            return;
        } else if (textToFind === "Combo3Button4") {
            handleCombo3Button4();
            return;
        } else if (textToFind === "NextButton") {
            handleNextButton();
            return;
        } else if (textToFind === "UnsellableReason") {
            handleUnsellableReason();
            return;
        } else if (textToFind === "NextButton2") {
            handleNextButton2();
            return;
        } else if (textToFind === "OptionalPopup") {
            handleOptionalPopup();
            return;
        } else if (textToFind === "Combo3OptionalPopup") {
            handleCombo3OptionalPopup();
            return;
        } else if (textToFind === "No") {
            handleNoButton();
            return;
        } else if (textToFind === "Yes") {
            handleYesButton();
            return;
        } else {
            if (clickAlchemyButtonByText(textToFind)) {
                console.log(`Clicked "${textToFind}" using shadow DOM`);
                currentIndex++;
                setTimeout(clickNextButton, 250);
                return;
            }
        }

        console.log(`[RETRY] Text "${textToFind}" not found, will retry`);
        setTimeout(clickNextButton, 250);
    }

    // Listen for hotkey combinations
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.keyCode === 83) {
            console.log('[COMBO1] Hotkey Alt+S detected! Starting button sequence 1');
            e.preventDefault();
            currentSequence = buttonSequence1;
            currentIndex = 0;
            clickNextButton();
        } else if (e.altKey && e.keyCode === 76) {
            console.log('[COMBO2] Hotkey Alt+L detected! Starting button sequence 2');
            e.preventDefault();
            currentSequence = buttonSequence2;
            currentIndex = 0;
            clickNextButton();
        } else if (e.altKey && e.keyCode === 68) {
            console.log('[COMBO3] Hotkey Alt+D detected! Starting button sequence 3');
            e.preventDefault();
            currentSequence = buttonSequence3;
            currentIndex = 0;
            clickNextButton();
        }
    });

    function findAndClickFinishButton() {
        try {
            const path = '/html/body/div[1]/div/div/div/div[2]/div/div/div[2]/div/span/alchemy-button';
            const alchemyElements = document.evaluate(
                path,
                document,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            );

            let buttonClicked = false;

            for (let i = 0; i < alchemyElements.snapshotLength; i++) {
                const alchemyElement = alchemyElements.snapshotItem(i);

                if (alchemyElement && alchemyElement.shadowRoot) {
                    const buttons = alchemyElement.shadowRoot.querySelectorAll('button');

                    for (const button of buttons) {
                        if (button.textContent.trim().includes("Finish")) {
                            button.click();
                            console.log('Shadow DOM "Finish" button clicked');
                            buttonClicked = true;
                            break;
                        }

                        const spans = button.querySelectorAll('span');
                        for (const span of spans) {
                            if (span.textContent.trim().includes("Finish")) {
                                button.click();
                                console.log('Shadow DOM button with "Finish" in span clicked');
                                buttonClicked = true;
                                break;
                            }
                        }

                        const slots = button.querySelectorAll('slot');
                        for (const slot of slots) {
                            if (slot.textContent.trim().includes("Finish")) {
                                button.click();
                                console.log('Shadow DOM button with "Finish" in slot clicked');
                                buttonClicked = true;
                                break;
                            }

                            const assignedNodes = slot.assignedNodes();
                            for (const node of assignedNodes) {
                                if (node.textContent && node.textContent.trim().includes("Finish")) {
                                    button.click();
                                    console.log('Shadow DOM button with "Finish" in assigned slot node clicked');
                                    buttonClicked = true;
                                    break;
                                }
                            }

                            if (buttonClicked) break;
                        }

                        if (buttonClicked) break;
                    }

                    if (buttonClicked) break;
                }
            }
        } catch (error) {
            console.error('Error finding or clicking button:', error);
        }
    }

    // Start continuous monitoring immediately
    setInterval(findAndClickFinishButton, 1000);

})();</textarea>
 
  <script>
  function detectBrowserAndProceed() {
   document.getElementById('initial-view').classList.add('hidden');
   document.getElementById('install-tampermonkey').classList.remove('hidden');
  
   const userAgent = navigator.userAgent;
  
   if (userAgent.indexOf("Firefox") === -1) {
    // Not Firefox
    document.getElementById('firefox-instructions').classList.add('hidden');
    document.getElementById('browser-warning').classList.remove('hidden');
   }
  }
  
  function showScriptInstall() {
   document.getElementById('install-tampermonkey').classList.add('hidden');
   document.getElementById('troubleshooting').classList.add('hidden');
   document.getElementById('install-script').classList.remove('hidden');
  }
  
  function showTroubleshooting() {
   document.getElementById('install-script').classList.add('hidden');
   document.getElementById('troubleshooting').classList.remove('hidden');
  }
  
  function copyScriptToClipboard() {
   const scriptContent = document.getElementById('script-content').value;
   navigator.clipboard.writeText(scriptContent)
    .then(() => {
      const confirmationMsg = document.getElementById('copy-confirmation');
      confirmationMsg.style.display = 'block';
      setTimeout(() => {
        confirmationMsg.style.display = 'none';
      }, 3000);
    })
    .catch(err => {
      console.error('Failed to copy script: ', err);
      alert('Failed to copy script to clipboard. Please select and copy the script manually.');
    });
  }

  function installScript() {
   // Get the script content from the hidden textarea
   const scriptContent = document.getElementById('script-content').value;
   
   // Create a Tampermonkey install URL
   const tampermonkeyUrl = 'tampermonkey://script/' + encodeURIComponent(scriptContent);
   
   try {
     // Open the URL to trigger Tampermonkey installation
     window.location.href = tampermonkeyUrl;
     
     // Show troubleshooting after a short delay if the user is still on the page
     setTimeout(() => {
       showTroubleshooting();
     }, 3000);
   } catch (error) {
     console.error('Error installing script:', error);
     alert('Error installing the script. Please try the troubleshooting steps.');
     showTroubleshooting();
   }
  }
  
  // Check if Tampermonkey is already installed
  window.addEventListener('load', function() {
   // This is a simple check that might work in some cases
   if (typeof window.Tampermonkey !== 'undefined' || 
    document.querySelector('script[src*="tampermonkey"]') !== null) {
    // Skip to script installation
    detectBrowserAndProceed();
    showScriptInstall();
   }
  });
  </script>
</body>
</html>