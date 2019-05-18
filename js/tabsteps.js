
var tabSteps = (function( global, $){

    $tabContentContainer = $('.tab-step');  
    numOfTabs = $tabContentContainer.length;
    currentTabIndex = null;
    fisrtTabIndex = 0;
    lastTabIndex = $tabContentContainer.length - 1;    

    function init(){
        //set current tab Index to 0
        currentTabIndex = fisrtTabIndex;
        //hide all tabs except the current tab
        updateVisibleTabs(fisrtTabIndex);
    }
    
    function nextStep() {
        //if last step completed do nothing... let user handle what to do
        if (isLastStepComplete()) {
            $(window).trigger( "lastStepCompleted" );
            return;
        }

        currentTabIndex +=1;
        updateVisibleTabs(currentTabIndex);
    }

    function prevStep() {

    }

    // all steps completed
    function isLastStepComplete(){
        return lastTabIndex === currentTabIndex;
    }

    //if user is on the first step
    function isOnFirstStep(){
        return lastTabIndex === currentTabIndex;
    }

    function reset(){
        currentTabIndex = 0;
        updateVisibleTabs(fisrtTabIndex);
    }

    // function onComplete( cb ) {
    //     cb()
    // }

    function updateVisibleTabs(currentTabIndex){
        $tabContentContainer.hide();
        $tabContentContainer.filter(`:nth-child(${currentTabIndex + 1})`).show();
    }

    return {
        init,
        nextStep,
        prevStep,
        reset
    }

})(window, jQuery)

tabSteps.init();


$(window).on('lastStepCompleted', function () {
    alert('last step completed')
});
