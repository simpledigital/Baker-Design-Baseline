/**
 * Form Scripts
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

Project.inputFocus = function() {

    var emailFormInput = $('.email-form .form-group input');

    emailFormInput.on('focusin', function() {
        $(this).siblings('label').addClass('hide');
    });

    emailFormInput.on('focusout', function() {
        if (!$(this).val()) {
            $(this).siblings('label').removeClass('hide');
        }
    });

    emailFormInput.each(function() {
        if ($(this).val()) {
            $(this).siblings('label').addClass('hide');
        }
    });
};
