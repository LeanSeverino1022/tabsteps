/**
 * tabsteps
 *
 * @author leandro Severino
 * @version 1
 * @url 
 *
 * MIT License
 */


(function( global, $){   

    TabSteps = function (userOptions) {

        'use strict';

        //configurable settings
        var config = {};
        
        // unconfigurable private members 
        var numOfTabs = 0
        var firstIndex = 0;
        var currentTabIndex = 0;
        var lastIndex = 0;
        
        /** 
         * Merge default options with user options
         *
         * @param {Object} userOptions - Optional user options
         * @returns {Object} - Custom options
         */
        var mergeOptions = function mergeOptions(userOptions) {
            // Default options
            var options = {
                $stepContainerSelector: $('.tab-step'),
                onAllStepsComplete: null,

            }

            if (userOptions) {
                Object.keys(userOptions).forEach(function (key) {
                    options[key] = userOptions[key]
                })
            }

            return options;
        }

        /**
         * Init
         *
        */
        var init = function(userOptions) {
             // Merge user options into defaults
            config = mergeOptions(userOptions);   

            if (!config.$stepContainerSelector.length) {
                throw new Error('Can\'t find the selector ' + config.selector + '.')
            }

            numOfTabs =  config.$stepContainerSelector.length;
            lastIndex = config.$stepContainerSelector.length - 1;

            updateVisibleStep(firstIndex);
           
        };

        var nextStep = function (callback) {
            //if current index is last index
            if (lastIndex === currentTabIndex) {
                
                // we have completed the steps
                runCallback.call(this,config.onAllStepsComplete); 
              
                return;
            }

            //if we haven't reached the end
            currentTabIndex += 1;
            updateVisibleStep(currentTabIndex);            
        }

        var prevStep = function () {

            if (currentTabIndex - 1 < 0) {
                return;
            }    

            currentTabIndex -= 1;
            updateVisibleStep(currentTabIndex);
        }
     

        //if user is on the first step
        var isOnFirstStep = function () {
            return lastIndex === currentTabIndex;
        }

        var startover = function () {
            currentTabIndex = 0;
            updateVisibleStep(firstIndex);
        }

        // function onComplete( cb ) {
        //     cb()
        // }

        var updateVisibleStep = function (currentTabIndex) {
            config.$stepContainerSelector.hide();
            config.$stepContainerSelector.eq(currentTabIndex).show();
        }

        /* debugging */
        var displayLogger = function(){

            $('.logger').html(
                `<p>
                    numOfTabs : ${numOfTabs} <br>
                    currentTabIndex : ${currentTabIndex}<br>
                    lastIndex : ${lastIndex}<br>
                </p>`
            );
        };

        var getCurrentIndex = function(){
            return currentTabIndex;
        };

        /**
   * Callback event calls
   * 
   * @param {function} func - callback function
   */
        var runCallback = function (cb) {
            if (cb && typeof cb === "function") {
                cb.call(this)
            }           
        };
        
        init(userOptions);

        return {
            init,
            nextStep,
            prevStep,
            startover,
            displayLogger,
            getCurrentIndex
        }
    }

    global.TabSteps = TabSteps;

})(window, jQuery);

// tabSteps.init({
//     onLastStepCompleted
// });


