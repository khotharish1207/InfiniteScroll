const throttle = (fn, threshhold = 250, scope) => {
  let last, deferTimer;
  return function () {
    const context = scope || this;
    const now = +new Date,
    args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export default throttle;
