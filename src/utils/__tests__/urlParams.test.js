import urlParams from '../urlParams';

it('parse url params string with urlParams', () => {
  expect(
    urlParams({
      firstName: 'Andrey',
      secondName: 'Ivanov'
    })
  ).toEqual('firstName=Andrey&secondName=Ivanov');
});
