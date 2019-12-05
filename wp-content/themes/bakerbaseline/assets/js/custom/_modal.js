/**
 * Modal Events
 *
 * @package WordPress
 * @subpackage Baker Design Theme 1.0
 * @since 2.0
 **/

Project.makeModals = function() {

    $('.modal-open').on('click', function() {
        $('#' + $(this).attr('data-modal')).addClass('active');
    });

    $('.modal-close').on('click', function() {
        $(this).closest('.event-modal').removeClass('active');
    });

    function copyToclipboard(copyText) {
        copyText.select();
        document.execCommand('copy');
        $('.share-link').append('<p>copied to clipboard</p>');
    }

    $('.share-link').on('submit', function(e) {
        e.preventDefault();
        copyToclipboard($('input#share-link'));
    });

};
