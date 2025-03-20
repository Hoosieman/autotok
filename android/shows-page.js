import { remote } from 'webdriverio';
import { assert } from 'chai';

// Configuration
const CAPABILITIES = {
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'amuthan-test-device',
  'appium:appPackage': 'org.byutv.android',
  'appium:appActivity': 'org.byuradio.ui.activity.MainActivity',
  'appium:platformName': 'Android'
};

const WD_OPTIONS = {
  hostname: '127.0.0.1',
  port: 4727,
  logLevel: 'info',
  waitforTimeout: 60000,
  capabilities: CAPABILITIES,
};

// XPath constants
const XPATHS = {
  spinner: '//android.widget.Spinner[@resource-id="org.byutv.android:id/spinner_options"]',
  backButton: '//android.widget.ImageButton[@content-desc="Navigate up"]',
  showImage: (index) => `(//android.widget.ImageView[@resource-id="org.byutv.android:id/image_logo"])[${index}]`
};

// Category tabs
const CATEGORY_TABS = [
  'Adventure & Competition',
  'Comedy',
  'Drama',
  'Faith & Inspiration',
  'Family',
  'Sports',
  'Movies',
  'All Shows A–Z'
];

class UIHelper {
  constructor(driver) {
    this.driver = driver;
  }

  async performSwipe(startYPercent, endYPercent) {
    const size = await this.driver.getWindowRect();
    const startX = size.width / 2;
    const startY = size.height * startYPercent;
    const endY = size.height * endYPercent;

    await this.driver.performActions([{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: startX, y: startY },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 500 },
        { type: 'pointerMove', duration: 1000, x: startX, y: endY },
        { type: 'pointerUp', button: 0 }
      ]
    }]);
  }

  async scrollUp() {
    await this.performSwipe(0.1, 0.9);
  }

  async scrollDown() {
    await this.performSwipe(0.4, 0.025);
  }

  async regularSwipe() {
    await this.performSwipe(0.2, 0.04);
  }

  async isElementVisible(xpath) {
    try {
      const element = await this.driver.$(xpath);
      return await element.isDisplayed();
    } catch (e) {
      return false;
    }
  }

  async scrollUntilElementVisible(xpath) {
    let isVisible = false;
    let attempts = 0;
    const maxAttempts = 5;
    
    while (!isVisible && attempts < maxAttempts) {
      isVisible = await this.isElementVisible(xpath);
      if (!isVisible) {
        await this.scrollUp();
        attempts++;
      }
    }
    
    return isVisible;
  }

  async clickElement(xpath) {
    const element = await this.driver.$(xpath);
    await element.click();
  }

  async getElementBounds(xpath) {
    const element = await this.driver.$(xpath);
    const boundsString = await element.getAttribute('bounds');
    const bounds = boundsString.match(/\d+/g).map(Number);
    
    return {
      x1: bounds[0],
      y1: bounds[1],
      x2: bounds[2],
      y2: bounds[3]
    };
  }
}

describe('Shows Tab Navigation Tests', function() {
  this.timeout(120000);
  let driver;
  let uiHelper;

  before(async function() {
    driver = await remote(WD_OPTIONS);
    uiHelper = new UIHelper(driver);
  });

  after(async function() {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('Should navigate to Shows tab', async function() {
    await driver.pause(2000);
    const showsTab = await driver.$('~shows');
    await driver.pause(2000);
    await showsTab.click();
    await driver.pause(2000);
  });

  it('Should navigate through all show categories and click on shows', async function() {
    // Navigate to each category tab
    for (const category of CATEGORY_TABS) {
      console.log(`Testing category: ${category}`);
      
      // Swipe to refresh view
      await uiHelper.regularSwipe();
      
      // Click on shows in the current category
      await testShowsInCurrentCategory(uiHelper);
      
      // Navigate to next category
      await navigateToNextCategory(uiHelper, category);
    }
  });
});

async function testShowsInCurrentCategory(uiHelper) {
  try {
    // Test shows in the visible area
    for (let i = 1; i <= 3; i++) {
      // Click on show
      await uiHelper.clickElement(XPATHS.showImage(i));
      
      // Go back
      await uiHelper.clickElement(XPATHS.backButton);
    }
    
    // Scroll down to see more shows
    let canContinue = true;
    let scrollCount = 0;
    const maxScrolls = 3;
    
    while (canContinue && scrollCount < maxScrolls) {
      try {
        // Check if we've reached the bottom by examining position of a show
        const bounds = await uiHelper.getElementBounds(XPATHS.showImage(7));
        
        if (bounds.y1 > 798) {
          canContinue = false;
        } else {
          await uiHelper.scrollDown();
          scrollCount++;
          
          // Click on more shows after scrolling
          for (let i = 1; i <= 3; i++) {
            await uiHelper.clickElement(XPATHS.showImage(i));
            await uiHelper.clickElement(XPATHS.backButton);
          }
        }
      } catch (e) {
        console.log("Reached end of shows or error occurred:", e.message);
        canContinue = false;
      }
    }
  } catch (e) {
    console.error("Error testing shows:", e);
  }
}

async function navigateToNextCategory(uiHelper, nextCategory) {
  try {
    // Scroll up until spinner is visible
    await uiHelper.scrollUntilElementVisible(XPATHS.spinner);
    
    // Click on spinner to open category dropdown
    await uiHelper.clickElement(XPATHS.spinner);
    
    // Click on next category
    const categoryXPath = `//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="${nextCategory}"]`;
    await uiHelper.clickElement(categoryXPath);
    
    // Wait for content to load
    await uiHelper.driver.pause(2000);
  } catch (e) {
    console.error("Error navigating to next category:", e);
  }
}