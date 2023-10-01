export function toDate(value: string): Date {
  if (!value) return new Date();
  const [year, month, date] = (value || '').split('-').map((e) => parseInt(e));
  return new Date(year, month - 1, date, 0, 0, 0, 0);
}
export function fromDate(date: Date): string {
  if (!date) return '';
  date = new Date(date);
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map((e) => prefix(e))
    .join('-');
}

export const prefix = (num: number): string => (num > 9 ? `${num}` : `0${num}`);

export interface IUnit {
  label: string;
  mod: number;
}

export function toReadable(millis: number) {
  millis = Math.abs(millis);
  var units: IUnit[] = [
    { label: 'millis', mod: 1000 },
    { label: 'seconds', mod: 60 * 1000 },
    { label: 'minutes', mod: 60 * 60 * 1000 },
    { label: 'hours', mod: 24 * 60 * 60 * 1000 },
    { label: 'days', mod: 31 * 24 * 60 * 60 * 1000 },
  ];

  const steps = {
    millis0: [1000],
    seconds: [60, 1000],
    minutes: [60, 60, 1000],
    hours00: [24, 60, 60, 1000],
    days000: [30, 24, 60, 60, 1000],
    months0: [365, 30, 24, 60, 60, 1000],
  };

  const floor = Math.floor;

  const entries = Object.entries(steps).reduce((acc: any, [label, step]) => {
    const [mod, ...rest] = step;
    acc[label.replace(/0+/gi, '')] = floor(
      (millis / rest.reduce((a, i) => a * i, 1)) % mod
    );
    return acc;
  }, {});

  const toString = () => {
    return Object.entries(entries)
      .reverse()
      .reduce((acc: any, [label, value]) => {
        acc.push(
          ` ${prefix(value as number)} ${
            value == 1 ? label.slice(0, -1) : label
          }`
        );
        return acc;
      }, [])
      .join('  ');
  };
  return { ...entries, toString };

  // entries = units.reduce((acc: any, item: IUnit, index: number) => {
  //   if (index > 0) {
  //     acc[item.label] = (millis / units[index - 1].mod) % item.mod;
  //   }
  //   return acc;
  // }, {});

  // // calculate the individual unit values...
  // units.forEach(function (u: IUnit) {
  //   millis = (millis - (entries[u.label] = millis % u.mod)) / u.mod;
  // });

  // convert object to a string representation...
  // var nonZero = function (u: IUnit) {
  //   return entries[u.label];
  // };
  // entries.toString = function () {
  //   return units
  //     .reverse()
  //     .filter(nonZero)
  //     .map(function (u: IUnit) {
  //       return (
  //         entries[u.label] +
  //         ' ' +
  //         (entries[u.label] == 1 ? u.label.slice(0, -1) : u.label)
  //       );
  //     })
  //     .join(', ');
  // };
  return entries;
}
