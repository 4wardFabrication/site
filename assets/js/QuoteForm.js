function QuoteForm(url, alerts) {
  var self = this;
  self.apiUrl = url;
  self.element = $('#quoteform');
  self.fields = {
    subject: self.element.find('#subject'),
    from: self.element.find('#from'),
    body: self.element.find('#body')
  };
  self.alerts = alerts;
  self.messages = {
    invalid_form: '<strong>Uh oh!</strong> Please enter an email and some details about your request.',
    send_pending: '<strong>Hold up!</strong> We are attempting to send your request.',
    send_success: '<strong>Got it!</strong> We will respond within 48 hours. Thank you!',
    send_error: '<strong>Well this is embarrassing!</strong> There was an issue sending your request. We apologise for any inconvenience.'
  };
  self.validations = {
    email: new RegExp('^[^@]+@[^@]+$'),
    body: new RegExp('.{5}')
  };
};

QuoteForm.prototype.send = function() {
  var self = this;
  if(self.validate()) {
    self.alerts.showInfo(self.messages.send_pending);
    $.ajax({
      type: 'POST',
      url: self.apiUrl,
      data: JSON.stringify({
        subject: self.fields.subject.val(),
        from: self.fields.from.val(),
        body: self.fields.body.val()
      })
    })
    .success(function() {
      self.alerts.showSuccess(self.messages.send_success);
    })
    .error(function() {
      self.alerts.showError(self.messages.send_error);
    });
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
  var valid = self.validateEmail() & self.validateBody();
  if(valid) {
    self.alerts.hide();
  } else {
    self.alerts.showError(self.messages.invalid_form);
  }
  return valid;
};
