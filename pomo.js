function Clock(elem, id, duration, cb) {

  var tick;
  this.clockId = id;
  this.duration = duration * 60;
  this.countDown = 0;
  this.state = "stopped";
  this.parent = elem;
  this.ticklength = tick || 1000
  this.expireCallback = cb;

  // console.log(elem);

  elem.html(
    '<div class="dr" data-clock="' + elem.attr('id') + '">' +
    '<div class="dc">' +
    '<button id="hour-btn-up-' + id + '"  class="up" data-mult="3600" data-adj="1" data-min="0" data-max="9"><i class="fa fa-arrow-up"></i></button>' +
    '<span id="hour-' + id + '"></span>' +
    '<button id="hour-btn-down-' + id + '" class="down" data-mult="3600" data-adj="-1" data-min="0" data-max="9"><i class="fa fa-arrow-down"></i></button>' +
    '</div>' +
    '<div class="dc">' +
    '<span id="hour-colon" class="colon">:</span>' +
    '</div>' +
    '<div class="dc">' +
    '<button id="ten-min-btn-up-' + id + '" class="up" data-mult="600" data-adj="1" data-min="0" data-max="5"><i class="fa fa-arrow-up"></i></button>' +
    '<span id="ten-min-' + id + '"></span>' +
    '<button id="ten-min-btn-down-' + id + '" class="down" data-mult="600" data-adj="-1" data-min="0" data-max="5"><i class="fa fa-arrow-down"></i></button>' +
    '</div>' +
    '<div class="dc">' +
    '<button id="one-min-btn-up-' + id + '" class="up" data-mult="60" data-adj="1" data-min="0" data-max="9"><i class="fa fa-arrow-up"></i></button>' +
    '<span id="one-min-' + id + '"></span>' +
    '<button id="one-min-btn-down-' + id + '" class="down" data-mult="60" data-adj="-1" data-min="0" data-max="9"><i class="fa fa-arrow-down"></i></button>' +
    '</div>' +
    '<div class="dc">' +
    '<span class="colon">:</span>' +
    '</div>' +
    '<div class="dc">' +
    '<button id="ten-sec-btn-up-' + id + '" class="up" data-mult="10" data-adj="1" data-min="0" data-max="5"><i class="fa fa-arrow-up"></i></button>' +
    '<span id="ten-sec-' + id + '"></span>' +
    '<button id="ten-sec-btn-down-' + id + '" class="down" data-mult="10" data-adj="-1" data-min="0" data-max="5"><i class="fa fa-arrow-down"></i></button>' +
    '</div>' +
    '<div class="dc">' +
    '<button id="one-sec-btn-up-' + id + '" class="up" data-mult="1" data-adj="1" data-min="0" data-max="9"><i class="fa fa-arrow-up"></i></button>' +
    '<span id="one-sec-' + id + '" class="one-sec"></span>' +
    '<button id="one-sec-btn-down-' + id + '" class="down" data-mult="1" data-adj="-1" data-min="0" data-max="9"><i class="fa fa-arrow-down"></i></button>' +
    '</div>' +
    '</div><hr>');

  $("#hour-btn-up-" + id).click(this.arrowClick);
  $("#hour-btn-down-" + id).click(this.arrowClick);
  $("#ten-min-btn-up-" + id).click(this.arrowClick);
  $("#ten-min-btn-down-" + id).click(this.arrowClick);
  $("#one-min-btn-up-" + id).click(this.arrowClick);
  $("#one-min-btn-down-" + id).click(this.arrowClick);
  $("#ten-sec-btn-up-" + id).click(this.arrowClick);
  $("#ten-sec-btn-down-" + id).click(this.arrowClick);
  $("#one-sec-btn-up-" + id).click(this.arrowClick);
  $("#one-sec-btn-down-" + id).click(this.arrowClick);

  this.setClock(elem.attr('id'), this);

  this.display();

  return this;
};

Clock.clocks = {};

Clock.prototype = {

  setClock: function setClock(id, clock) {
    Clock.clocks[id] = clock;
  },

  display: function display() {
    var curr = this.countDown;
    var time = Math.floor(curr / 3600);
    $("#hour-" + this.clockId).text("" + time);
    curr = curr - time * 3600;
    time = Math.floor(curr / 600);
    $("#ten-min-" + this.clockId).text("" + time);
    curr = curr - time * 600;
    time = Math.floor(curr / 60);
    $("#one-min-" + this.clockId).text("" + time);
    curr = curr - time * 60;
    time = Math.floor(curr / 10);
    $("#ten-sec-" + this.clockId).text("" + time);
    time = curr - time * 10;
    $("#one-sec-" + this.clockId).text("" + time);
  },

  reset: function reset() {
    this.countDown = this.duration;
    this.state = "reset";
    this.display();

    $("#hour-btn-up-" + this.clockId).show();
    $("#hour-btn-down-" + this.clockId).show();
    $("#ten-min-btn-up-" + this.clockId).show();
    $("#ten-min-btn-down-" + this.clockId).show();
    $("#one-min-btn-up-" + this.clockId).show();
    $("#one-min-btn-down-" + this.clockId).show();
    $("#ten-sec-btn-up-" + this.clockId).show();
    $("#ten-sec-btn-down-" + this.clockId).show();
    $("#one-sec-btn-up-" + this.clockId).show();
    $("#one-sec-btn-down-" + this.clockId).show();
  },

  ready: function ready() {
    $("#hour-btn-up-" + this.clockId).hide();
    $("#hour-btn-down-" + this.clockId).hide();
    $("#ten-min-btn-up-" + this.clockId).hide();
    $("#ten-min-btn-down-" + this.clockId).hide();
    $("#one-min-btn-up-" + this.clockId).hide();
    $("#one-min-btn-down-" + this.clockId).hide();
    $("#ten-sec-btn-up-" + this.clockId).hide();
    $("#ten-sec-btn-down-" + this.clockId).hide();
    $("#one-sec-btn-up-" + this.clockId).hide();
    $("#one-sec-btn-down-" + this.clockId).hide();

  },

  resetCountdown: function resetCountdown() {
    this.countDown = this.duration;
    this.display();
  },

  start: function start() {
    if (this.state === "reset") {
      this.countDown = this.duration;
      if (this.countDown == 0) this.countDown = 1;
    }

    this.ready();

    if (this.countDown > 0) {
      this.state = "running";
      setTimeout(this.tick.bind(this), this.ticklength);
    }
  },

  pause: function stop() {
    this.state = "paused";
  },

  tick: function tick() {
    if (this.state !== "running") return;
    // console.log("count: " + this.countDown);
    this.countDown--;
    if (this.countDown > 0) {
      this.display();
      var that = this;
      setTimeout(this.tick.bind(this), this.ticklength);
    } else {
      this.countDown = 0;
      this.display();
      this.timerFinished();
    }
  },

  blink: function blink(elem, duration, count, colora, colorb) {
    elem.css("color", colora);
    if (count > 0) {
      setTimeout(this.blink.bind(this), duration, elem, duration, --count, colorb, colora);
    } else if (this.expireCallback && !(this.state === "reset")) {
      this.state = "reset"
      this.expireCallback();
    }
  },

  timerFinished: function timerFinished() {
    this.blink(this.parent, 500, 5, "red", "blue");
  },

  setDuration: function setDuration(duration) {
    this.duration = duration;
    this.reset();
  },

  getDuration: function getDuration() {
    return this.duration;
  },

  adjust: function adjust(val) {
    this.duration += val;
    this.countDown = this.duration;
  },

  arrowClick: function arrowClick(evt) {
    var thisClock = Clock.clocks[$(this).parent().parent().data("clock")];
    var currVal = +$($(this).parent().children()[1]).text();
    var adj = +$(this).data("adj");
    var min = +$(this).data("min");
    var max = +$(this).data("max");

    currVal += adj;
    if ((currVal >= min) && (currVal <= max)) {
      thisClock.adjust(adj * (+$(this).data("mult")));
      thisClock.display();
    }
  }

};

$("document").ready(function() {
  var currentClock;
  var aClock;
  var cycle = 1;

  var cClock = new Clock($("#theclock-c"), "c", 15, function() {
    cycle = 1;
    $("#work-span").text("Cycle: " + cycle);
    $("#rest-span").text("Cycle: " + cycle);
    $("#recharge-clock").slideUp("slow", function() {
      $("#work-clock").slideDown("slow", function() {
        currentClock = aClock;
        if ($('#auto-adv-chk').prop('checked')) {
          currentClock.start();
        } else {
          $("#the-button").text("Continue");
          currentClock.resetCountdown();
        }
      });
    });
  });
  cClock.reset();

  var bClock = new Clock($("#theclock-b"), "b", 5, function() {
    $("#rest-clock").slideUp("slow", function() {
      cycle++;
      $("#work-span").text("Cycle: " + cycle);
      $("#rest-span").text("Cycle: " + cycle);
      if (cycle == 4) {
        $("#recharge-clock").slideDown("slow", function() {
          currentClock = cClock;
          if ($('#auto-adv-chk').prop('checked')) {
            currentClock.start();
          } else {
            $("#the-button").text("Continue");
            currentClock.resetCountdown();
          }
        });
      } else {
        $("#work-clock").slideDown("slow", function() {
          currentClock = aClock;
          if ($('#auto-adv-chk').prop('checked')) {
            currentClock.start();
          } else {
            $("#the-button").text("Continue");
            currentClock.resetCountdown();
          }
        });
      }
    });
  });
  bClock.reset();

  aClock = new Clock($("#theclock-a"), "a", 25, function() {
    $("#work-clock").slideUp("slow", function() {
      $("#rest-clock").slideDown("slow", function() {
        currentClock = bClock;
        if ($('#auto-adv-chk').prop('checked')) {
          currentClock.start();
        } else {
          $("#the-button").text("Continue");
          currentClock.resetCountdown();
        }
      });
    });
  });
  aClock.reset();

  $("#the-button").text("Start");

  $("#reset-button").click(function() {
    $("#the-button").text("Start");
    $("#work-clock").slideDown("fast");
    $("#rest-clock").slideDown("fast");
    $("#recharge-clock").slideDown("fast");
    aClock.reset();
    bClock.reset();
    cClock.reset();
    $("#work-span").text("");
    $("#rest-span").text("");
    $("#recharge-span").text("");
  });

  $("#the-button").click(function() {
    if ($(this).text() == "Start") {
      cycle = 1;
      aClock.ready();
      bClock.ready();
      cClock.ready();
      setTimeout(function() {
        $("#recharge-clock").slideUp("slow", function() {
          $("#rest-clock").slideUp("slow", function() {
            aClock.start();
            currentClock = aClock;
            $("#the-button").text("Pause");
            $("#work-span").text("Cycle: " + cycle);
            $("#rest-span").text("Cycle: " + cycle);
            $("#recharge-span").text("Cycle: " + cycle);
          });
        });
      }, 500);
    } else if ($(this).text() == "Pause") {
      currentClock.pause();
      $(this).text("Run");
    } else if (($(this).text() == "Run") ||
      ($(this).text() == "Continue")) {
      currentClock.start();
      $(this).text("Pause");
    }
  });
})
