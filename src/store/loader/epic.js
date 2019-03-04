import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, catchError, flatMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';

import { events } from './constants';
import {
  loadLegend,
  successLoadLegend,
  errorLoadLegend,
  loadUserStatus,
  successLoadUserStatus,
  errorLoadUserStatus,
  loadAreaPropertries,
  successLoadAreaPropertries,
  errorLoadAreaPropertries,
  loadFilters,
  successLoadFilters,
  errorLoadFilters
} from './actions';

const jsonLegendData = JSON.stringify({
  records: [
    {
      icon: '',
      description:
        'Зона среднеэтажной и многоэтажной жилой застройки' +
        ' с включением объектов общественно деловой застройки, а также' +
        ' объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны'
    },
    {
      icon: '',
      description:
        'Зона среднеэтажной и многоэтажной жилой застройки' +
        ' с включением объектов общественно деловой застройки, а также' +
        ' объектов инженерной инфраструктуры, связанных с обслуживанием данной зоны'
    }
  ]
});
const uriLegendData = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonLegendData}`;

const loadLegendEpic = action$ =>
  action$.pipe(
    ofType(events.loadLegend),
    mergeMap(() =>
      ajax.getJSON(uriLegendData).pipe(
        map(({ data }) => successLoadLegend(data)),
        catchError(error => of(errorLoadLegend(error)))
      )
    )
  );

const requestUserStatusURI = 'http://industry.specom-vm.ru/map_interface.php?action=status';
const loadUserStatusEpic = action$ =>
  action$.pipe(
    ofType(events.loadUserStatus),
    mergeMap(() =>
      ajax.getJSON(requestUserStatusURI).pipe(
        map(response => successLoadUserStatus(response)),
        catchError(error => of(errorLoadUserStatus(error)))
      )
    )
  );

const jsonAreaPropertiesData = JSON.stringify({
  properties: [
    {
      name: 'address',
      type: 'input',
      title: 'Адрес'
    },
    {
      name: 'cadastral_number',
      type: 'input',
      title: 'Кадастровый номер'
    },
    {
      name: 'id_usage',
      type: 'input',
      title: 'Вид разрешенного использования'
    },
    {
      name: 'id_hazardclass',
      type: 'input',
      title: 'Класс опасности производства'
    },
    {
      name: 'rightholder',
      type: 'input',
      title: 'Правообладатель'
    },
    {
      name: 'right_foundation',
      type: 'input',
      title: 'Основание пользования участком'
    },
    {
      name: 'id_activity',
      type: 'input',
      title: 'Вид деятельности производства'
    },
    {
      name: 'protection_zone',
      type: 'input',
      title: 'Санитарно-защитная зона'
    },
    {
      name: 'connectivity',
      type: 'select',
      title: 'Возможности подключения',
      options: [
        {
          name: 'gas_supply',
          title: 'газоснабжение'
        },
        {
          name: 'water_supply',
          title: 'водоснабжение'
        },
        {
          name: 'water_drainage',
          title: 'водоотведение'
        },
        {
          name: 'heat_supply',
          title: 'теплоснабжение'
        },
        {
          name: 'power_supply',
          title: 'электроснабжение'
        }
      ]
    },
    {
      name: 'gas_supply',
      type: 'input',
      title: 'Газоснабжение',
      units: 'м³/сутки'
    },
    {
      name: 'water_supply',
      type: 'input',
      title: 'Водоснабжение',
      units: 'м³/сутки'
    },
    {
      name: 'water_drainage',
      type: 'input',
      title: 'Водоотведение',
      units: 'м³/сутки'
    },
    {
      name: 'heat_supply',
      type: 'input',
      title: 'Теплоснабжение',
      units: 'Гкал/час'
    },
    {
      name: 'power_supply',
      type: 'input',
      title: 'Электроснабжение',
      units: 'кВТ'
    },
    {
      name: 'reorganization',
      type: 'dates',
      title: 'Градостроительные преобразования'
    },
    {
      name: 'description',
      type: 'text-block',
      title: 'Описание объекта'
    },
    {
      name: 'phone',
      type: 'text',
      title: 'Телефон'
    },
    {
      name: 'fax',
      type: 'text',
      title: 'Факс'
    },
    {
      name: 'email',
      type: 'email',
      title: 'E-mail'
    },
    {
      name: 'url',
      type: 'text',
      title: 'Адрес сайта'
    },
    {
      name: 'director',
      type: 'text',
      title: 'Директор'
    },
    {
      name: 'photos',
      type: 'photos',
      title: 'Снимок участка'
    }
  ]
});
const uriAreaPropertiesData = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonAreaPropertiesData}`;
const loadAreaPropertiesEpic = action$ =>
  action$.pipe(
    ofType(events.loadAreaPropertries),
    mergeMap(() =>
      ajax.getJSON(uriAreaPropertiesData).pipe(
        map(({ data }) => successLoadAreaPropertries(data)),
        catchError(error => of(errorLoadAreaPropertries(error)))
      )
    )
  );

const jsonFiltersData = JSON.stringify({
  records: [
    {
      name: 'district',
      property: 'Приоритетный район',
      type: 'select',
      values: [
        {
          name: 'id_1',
          title: 'первый район'
        },
        {
          name: 'id_2',
          title: 'второй район'
        },
        {
          name: 'id_3',
          title: 'третий район'
        },
        {
          name: 'id_4',
          title: 'четвёртый район'
        },
        {
          name: 'id_5',
          title: 'пятый район'
        }
      ],
      default: null
    },
    {
      name: 'area',
      property: 'Площадь земельного участка',
      type: 'range',
      units: 'м²',
      default: null
    },
    {
      name: 'usage',
      property: 'Вид разрешенного использования',
      type: 'check',
      values: [
        {
          name: 'id_1',
          title: 'первый вид разр. пользования'
        },
        {
          name: 'id_2',
          title: 'второй вид разр. пользования'
        },
        {
          name: 'id_3',
          title: 'третий вид разр. пользования'
        },
        {
          name: 'id_4',
          title: 'четвёртый вид разр. пользования'
        },
        {
          name: 'id_5',
          title: 'пятый вид разр. пользования'
        }
      ],
      default: null
    },
    {
      name: 'hazardclass',
      property: 'Класс опасности производства',
      type: 'check',
      values: [
        {
          name: 'id_1',
          title: 'первый класс опасности'
        },
        {
          name: 'id_2',
          title: 'второй класс опасности'
        },
        {
          name: 'id_3',
          title: 'третий класс опасности'
        },
        {
          name: 'id_4',
          title: 'четвёртый класс опасности'
        },
        {
          name: 'id_5',
          title: 'пятый класс опасности'
        }
      ],
      default: null
    },
    {
      name: 'protection_zone',
      property: 'Санитарно-защитная зона',
      type: 'check',
      values: [
        {
          name: 'id_1',
          title: 'первый вариант зоны'
        },
        {
          name: 'id_2',
          title: 'второй вариант зоны'
        },
        {
          name: 'id_3',
          title: 'третий вариант зоны'
        },
        {
          name: 'id_4',
          title: 'четвёртый вариант зоны'
        },
        {
          name: 'id_5',
          title: 'пятый вариант зоны'
        }
      ],
      default: null
    },
    {
      name: 'gas_supply',
      property: 'Газоснабжение',
      type: 'range',
      units: 'м³/сутки',
      default: null
    },
    {
      name: 'water_supply',
      property: 'Водоснабжение',
      type: 'range',
      units: 'м³/сутки',
      default: null
    },
    {
      name: 'water_drainage',
      property: 'Водоотведение',
      type: 'range',
      units: 'м³/сутки',
      default: null
    },
    {
      name: 'heat_supply',
      property: 'Теплоснабжение',
      type: 'range',
      units: 'м³/сутки',
      default: null
    },
    {
      name: 'power_supply',
      property: 'Электроснабжение',
      type: 'range',
      units: 'м³/сутки',
      default: null
    }
  ]
});
const uriFiltersData = `http://industry.specom-vm.ru/map_interface.php?action=ping&data=${jsonFiltersData}`;

const loadFiltersEpic = action$ =>
  action$.pipe(
    ofType(events.loadFilters),
    mergeMap(() =>
      ajax.getJSON(uriFiltersData).pipe(
        map(({ data }) => successLoadFilters(data)),
        catchError(error => of(errorLoadFilters(error)))
      )
    )
  );

const requestLoadAppDataEpic = action$ =>
  action$.pipe(
    ofType(events.requestLoadAppData),
    flatMap(() => [loadLegend(), loadUserStatus(), loadAreaPropertries(), loadFilters()])
  );

const epic = combineEpics(
  requestLoadAppDataEpic,
  loadLegendEpic,
  loadUserStatusEpic,
  loadAreaPropertiesEpic,
  loadFiltersEpic
);

export default epic;
