function subfunction(e) {
    e.preventDefault();
    valid = true;
    fl = feedbackform.nameinput;
    if (fl.value.length < 3) {
        x = document.getElementById('nameinputerror');
        x.className = 'alert alert-danger';
        x.innerHTML = 'حداقل باید 3 کاراکتر باشد';
        valid = false;
    }
    if (fl.value.length == 0) {
        x = document.getElementById('nameinputerror');
        x.className = 'alert alert-danger';
        x.innerHTML = 'لطفا این فیلد را پر کنید';
        valid = false;
    }


    ps = feedbackform.passwordinput;
    psvalue = Number(ps.value);
    if (isNaN(psvalue)) {
        x = document.getElementById('passinputerror');
        x.className = 'alert alert-danger';
        x.innerHTML = 'مقدار ورودی باید عدد باشد';
        valid = false;
    }
    else if (valid == false) {
        e.preventDefault();
    }
    if (ps.value.length == 0) {
        x = document.getElementById('passinputerror');
        x.className = 'alert alert-danger';
        x.innerHTML = 'لطفا این فیلد را پر کنید';
        valid = false;
    }


    emailvalue = feedbackform.emailinput;
    if (emailvalue.value) {
        x = document.getElementById('emailinputerror');
        x.className = 'alert alert-danger';
        x.innerHTML = 'ایمیل نامعتبر است';
        valid = false;
    }

    if (emailvalue.value.length == 0) {
        x = document.getElementById('emailinputerror');
        x.className = 'alert alert-danger';
        x.innerHTML = 'لطفا این فیلد را پر کنید';
        valid = false;
    }

    txtarea = feedbackform.messagetextaarea;
    if (txtarea.value.length < 15) {
        x = document.getElementById('messagetextaareaerror');
        x.className = 'alert alert-danger';
        x.innerHTML = 'حداقل 15 کاراکتر وارد کنید';
        valid = false;
    }
    if (fl.value.length == 0) {
        x = document.getElementById('messagetextaareaerror');
        x.className = 'alert alert-danger';
        x.innerHTML = 'لطفا این فیلد را پر کنید';
        valid = false;
    }

















}