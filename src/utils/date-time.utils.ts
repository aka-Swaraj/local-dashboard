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
  var entities: any = {};
  var units: IUnit[] = [
    { label: 'millis', mod: 1000 },
    { label: 'seconds', mod: 60 },
    { label: 'minutes', mod: 60 },
    { label: 'hours', mod: 24 },
    { label: 'days', mod: 31 },
  ];
  // calculate the individual unit values...
  units.forEach(function (u: IUnit) {
    //millis = (millis - (entities[u.label] = millis % u.mod)) / u.mod;
  });
  // convert object to a string representation...
  var nonZero = function (u: IUnit) {
    return entities[u.label];
  };
  entities.toString = function () {
    return units
      .reverse()
      .filter(nonZero)
      .map(function (u: IUnit) {
        return (
          entities[u.label] +
          ' ' +
          (entities[u.label] == 1 ? u.label.slice(0, -1) : u.label)
        );
      })
      .join(', ');
  };
  return entities;
}
