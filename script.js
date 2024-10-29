(function (app) {
  app.index = function () {
    setCopyrightDate();
  };

  function setCopyrightDate() {
    const date = new Date();

    document.getElementById('copyright-year').innerText = date.getFullYear();
  }
})((window.app = window.app || {}));
