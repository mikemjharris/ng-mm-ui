angular.module('mm.ui')
.directive('mmBusyButton', function mmBusyButton( $parse ) {

  return {

    //
    // Attrs:
    //   mmBusyButtonModel      {Boolean}    Whether or not the button is in the busy state
    //   mmBusyButtonMessage    {String}     The text to show on the button when busy
    //

    link: function (scope, elem, attrs) {

      var busyGetter = $parse(attrs.mmBusyButtonModel);

      // The default message is the text within the DOM node at compile-time
      var defaultMessage = elem.text();

      // This class is used for the basic styling
      elem.addClass('busy-button');

      // Watch the 'busy' model and toggle the disabled state of the button and
      // the class that shows the spinner when it changes
      scope.$watch(function () {
        return busyGetter(scope);
      }, function (nv) {

        var customMessage = attrs.mmBusyButtonMessage;

        if (nv !== undefined) {

          // Add/remove the 'busy' class and disable/enable the button
          elem
          .toggleClass('busy-button-busy', nv)
          .prop('disabled', nv);

          if (customMessage) {
            if (nv) {

              // If we are currently busy then we change the message
              elem.text(customMessage);

            } else {

              // If we're not busy then we reset the text to the default message
              elem.text(defaultMessage);
            }
          }
        }
      });
    }
  };
});
