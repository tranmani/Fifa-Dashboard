export default {
  // Convert second to date
  epochToDate(epoch) {
    let date;
    if (epoch) date = new Date(epoch);
    else if (typeof epoch == Object) date = epoch;
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  },
  // Convert second to time date
  epochToDateTime(epoch) {
    const date = new Date(epoch);

    return (
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      " " +
      date.getDate() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getFullYear()
    );
  },
  // Convert second to time
  epochToTime(epoch) {
    const date = new Date(epoch);

    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  },
  // Count the total win and lose from an array of clubs
  totalWinLose(array) {
    array.forEach(club => {
      let totalWins = 0;
      let totalLoses = 0;

      club.players.forEach(player => {
        if (player.winlose.length == 0) return;

        totalWins += player.winlose[player.winlose.length - 1].wins;
        totalLoses += player.winlose[player.winlose.length - 1].loses;
      });

      club.totalWins = totalWins;
      club.totalLoses = totalLoses;
    });

    return array;
  },
  // Truncate long paragraph
  truncate(text, length) {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    } else {
      return text;
    }
  },
  // Count average of property value in an array
  countAverageWithOpp(arr, aa, bb, point) {
    const a = arr.map(e => e[aa]);
    const b = arr.map(e => e[bb]);

    const sum = a.reduce((a, b) => {
      return a + b;
    });
    const sumOpp = b.reduce((a, b) => {
      return a + b;
    });

    const average = sum / a.length;
    const averageOpp = sumOpp / b.length;

    return [average.toFixed(point), averageOpp.toFixed(point)];
  },
  // Count average of property value in an array
  countAverage(arr, aa, point) {
    if (arr.length == 0) return 0;
    const a = arr.map(e => e[aa]);

    const sum = a.reduce((a, b) => {
      return a + b;
    });

    const average = sum / a.length;

    return average.toFixed(point);
  },
  // Convert number to a scale of 0 to 10
  convertScale(value, oldMax) {
    return (value * 10) / oldMax;
  }
};
