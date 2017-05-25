const $contactForm = $('#formspree');
const $errors = $('#formerrors');
const $fields = $contactForm.find('input', 'textarea');

const disableForm = function() {
  $fields.attr('readonly', true);
  return $contactForm
    .find('input[type="submit"]')
    .attr('disabled', true)
    .val('Sending...');
};

const enableForm = function() {
  $fields.removeAttr('readonly');
  return $contactForm
    .find('input[type="submit"]')
    .attr('disabled', false)
    .val("Send →");
};

$contactForm.submit(function(e) {
  e.preventDefault();

  return $.ajax({
    url: $(this).attr('action'),
    cache: false,
    crossDomain: false,
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',

    beforeSend() {
      return disableForm();
    },

    success(data) {
      enableForm();
      return $contactForm.replaceWith('<div class="notice notice--success"><b>Message sent!</b> I\'ll be in touch soon.</div>');
    },

    error(err) {
      enableForm();
      return $errors.html('<div class="notice notice--danger">Oops, there was an error. Please try again.</div>');
    }
  });
});
