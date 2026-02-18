let counter = 0;

setInterval(() => {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  console.log(time);
}, 1000);
