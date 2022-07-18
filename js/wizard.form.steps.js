(function ($) {
  var form = $('#signup-form');
  form.validate({
    errorPlacement: function errorPlacement(error, element) {
      element.before(error);
    },
    rules: {
      email: {
        email: true,
      },
    },
    onfocusout: function (element) {
      $(element).valid();
    },
  });
  form.children('div').steps({
    headerTag: 'h3',
    bodyTag: 'fieldset',
    transitionEffect: 'fade',
    stepsOrientation: 'horizontal',
    titleTemplate:
      '<div class="title"><span class="step-number">#index#</span><span class="step-text">#title#</span></div>',
    labels: {
      previous: 'Previous',
      next: 'Next',
      finish: 'Finish',
      current: '',
    },
    onStepChanging: function (event, currentIndex, newIndex) {
      if (currentIndex === 0) {
        form
          .parent()
          .parent()
          .parent()
          .append('<div class="footer footer-' + currentIndex + '"></div>');
      }
      if (currentIndex === 1) {
        form
          .parent()
          .parent()
          .parent()
          .find('.footer')
          .removeClass('footer-0')
          .addClass('footer-' + currentIndex + '');
      }
      if (currentIndex === 2) {
        form
          .parent()
          .parent()
          .parent()
          .find('.footer')
          .removeClass('footer-1')
          .addClass('footer-' + currentIndex + '');
      }
      if (currentIndex === 3) {
        form
          .parent()
          .parent()
          .parent()
          .find('.footer')
          .removeClass('footer-2')
          .addClass('footer-' + currentIndex + '');
      }
      // if(currentIndex === 4) {
      //     form.parent().parent().parent().append('<div class="footer" style="height:752px;"></div>');
      // }
      form.validate().settings.ignore = ':disabled,:hidden';
      return form.valid();
    },
    onFinishing: function (event, currentIndex) {
      form.validate().settings.ignore = ':disabled';
      return form.valid();
    },
    onFinished: function (event, currentIndex) {
      var lastname = document.getElementById('last_name').value;
      var othername = document.getElementById('other_name').value;
      var products = document.getElementsByClassName('form-check-input');
      var phoneNumber = document.getElementById('phone').value;
      var emailAddress = document.getElementById('email').value;
      var organisation = document.getElementById('organisation').value;
      var designation = document.getElementById('designation').value;
      var idNumber = document.getElementById('registration').value;
      var otherProducts = document.getElementById('other').value;
      var comments = document.getElementById('Textarea1').value;
      var krapin = document.getElementById('kra').value;

      var myProducts = '';
      for (let i = 0; i < products.length; i++) {
        if (products[i].checked == true) {
          myProducts += products[i].getAttribute('data-value') + ', ';
        }
      }
      myProducts += otherProducts;

      var data = new URLSearchParams();
      data.append('elqSiteID', '793546030');
      data.append('elqFormName', 'equitylife-form');
      data.append('lastName', lastname);
      data.append('firstName', othername);
      data.append('products', myProducts);
      data.append('phoneNumber', phoneNumber);
      data.append('emailAddress', emailAddress);
      data.append('message', comments);
      data.append('krapin', krapin);
      data.append('scope/scheme', myProducts);
      data.append('businessName', organisation);
      data.append('designation', designation);
      data.append('idNumber', idNumber);

      $.ajax({
        type: 'POST',
        url: 'https://s793546030.t.eloqua.com/e/f2',
        data: data,
        processData: false,
        // contentType: false,
        contenttype: 'application/x-www-form-urlencoded',
        cache: false,
        timeout: 800000,
        success: function (data) {
          var message =
            '<div class="alert alert-success" role="alert">\n' +
            '  <h4 class="alert-heading">Success</h4>\n' +
            '  <p>Dear ' +
            lastname +
            ', we acknowledge receipt of your details. Kindly expect a response within the next 24 working hours.</p>\n' +
            '  <hr>\n' +
            '  <p class="mb-0">Thank you for contacting Equity Life Assurance.</p>\n' +
            '</div>';
          document.getElementById('output').innerHTML = message;
          $('#output').slideDown(2000);
          $('#output').show();
          // scrollToElement("#success");

          // $("#getInTouchSubmit").prop("disabled", false);
          // $('#getInTouchSubmit').html('Submit')
          //form.reset();

          // setTimeout(function () {
          //     $("#output").slideUp(2000);
          // }, 5000);
        },
        error: function (e) {
          var message =
            '<div class="alert alert-danger" role="alert">\n' +
            '  <h4 class="alert-heading">Error</h4>\n' +
            '  <p>An Error occurred when submitting your get a call back request</p>\n' +
            '</div>';
          $('#output').append(message);

          $('#getInTouchSubmit').prop('disabled', false);
          $('#getInTouchSubmit').html('Sent');
        },
      });

      //alert('Submited' + myProducts);
    },
    onStepChanged: function (event, currentIndex, priorIndex) {
      return true;
    },
  });

  jQuery.extend(jQuery.validator.messages, {
    required: '',
    remote: '',
    email: '',
    url: '',
    date: '',
    dateISO: '',
    number: '',
    digits: '',
    creditcard: '',
    equalTo: '',
  });

  $.dobPicker({
    daySelector: '#birth_date',
    monthSelector: '#birth_month',
    yearSelector: '#birth_year',
    dayDefault: '',
    monthDefault: '',
    yearDefault: '',
    minimumAge: 0,
    maximumAge: 120,
  });
  var marginSlider = document.getElementById('slider-margin');
  if (marginSlider != undefined) {
    noUiSlider.create(marginSlider, {
      start: [1100],
      step: 100,
      connect: [true, false],
      tooltips: [true],
      range: {
        min: 100,
        max: 2000,
      },
      pips: {
        mode: 'values',
        values: [100, 2000],
        density: 4,
      },
      format: wNumb({
        decimals: 0,
        thousand: '',
        prefix: '$ ',
      }),
    });
    var marginMin = document.getElementById('value-lower'),
      marginMax = document.getElementById('value-upper');

    marginSlider.noUiSlider.on('update', function (values, handle) {
      if (handle) {
        marginMax.innerHTML = values[handle];
      } else {
        marginMin.innerHTML = values[handle];
      }
    });
  }
})(jQuery);
