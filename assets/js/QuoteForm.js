function QuoteForm(url) {
  var self = this;
  self.isValid = false;
  self.apiUrl = url;
  self.element = $('#quoteform');
  self.fields = {
    subject: self.element.find('#subject'),
    from: self.element.find('#from'),
    body: self.element.find('#body')
  };
  self.alerts = {
    success: self.element.find('.alert-success'),
    danger: self.element.find('.alert-danger'),
    messages: {
      invalid_form: 'Please correctly add a valid email and some details about your request. Thank you!',
      send_success: 'Your request was successfully sent. We will respond within 48 hours. Thank you!',
      send_error: 'There was an issue sending your request. We apologise for any inconvenience.'
    }
  };
  self.validations = {
    email: new RegExp('^[^@]+@[^@]+$'),
    body: new RegExp('.{5}')
  };
};

QuoteForm.prototype.send = function() {
  var self = this;
  self.validate();
  if(self.isValid) {
    $.ajax({
      type: 'POST',
      url: self.apiUrl,
      dataType: 'json',
      data: JSON.stringify({
        subject: self.fields.subject.val(),
        from: self.fields.from.val(),
        body: self.fields.body.val()
      })
    })
    .done(function() {
      self.alerts.success.find('span').html(self.alerts.messages.send_success);
      self.alerts.success.css('display', 'block');
      self.alerts.danger.css('display', 'none');
    })
    .error(function() {
      self.alerts.danger.find('span').html(self.alerts.messages.send_error);
      self.alerts.success.css('display', 'none');
      self.alerts.danger.css('display', 'block');
    });
  } else {
    self.alerts.danger.find('span').html(self.alerts.messages.invalid_form);
    self.alerts.success.css('display', 'none');
    self.alerts.danger.css('display', 'block');
  }
};

QuoteForm.prototype.formatAsValid = function(field) {
  field.parent().removeClass('has-error');
};

QuoteForm.prototype.formatAsInvalid = function(field) {
  field.parent().addClass('has-error');
};

QuoteForm.prototype.validateEmail = function() {
  var self = this;
  if(self.validations.email.exec(self.fields.from.val())) {
    self.formatAsValid(self.fields.from);
    return true;
  }
  self.formatAsInvalid(self.fields.from);
  return false;
};

QuoteForm.prototype.validateBody = function() {
  var self = this;
  if(self.validations.body.exec(self.fields.body.val())) {
    self.formatAsValid(self.fields.body);
    return true;
  }
  self.formatAsInvalid(self.fields.body);
  return false;
};

QuoteForm.prototype.validate = function() {
  var self = this;
  self.isValid = self.validateEmail() & self.validateBody();
};
