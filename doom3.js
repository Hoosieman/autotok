import { remote } from 'webdriverio';
import { assert } from 'chai';
import { comments } from './comments.js'; // Import the comments array
import { followMe } from './follow-for-follow.js'; // Import the follow array

const capabilities = {
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'amuthan-test-device',
    'appium:appPackage': 'com.zhiliaoapp.musically',
    'appium:appActivity': 'com.ss.android.ugc.aweme.main.MainActivity',
    'appium:platformName': 'Android',
    'appium:noReset': true,
    "appium:udid": "R5CXC0LY81P",
    'appium:newCommandTimeout': 120,
    'appium:waitForIdleTimeout': 0, // Disable waiting for idle
    'appium:skipUnlock': true, // Speeds up element finding
    'appium:disableAndroidWatchers': true
};

const wdOpts = {
    hostname: '127.0.0.1',
    port: 4728,
    logLevel: 'info',
    waitforTimeout: 30000,
    capabilities,
};

class ScrollHelper {
    constructor(driver) {
        this.driver = driver;
    }

    // Random swipe down (scroll down)
    async randomSwipeUp() {
        const size = await this.driver.getWindowRect();
    
        // Starting point is at the horizontal center of the screen and 80% down the height, but with slight offset to avoid share button
        const startScrollX = size.width / 2;
        const startScrollY = size.height * 0.75;  // Start slightly higher to avoid bottom buttons (adjusted for safety)
    
        // Random end point between 40% to 60% of the screen height (shorter distance)
        const randomEndScrollY = Math.min(size.height * (0.3 + Math.random() * 0.1), size.height * 0.40); // Reduced randomization for shorter swipe
    
        // Perform the swipe action (swiping upwards)
        await this.driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: startScrollX, y: startScrollY },  // Move to the start point near the bottom immediately (no pause here)
                { type: 'pointerDown', button: 0 },  // Press down without holding
                { type: 'pointerMove', duration: 500, x: startScrollX, y: randomEndScrollY },  // Move upwards to the random end point (faster swipe)
                { type: 'pointerUp', button: 0 }  // Lift up the finger
            ]
        }]);
    }




    async nextPostSwipe() {
        const size = await this.driver.getWindowRect();
        
        // Starting point is at the horizontal center of the screen and 85% down the height, but with slight offset to avoid the share button
        const startScrollX = size.width / 2;
        const startScrollY = size.height * 0.85;  // Start slightly higher to avoid bottom buttons (adjusted for safety)
        
        // Random end point between 10% to 20% of the screen height (longer distance)
        const randomEndScrollY = Math.min(size.height * (0.1 + Math.random() * 0.1), size.height * 0.2);  // Swipe further (upwards to 20% of screen height)
        
        // Perform the swipe action (swiping upwards)
        await this.driver.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: startScrollX, y: startScrollY },  // Move to the start point near the bottom immediately (no pause here)
                { type: 'pointerDown', button: 0 },  // Press down without holding
                { type: 'pointerMove', duration: 400, x: startScrollX, y: randomEndScrollY },  // Move upwards to the new end point (faster swipe with a shorter duration)
                { type: 'pointerUp', button: 0 }  // Lift up the finger
            ]
        }]);
    }
    
    
    
    
}

class HeartClickHelper {
    constructor(driver) {
        this.driver = driver;
    }

    // Click a random number (1-3) of heart icons from the first 3
    
    async clickRandomHearts()
    {
      // Find all heart icons on the screen
      const heartIconsSelector = '//android.widget.ImageView[@resource-id="com.zhiliaoapp.musically:id/i1p"]'
      const heartIcons = await this.driver.$$(heartIconsSelector)
    
      console.log(`Found ${heartIcons.length} heart icons on the screen`)
    
      // Create a copy of the array to shuffle
      const shuffledHeartIcons = [...heartIcons]
    
      // Shuffle the array to click them in a random order
      for (let i = shuffledHeartIcons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledHeartIcons[i], shuffledHeartIcons[j]] = [shuffledHeartIcons[j], shuffledHeartIcons[i]]
      }
    
      // Click on each heart icon with random delays
      for (let i = 0; i < shuffledHeartIcons.length; i++) {
        const heartIcon = shuffledHeartIcons[i]
    
        // Wait for the heart icon to be displayed
        await heartIcon.waitForDisplayed({ timeout: 2000 })
    
        // Click the heart icon
        await heartIcon.click()
        console.log(`Clicked heart icon ${i + 1} of ${shuffledHeartIcons.length}`)
    
        // Only add delay if it's not the last heart
        if (i < shuffledHeartIcons.length - 1) {
          // Generate a random delay between 0.3 and 0.6 seconds
            const randomWaitTime = Math.random() * 0.3 + 0.3;  // Random time between 0.3 and 0.6 seconds
            console.log(`Waiting for ${randomWaitTime.toFixed(3)} seconds.`);
            await this.driver.pause(randomWaitTime * 1000);  // Convert to milliseconds
          
        }
      }
    }



    async logMemoryUsage() {
        const used = process.memoryUsage();
        console.log(`Memory usage: RSS: ${Math.round(used.rss / 1024 / 1024)}MB, Heap: ${Math.round(used.heapUsed / 1024 / 1024)}/${Math.round(used.heapTotal / 1024 / 1024)}MB`);
    }
    
    
}






class ShareClickHelper {
    constructor(driver) {
        this.driver = driver;
    }

    // Click the share button, wait a random time (1-2 seconds), and then click the copy link button
    async clickShareAndCopyLink() {
        // Find the share button and click it
        const shareButtonXPath = '//android.widget.Button[contains(@content-desc, "Share video.") and contains(@content-desc, "shares")]';
        const shareButton = await this.driver.$(shareButtonXPath);
        await shareButton.waitForDisplayed({ timeout: 5000 });
        await shareButton.click();
        console.log("Clicked the share button.");


        const randomWaitTime = Math.random() + 1;  // Random time between 1 and 2 seconds, including decimals
        console.log(`Waiting for ${randomWaitTime.toFixed(3)} seconds.`);
        await this.driver.pause(randomWaitTime * 1000);  // Convert to milliseconds
        


        // Find the copy link button and click it
        const copyLinkButtonXPath = `//android.widget.Button[@content-desc="Copy link"]`; // Change this XPath to match your app
        const copyLinkButton = await this.driver.$(copyLinkButtonXPath);
        await copyLinkButton.waitForDisplayed({ timeout: 5000 });
        await copyLinkButton.click();
        console.log("Clicked the copy link button.");
    }
}


class SaveClickHelper {
    constructor(driver) {
        this.driver = driver;
    }

    // Click the share button, wait a random time (1-2 seconds), and then click the copy link button
    async clickSaveButton() {
        // Find the share button and click it
        const saveButtonXPath = `//android.widget.Button[@content-desc="Add or remove this video from Favorites."]`; // Change this XPath to match your app
        const saveButton = await this.driver.$(saveButtonXPath);
        await saveButton.waitForDisplayed({ timeout: 5000 });
        await saveButton.click();
        console.log("Clicked the save button.");

        const randomWaitTime = Math.random() + 1;  // Random time between 1 and 2 seconds, including decimals
        console.log(`Waiting for ${randomWaitTime.toFixed(3)} seconds.`);
        await this.driver.pause(randomWaitTime * 1000);  // Convert to milliseconds


    }

    async clickLikeButton() {
        // Find the share button and click it
        const likeButtonXPath = `//android.widget.ImageView[@content-desc="Like"]`; // Change this XPath to match your app
        const likeButton = await this.driver.$(likeButtonXPath);
        await likeButton.waitForDisplayed({ timeout: 5000 });
        await likeButton.click();
        console.log("Clicked the like button.");

    }
}












class RandomTimeHelper {
    constructor(driver) {
        this.driver = driver;
    }

    // Click the share button, wait a random time (1-2 seconds), and then click the copy link button
    async longRandomTime() {
       
        const randomWaitTime = Math.random() * 3 + 5;  // Random time between 5 and 8 seconds
        console.log(`Waiting for ${randomWaitTime.toFixed(3)} seconds.`);
        await this.driver.pause(randomWaitTime * 1000);  // Convert to milliseconds


    }

    async mediumRandomTime() {
        
        const randomWaitTime = Math.random() + 1;  // Random time between 1 and 2 seconds, including decimals
        console.log(`Waiting for ${randomWaitTime.toFixed(3)} seconds.`);
        await this.driver.pause(randomWaitTime * 1000);  // Convert to milliseconds

    }

    async shortRandomTime() {
        
        const randomWaitTime = Math.random() * 0.3 + 0.3;  // Random time between 0.3 and 0.6 seconds
        console.log(`Waiting for ${randomWaitTime.toFixed(3)} seconds.`);
        await this.driver.pause(randomWaitTime * 1000);  // Convert to milliseconds

    }
}


class CommentClickHelper {
    constructor(driver) {
        this.driver = driver;
    }


    async isThereNoComments() {

        
        // Find the share button and click it
        const noCommentsXPath = `//android.widget.Button[( @content-desc="Read or add comments. 0 comments" or @content-desc="Read or add comments. 1 comments" or @content-desc="Read or add comments. 2 comments" )]`;
        const noCommentsButton = await this.driver.$(noCommentsXPath);
        await noCommentsButton.waitForDisplayed({ timeout: 2000 });

        console.log('There are NO comments');
       

    }

    // Click the share button, wait a random time (1-2 seconds), and then click the copy link button
    async clickCommentButton() {
        // Step 2: Find the element that opens the comment section (using XPath)
        const element = await this.driver.$('//android.widget.FrameLayout[@resource-id="com.zhiliaoapp.musically:id/cqt"]');
            
        // Step 3: Wait for the element to be displayed (the button that opens the comments)
        await element.waitForDisplayed({ timeout: 5000 });
    
        // Step 4: Click on the element to open the comment section
        await element.click();

    }

    async typeComment() {
        // Uses array from comments.js
        
    
        // Step 1: Pick a random comment from the array
        const randomIndex = Math.floor(Math.random() * comments.length);
        const randomComment = comments[randomIndex];
    
        // Step 2: Find the comment bar
        const commentBar = await this.driver.$('//android.widget.FrameLayout[@resource-id="com.zhiliaoapp.musically:id/f18"]');
        
        // Ensure the comment bar is displayed and clickable
        await commentBar.waitForDisplayed({ timeout: 5000 });
        await commentBar.click();
    
        // Step 3: Use sendKeys to type the random comment into the comment bar
        // Make sure sendKeys is passed with the correct type (string)
        await commentBar.sendKeys([randomComment]);


        const randomWaitTime = Math.random() * 1 + 2;  // Random time between 2 and 3 seconds
        console.log(`Waiting for ${randomWaitTime.toFixed(3)} seconds.`);
        await this.driver.pause(randomWaitTime * 1000);  // Convert to milliseconds




        const submitButton = await this.driver.$('//android.widget.Button[@content-desc="Post comment"]');
        await submitButton.click();
    }



    
    

}







describe('Shows Test click each tile in each category', function() {
    
    this.timeout(86400000); // 24 hours in milliseconds

    let driver;
    let scrollHelper;
    let heartClickHelper;
    let shareClickHelper;
    let saveClickHelper;
    let commentClickHelper;
    let randomTimeHelper;
    let followClickHelper;

    before(async function() {
        driver = await remote(wdOpts);
        scrollHelper = new ScrollHelper(driver);
        heartClickHelper = new HeartClickHelper(driver);
        shareClickHelper = new ShareClickHelper(driver);
        saveClickHelper = new SaveClickHelper(driver);
        commentClickHelper = new CommentClickHelper(driver);
        randomTimeHelper = new RandomTimeHelper(driver);
    });

    after(async function() {
        await driver.deleteSession();
    });

    it('doom scroll', async function() {
        let repeatTest = true;

        // Repeat the process until you decide to stop (based on a condition or flag)
        while (repeatTest) {


            if (global.gc) global.gc();

            

            await randomTimeHelper.longRandomTime();

            await heartClickHelper.logMemoryUsage();


            try { 
                await randomTimeHelper.mediumRandomTime();
                await shareClickHelper.clickShareAndCopyLink();
            } catch (error) {
                await randomTimeHelper.mediumRandomTime();
                await scrollHelper.nextPostSwipe();
                continue;
            }

            try { 
                await randomTimeHelper.mediumRandomTime();
                await saveClickHelper.clickSaveButton();
            } catch (error) {
                await randomTimeHelper.mediumRandomTime();
                await scrollHelper.nextPostSwipe();
                continue;
            }


            try {
                await randomTimeHelper.mediumRandomTime();
                await saveClickHelper.clickLikeButton();
            } catch (error) {
                await randomTimeHelper.mediumRandomTime();
                await scrollHelper.nextPostSwipe();
                continue;
            }

            
            await randomTimeHelper.shortRandomTime();
            await scrollHelper.randomSwipeUp();

        }
    });
});



