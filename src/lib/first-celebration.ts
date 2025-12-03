const firstCelebrationDate = new Date("2015-04-25T12:00:00Z");
const yearsMarried = Math.floor((new Date().getTime() - firstCelebrationDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));

export { firstCelebrationDate, yearsMarried };
